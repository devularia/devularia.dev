import type { LanyardPresence } from "@/types/lanyard"

export function getAvatar(p?: LanyardPresence): string | null {
  if (!p) return null

  const du = p.discord_user
  if (du?.id) {
    if (du.avatar) {
      const isGif = du.avatar.startsWith("a_")
      const ext = isGif ? "gif" : "png"
      return `https://cdn.discordapp.com/avatars/${du.id}/${du.avatar}.${ext}?size=128`
    }

    const idx = Number(du.id) % 6
    return `https://cdn.discordapp.com/embed/avatars/${isNaN(idx) ? 0 : idx}.png`
  }

  const id = p.kv?.id
  const avatar = p.kv?.avatar
  if (id) {
    if (avatar) {
      const isGif = avatar.startsWith("a_")
      const ext = isGif ? "gif" : "png"
      return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=128`
    }

    const idx = Number(id) % 6
    return `https://cdn.discordapp.com/embed/avatars/${isNaN(idx) ? 0 : idx}.png`
  }

  return null
}
