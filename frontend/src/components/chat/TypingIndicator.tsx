'use client';
import { motion } from 'framer-motion';

const dotVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center space-x-1"
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-muted-foreground"
          variants={dotVariants}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </motion.div>
  );
}
