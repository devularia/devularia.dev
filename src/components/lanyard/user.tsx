import { useLanyard } from "@/hooks/use-lanyard";
import { getAvatar } from "@/helpers/discord";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaGamepad, FaGlobeAmericas } from "react-icons/fa";
import { MdMonitor, MdSmartphone } from "react-icons/md";
import { Badge } from "../ui/badge";
import type { DiscordUser } from "@/types/lanyard";

const colors: Record<string, string> = {
  online: "bg-chart-2",
  idle: "bg-yellow-500",
  dnd: "bg-red-600",
  offline: "bg-gray-500",
};

export function User() {
  const presence = useLanyard();
  const avatar = getAvatar(presence);
  const user: DiscordUser | undefined = presence?.discord_user;

  if (!presence) {
    return <Skeleton className="h-11 w-11 rounded-full mr-2" />;
  }

  const status = presence.discord_status || "offline";
  const statusc = colors[status];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative flex items-center justify-center mr-2 cursor-pointer">
          <Avatar className="h-12 w-12 border-2 border-border">
            {avatar ? (
              <AvatarImage src={avatar} loading="lazy" />
            ) : (
              <AvatarFallback className="bg-foreground/10" />
            )}
          </Avatar>

          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background",
              statusc
            )}
          />
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-72 p-4 bg-transparent backdrop-blur-lg mt-2">
        <div className="border mb-2 rounded-sm h-10 bg-background"/>
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-border">
            {avatar ? (
              <AvatarImage src={avatar} loading="lazy" />
            ) : (
              <AvatarFallback className="bg-foreground/10" />
            )}
          </Avatar>

          <div className="flex flex-col">
            <div className="flex items-center flex-wrap gap-2">
              <p className="font-semibold text-foreground">
                {user?.display_name || user?.global_name || user?.username}
              </p>

              <div className="flex items-center gap-1">

                {user?.primary_guild && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 font-medium"
                  >
                    {user.primary_guild.badge && (
                      <img
                        src={`https://cdn.discordapp.com/clan-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png?size=16`}
                        className="w-4 h-4 rounded-sm"
                        loading="lazy"
                      />
                    )}
                    {user.primary_guild.tag}
                  </Badge>
                )}
              </div>
            </div>

            {user?.global_name && user?.global_name !== user?.username && (
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            )}

            <Badge variant="secondary" className="flex items-center mt-1">
              {presence.active_on_discord_web && <FaGlobeAmericas size={13} />}
              {presence.active_on_discord_desktop && <MdMonitor size={13} />}
              {presence.active_on_discord_mobile && <MdSmartphone size={13} />}
              {presence.active_on_discord_embedded && <FaGamepad size={13} />}
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
