export interface LanyardPresence {
  kv: Record<string, string>;
  discord_status: string;
  discord_user: DiscordUser;
  activities: LanyardActivity[];

  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;

  listening_to_spotify: boolean;
  spotify?: SpotifyActivity;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar?: string | null;
  discriminator?: string;
  global_name?: string | null;
  display_name?: string | null;
  pronouns?: string;

  clan?: {
    tag?: string;
    identity_guild_id?: string;
    badge?: string;
    identity_enabled?: boolean;
  } | null;

  primary_guild?: {
    tag: string;
    identity_guild_id: string;
    badge: string;
    identity_enabled: boolean;
  } | null;

  avatar_decoration_data?: unknown | null;
  collectibles?: unknown | null;
  bot?: boolean;
  display_name_styles?: unknown | null;
  public_flags?: number;
}

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  created_at: number;
  application_id?: string | null;
  timestamps?: Timestamps;
  flags?: number;
  emoji?: Emoji;
  assets?: Assets;
  sync_id?: string;
  session_id?: string;
  platform?: string;
  buttons?: string[];
  party?: {
    id: string;
  };
}

export interface Assets {
  large_text?: string;
  large_image?: string;
  small_text?: string;
  small_image?: string;
}

export interface Emoji {
  name: string;
}

export interface Timestamps {
  start: number;
  end?: number;
}

export interface SpotifyActivity {
  timestamps: {
    start: number;
    end: number;
  };
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
  track_id: string;
}
