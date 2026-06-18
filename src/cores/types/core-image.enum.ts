export enum ImagePresetEnum {
  ICON_SMALL = 'icon_small', // 50x50
  SQUARE_SMALL = 'square_small', // 150x150
  LANDSCAPE_4_3 = 'landscape_4_3', // 640x480
  LANDSCAPE_3_2 = 'landscape_3_2', // 900x600
  PORTRAIT_4_5 = 'portrait_4_5', // 1080x1350
  LANDSCAPE_2_1 = 'landscape_2_1', // 1200x600
  LANDSCAPE_5_4 = 'landscape_5_4', // 1200x960
  SOCIAL_1_91_1 = 'social_1_91_1', // 1200x630
  LANDSCAPE_16_9 = 'landscape_16_9', // 1920x1080
}

export type ImageSizeType = ImagePresetEnum | undefined;
