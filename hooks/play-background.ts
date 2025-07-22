import { useMemo } from "react";
import {
  isPausedAtom,
  performSetPhaseAtom,
  prepPhaseAtom,
  restPhaseAtom,
} from "@/atoms/play";
import { useAtomValue } from "jotai";

export const usePlayBackground = () => {
  const prepPhase = useAtomValue(prepPhaseAtom);
  const performSetPhase = useAtomValue(performSetPhaseAtom);
  const restPhase = useAtomValue(restPhaseAtom);
  const isPaused = useAtomValue(isPausedAtom);

  return useMemo(() => {
    if (isPaused) {
      return "bg-yellow-500";
    }

    if (prepPhase) {
      return "bg-green-500";
    }

    if (performSetPhase) {
      return "bg-orange-500";
    }

    if (restPhase) {
      return "bg-red-500";
    }

    return "bg-blue-500";
  }, [isPaused, prepPhase, performSetPhase, restPhase]);
};
