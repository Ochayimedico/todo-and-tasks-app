export const homeVariants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      delay: 0.25,
      duration: 0.5,
      // when: "beforeChildren",
    },
  },
};
export const buttonVariants = {
  hidden: {
    opacity: 0,
    x: "-80vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeIn",
      delay: 0.8,
      duration: 1,
      type: "spring",
      mass: 4,
      damping: 25,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

export const authVariants = {
  hidden: {
    opacity: 0,
    x: -150,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeInOut",
      delay: 0.3,
      duration: 0.8,
    },
  },
};
export const loggingInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "linear",
      repeat: Infinity,
      duration: 1,
    },
  },
};
export const logoVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      mass: 3,
      stiffness: 100,
      ease: "easeInOut",
      delay: 0.3,
      duration: 0.5,
    },
  },
};
