"use client";

import React, { useCallback } from "react";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /* lifts and brightens on hover; for surfaces that are themselves a link */
  interactive?: boolean;
  /* adds the standard panel padding */
  panel?: boolean;
  children: React.ReactNode;
}

/*
  A glass surface whose specular highlight follows the pointer. The highlight is a
  CSS gradient positioned by --mx / --my (see src/app/resources/glass.scss); this
  only writes those two custom properties, so nothing re-renders on pointer move.
*/
export function Glass({
  interactive = false,
  panel = false,
  className,
  children,
  onPointerMove,
  ...rest
}: GlassProps) {
  const trackPointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const surface = event.currentTarget;
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      surface.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
      onPointerMove?.(event);
    },
    [onPointerMove],
  );

  const classes = ["glass", "glass-sheen", interactive && "glass-interactive", panel && "glass-panel", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onPointerMove={trackPointer} {...rest}>
      {children}
    </div>
  );
}
