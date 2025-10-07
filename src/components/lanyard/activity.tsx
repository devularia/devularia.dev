import { cn } from "@/lib/utils";
import { useLanyard } from "@/hooks/use-lanyard";
import { HelperActivity } from "@/helpers/activity";
import { ActivitySkeleton } from "./skeleton";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Activity() {
  const presence = useLanyard();
  const activity = HelperActivity(presence);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <ActivitySkeleton />;
  if (!activity) return null;

  const act = activity;

  return (
    <div className={cn("group relative flex items-center gap-2 px-2 overflow-hidden")}>
      <AnimatePresence mode="wait">
        <motion.div
          key={act.title}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-2"
        >
          <motion.div
            layoutId="activity-image"
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {act.image ? (
              <img
                src={act.image}
                className="h-full w-full object-cover"
                loading="lazy"
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
              className="mt-0.5 text-sm font-medium truncate whitespace-nowrap"
            >
              {act.title}
            </motion.div>

            {act.details && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
                className="text-[12px] text-foreground/70 truncate whitespace-nowrap leading-none"
              >
                {act.details}
              </motion.div>
            )}

            {act.state && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.2 }}
                className="text-[12px] text-foreground/70 truncate whitespace-nowrap leading-none"
              >
                {act.state}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
