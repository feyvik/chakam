/** @format */

// components/FadeInOnScroll.tsx
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";

type Direction = "up" | "down" | "left" | "right";

export default function FadeInOnScroll({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  // Determine initial translate values
  const variants = useMemo(
    () =>
      ({
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
      } as Record<Direction, { x?: number; y?: number }>),
    []
  );

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, y: 0 });
    } else {
      controls.start({ opacity: 0, ...variants[direction] });
    }
  }, [inView, controls, direction, variants]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...variants[direction] }}
      animate={controls}
      transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}
