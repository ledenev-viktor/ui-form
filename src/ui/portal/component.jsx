import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = forwardRef(({ children, getPortalContainer }, ref) => {
  const [mountNode, setMountNode] = useState(
    () => typeof window !== "undefined" && getPortalContainer()
  );

  useEffect(() => {
    setMountNode(getPortalContainer());
  }, [getPortalContainer]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
});
