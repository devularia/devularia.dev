import type { LanyardActivity, LanyardPresence, Timestamps } from "@/types/lanyard";

type NowPlaying = {
    title: string;
    artist: string;
    image?: string;
    timestamps?: Timestamps;
};

export function SpotifyHelper(p?: LanyardPresence): NowPlaying | null {
    if (!p) return null;
    const act = p.activities?.find(
        (a: LanyardActivity) => a.type === 2 || a.name?.toLowerCase() === "spotify"
    );
    if (!act) return null;

    const title = act.details || "";
    const artist = act.state || "";
    let image: string | undefined;

    const large = act.assets?.large_image;
    if (large) {
        if (large.startsWith("spotify:")) {
            image = `https://i.scdn.co/image/${large.split(":")[1]}`;
        } else if (large.startsWith("http://") || large.startsWith("https://")) {
            image = large;
        }
    }

    if (!title && !artist) return null;
    return { title, artist, image, timestamps: act.timestamps };
}