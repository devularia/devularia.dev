import type { LanyardPresence } from "@/types/lanyard";

interface BadgeItem {
  id: string;
  icon: string;
}

export function getBadges(p?: LanyardPresence): BadgeItem[] {
  if (!p) return [];
  const user = p.discord_user as any;
  const badges: BadgeItem[] = [];

  if (user?.primary_guild?.badge && user?.primary_guild?.identity_guild_id) {
    badges.push({
      id: "primary_guild",
      icon: `https://cdn.discordapp.com/clan-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png?size=32`,
    });
  }

  if (
    user?.clan?.badge &&
    user?.clan?.badge !== user?.primary_guild?.badge &&
    user?.clan?.identity_guild_id
  ) {
    badges.push({
      id: "clan",
      icon: `https://cdn.discordapp.com/clan-badges/${user.clan.identity_guild_id}/${user.clan.badge}.png?size=32`,
    });
  }

  return badges;
}
