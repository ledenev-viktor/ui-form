import React from "react";

export function useDidUpdateEffect(effect, deps) {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      const cleanup = effect();
      if (cleanup) {
        return () => cleanup();
      }
    }

    didMountRef.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
