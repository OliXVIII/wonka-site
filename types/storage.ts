type LogoItem = {
  src: string;
  aspectRatio?: number; // 1 à ..., default 1
};

export type StorageType = {
  logo: {
    navbar: LogoItem;
    square?: LogoItem;
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
  },
};
