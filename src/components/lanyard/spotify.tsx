import { useLanyard } from "@/hooks/use-lanyard";
import { Progress } from "@/components/ui/progress";
import { ActivitySkeleton } from "./skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Spotify() {
  const isMobile = useIsMobile();
  const presence = useLanyard();
  const spotify = presence?.spotify;

  const playing =
    presence?.listening_to_spotify &&
    spotify?.timestamps?.end &&
    Date.now() < spotify.timestamps.end;

  const duration = playing && spotify?.timestamps ? spotify.timestamps.end - spotify.timestamps.start : 0;
  const progress = playing && duration ? ((Date.now() - spotify.timestamps.start) / duration) * 100 : 0;

  if (!presence) return <ActivitySkeleton />;
  if (!playing || !spotify) return null;

  return (
    <div className="group relative flex items-center gap-2 px-2 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={spotify.track_id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-2"
        >
          <motion.div
            layoutId="album-art"
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {spotify.album_art_url ? (
              <img
                src={spotify.album_art_url}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-foreground/10" />
            )}
          </motion.div>

          <div className="min-w-0 leading-none">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className={`mt-0.5 font-medium ${
                isMobile
                  ? "truncate whitespace-nowrap text-sm max-w-[190px]"
                  : "text-sm"
              }`}
            >
              {spotify.song}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className={`text-[12px] text-foreground/70 truncate whitespace-nowrap ${
                isMobile ? "text-[11px] max-w-[120px]" : ""
              }`}
            >
              {spotify.artist}
            </motion.div>

            {spotify.timestamps && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-1 flex items-center gap-2 text-xs text-foreground/70"
              >
                <Progress value={progress} className="h-1 w-16" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
