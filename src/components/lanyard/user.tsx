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
import { RiZzzFill } from "react-icons/ri";
import { Badge } from "../ui/badge";
import type { DiscordUser } from "@/types/lanyard";

const colors: Record<string, string> = {
  online: "bg-green-500",
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
  const color = colors[status];

  const offline = status === "offline";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative flex items-center justify-center mr-2 cursor-pointer">
          {!offline && (
            <div
              className={cn(
                "absolute h-8 w-8 rounded-full animate-ping",
                color
              )}
            />
          )}

          <div className="relative z-10">
            <Avatar
              className={cn(
                "h-12 w-12 border-2 border-border transition-opacity duration-300",
                offline ? "opacity-40" : "opacity-100"
              )}
            >
              {avatar ? (
                <AvatarImage src={avatar} loading="lazy" />
              ) : (
                <AvatarFallback className="bg-foreground/10" />
              )}
            </Avatar>

            {offline && (
              <RiZzzFill
                size={22}
                className="absolute inset-0 ml-10 mb-7 m-auto animate-pulse"
              />
            )}
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-72 p-4 bg-transparent rounded-lg backdrop-blur-lg mt-2 mr-47">
        <img src="https://dcdn.dstn.to/banners/910877275203989505" className="mb-2 rounded-lg border h-auto w-full bg-background" />
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14">
            {avatar ? (
              <AvatarImage src={avatar} loading="lazy" />
            ) : (
              <AvatarFallback className="bg-foreground/10" />
            )}
          </Avatar>

          <div className="flex flex-col">
            <div className="flex items-center flex-wrap gap-2">
              <p className="font-semibold text-foreground break-words max-w-full">
                {user?.display_name || user?.global_name || user?.username}
              </p>

              <div className="flex items-center gap-1">
                {user?.primary_guild && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 font-medium break-words max-w-full"
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
              <p className="text-sm text-muted-foreground break-words max-w-full">
                @{user.username}
              </p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
