import type { LanyardPresence } from "@/types/lanyard";

const DISCORD_ID = "910877275203989505" as const;

export const Op = {
  Event: 0,
  Hello: 1,
  Initialize: 2,
  Heartbeat: 3,
} as const;
export type Op = (typeof Op)[keyof typeof Op];

export const LanyardEvent = {
  INIT_STATE: "INIT_STATE",
  PRESENCE_UPDATE: "PRESENCE_UPDATE",
} as const;
export type LanyardEvent = (typeof LanyardEvent)[keyof typeof LanyardEvent];

interface SocketData extends Partial<LanyardPresence> {
  heartbeat_interval?: number;
}
interface SocketMessage {
  op: Op;
  t?: LanyardEvent;
  d?: SocketData;
}

type LanyardEvents = {
  connected: () => void;
  presence: (presence: LanyardPresence) => void;
};

class TypedEmitter<Events extends Record<string, (...args: any[]) => void>> {
  private listeners = new Map<keyof Events, Set<Events[keyof Events]>>();

  on<K extends keyof Events>(event: K, listener: Events[K]): this {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
    return this;
  }
  off<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.listeners.get(event)?.delete(listener as any);
    return this;
  }
  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): void {
    const ls = this.listeners.get(event);
    if (!ls) return;
    for (const l of Array.from(ls)) l(...args);
  }
}

function fnv1a(str: string): number {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

function fingerprintPresence(p: LanyardPresence): string {
  const spotify = p.spotify
    ? [
      p.spotify.track_id,
      p.spotify.song,
      p.spotify.artist,
      p.spotify.album,
      p.spotify.timestamps?.start ?? "",
      p.spotify.timestamps?.end ?? "",
    ].join(":")
    : "";

  const activities =
    p.activities
      ?.map((a) =>
        [
          a.id,
          a.name,
          a.type,
          a.state ?? "",
          a.details ?? "",
          a.timestamps?.start ?? "",
          a.timestamps?.end ?? "",
        ].join(":"),
      )
      .join("|") ?? "";

  return [
    p.discord_status,
    p.active_on_discord_desktop ? 1 : 0,
    p.active_on_discord_mobile ? 1 : 0,
    p.listening_to_spotify ? 1 : 0,
    spotify,
    activities,
  ].join("||");
}

export class Lanyard extends TypedEmitter<LanyardEvents> {
  private ws: WebSocket;
  private heartbeatTimer?: number;
  private userId: string;

  private _lastPresence?: LanyardPresence;
  private _lastPresenceHash?: number;

  constructor(id: string) {
    super();
    this.userId = id;
    this.ws = new WebSocket("wss://api.lanyard.rest/socket");

    this.ws.addEventListener("open", () => {
      this.emit("connected");
    });

    this.ws.addEventListener("message", (e) => {
      try {
        const data: SocketMessage = JSON.parse((e as MessageEvent).data);
        this.handleMessage(data);
      } catch {
      }
    });

    this.ws.addEventListener("close", () => {
      if (this.heartbeatTimer !== undefined) {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = undefined;
      }
    });
  }

  get last_presence(): LanyardPresence | undefined {
    return this._lastPresence;
  }

  private send(op: Op, d?: unknown): void {
    if (this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ op, d }));
  }

  private subscribe(subscribe_to_id: string): void {
    this.send(Op.Initialize, { subscribe_to_id });
  }

  private sendHeartbeat(): void {
    this.send(Op.Heartbeat);
  }

  private maybeEmitPresence(next: LanyardPresence) {
    const hash = fnv1a(fingerprintPresence(next));
    if (hash === this._lastPresenceHash) return;
    this._lastPresence = next;
    this._lastPresenceHash = hash;
    this.emit("presence", next);
  }

  private handleMessage(data: SocketMessage): void {
    switch (data.op) {
      case Op.Hello: {
        const interval = Math.max((data.d?.heartbeat_interval ?? 30000) | 0, 5000);
        if (this.heartbeatTimer !== undefined) clearInterval(this.heartbeatTimer);

        this.sendHeartbeat();
        this.heartbeatTimer = window.setInterval(() => this.sendHeartbeat(), interval);

        this.subscribe(this.userId);
        break;
      }

      case Op.Event: {
        if (
          data.t === LanyardEvent.INIT_STATE ||
          data.t === LanyardEvent.PRESENCE_UPDATE
        ) {
          const p = data.d as LanyardPresence;
          if (p) this.maybeEmitPresence(p);
        }
        break;
      }

      default:
        break;
    }
  }

  requestPresenceUpdate(): void {
    if (this._lastPresence) this.emit("presence", this._lastPresence);
  }

  destroy(): void {
    try {
      this.ws.close();
    } catch { }
    if (this.heartbeatTimer !== undefined) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = undefined;
    }
  }
}

let _lanyard: Lanyard | undefined;
export const lanyard =
  typeof window !== "undefined"
    ? (_lanyard ??= new Lanyard(DISCORD_ID))
    : undefined;
