type LogoItem = {
  src: string;
  aspectRatio?: number; // 1 à ..., default 1
};

export type StorageType = {
  logo: {
    navbar?: LogoItem;
    square?: LogoItem;
    map?: LogoItem;
    logoTitle?: LogoItem;
  };
};

export const storageLocal108: StorageType = {
  logo: {
    navbar: {
      src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Fcompagny-logo.png?alt=media&token=5476600d-8963-41ce-a3be-a792ae4cc3e7",
      aspectRatio: 2,
    },
    square: {
      src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Flogo-navbar.png?alt=media&token=a9f09717-ea51-46e9-bbf3-d54cc0997d6a",
      aspectRatio: 1.5,
    },
    map: {
      src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2FCapture%20d’écran%2C%20le%202024-05-22%20à%2020.41.08.png?alt=media&token=40104345-ab2e-4170-b181-c92c65701080",
      aspectRatio: 1,
    },
    logoTitle: {
      src: "https://firebasestorage.googleapis.com/v0/b/wonkasite-d43b5.appspot.com/o/local-108%2Ftitle-logo.png?alt=media&token=32625c40-22f7-44aa-95ba-e283adffe1dc",
      aspectRatio: 1,
    },
  },
};
