type LogoItem = {
  link: string;
  aspectRatio?: number; // 1 à ..., default 1
};

export type StorageType = {
  logo: {
    navbar: LogoItem;
  };
};
