import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { lanyard } from '@/utils/lanyard';
import type { LanyardPresence } from '@/types/lanyard';

const LanyardContext = createContext<LanyardPresence | undefined>(undefined);

export function LanyardProvider({ children }: { children: ReactNode }) {
  const [presence, setPresence] = useState<LanyardPresence | undefined>(
    lanyard?.last_presence,
  );
  //@ts-ignore
  useEffect(() => {
    const inst = lanyard;
    if (!inst) return;

    const handler = (p: LanyardPresence) => setPresence(p);
    inst.on('presence', handler);
    inst.requestPresenceUpdate();

    return () => inst.off('presence', handler);
  }, []);

  return createElement(
    LanyardContext.Provider,
    { value: presence },
    children,
  );
}

export function useLanyard() {
  return useContext(LanyardContext);
}
