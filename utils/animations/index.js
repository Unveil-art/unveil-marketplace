export const variantPopIn = {
  init: {
    x: "110%",
    transitionEnd: {
      display: "none",
    },
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
  ani: {
    x: 0,
    display: "block",
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
};

export const variantBackground = {
  init: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
  ani: {
    opacity: 1,
    display: "block",
    transition: { duration: 1, ease: [0.33, 0, 0, 1] },
  },
};

export const variantCloseBtn = {
  init: {
    x: 400,
    transitionEnd: {
      display: "none",
    },
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
  ani: {
    x: 0,
    display: "block",
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
};
