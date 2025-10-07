import type { LanyardPresence } from "@/types/lanyard"

export function getAvatar(p?: LanyardPresence): string | null {
  if (!p) return null

  const du = p.discord_user
  if (du?.id) {
    if (du.avatar)
      return `https://cdn.discordapp.com/avatars/${du.id}/${du.avatar}.png?size=128`

    const idx = Number(du.id) % 6
    return `https://cdn.discordapp.com/embed/avatars/${isNaN(idx) ? 0 : idx}.png`
  }

  const id = p.kv?.id
  const avatar = p.kv?.avatar
  if (id) {
    if (avatar)
      return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`

    const idx = Number(id) % 6
    return `https://cdn.discordapp.com/embed/avatars/${isNaN(idx) ? 0 : idx}.png`
  }

  return null
}
