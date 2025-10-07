import type { LanyardActivity, LanyardPresence } from "@/types/lanyard";

export function HelperActivity(p?: LanyardPresence) {
  if (!p) return null;

  const act = p.activities?.find(
    (a: LanyardActivity) => a.type !== 4 && a.name.toLowerCase() !== "spotify"
  );
  if (!act) return null;

  const title = act.name;
  const details = act.details || "";
  const state = act.state || "";

  let largeImg: string | undefined;
  let smallImage: string | undefined;

  const large = act.assets?.large_image;
  if (large) {
    if (large.startsWith("mp:external")) {
      largeImg = `https://media.discordapp.net/${large.replace("mp:", "")}`;
    } else if (large.startsWith("discordapp.")) {
      largeImg = `https://${large}`;
    } else if (large.startsWith("http")) {
      largeImg = large;
    } else {
      largeImg = `https://cdn.discordapp.com/app-assets/${act.application_id}/${large}.png`;
    }
  }

  if (!largeImg && act.application_id) {
    largeImg = `https://dcdn.dstn.to/app-icons/${act.application_id}.png?size=512`;
  }

  return {
    title,
    details,
    state,
    image: largeImg,
    smallImage,
  };
}
