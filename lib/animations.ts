export const easeEditorial = [0.76, 0, 0.24, 1] as const;
export const easeReveal = [0.22, 1, 0.36, 1] as const;

export const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeReveal },
  },
};
