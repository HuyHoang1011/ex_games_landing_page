import { CORE_ENV } from '@/cores/configs/core-env.config';
import { ImagePresetEnum, type ImageSizeType } from '@/cores/types/core-image.enum';

export type DomainType = 'cdn' | 'cdn-abc1tv' | 'backend' | 'default';

export function isAbsoluteUrl(url?: string) {
  return !!url && /^https?:\/\//i.test(url);
}

export function isSameCdn(url: string, cdnDomain: string) {
  try {
    return new URL(url).origin === new URL(cdnDomain).origin;
  } catch {
    return false;
  }
}

export const getImageUrl = (
  imagePath?: string,
  domainType: DomainType = 'default',
  options?: { type?: 'image' | 'video'; size?: ImageSizeType | { width: number; height: number } },
): string => {
  if (!imagePath) return getImageUrl('/assets/images/default.webp');

  let url = '';
  let processedImagePath = imagePath;

  if (
    (domainType === 'backend' || domainType === 'cdn' || domainType === 'cdn-abc1tv') &&
    !processedImagePath.startsWith('/')
  ) {
    processedImagePath = `/${processedImagePath}`;
  }

  switch (domainType) {
    case 'cdn':
    case 'cdn-abc1tv': {
      // console.log('processedImagePath::: ', processedImagePath);
      // processedImagePath có thể là:
      // - /uploads/media/xxx.jpg
      // - https://cdnvip.xxx/uploads/media/xxx.jpg
      if (isAbsoluteUrl(processedImagePath)) {
        url = processedImagePath;
      } else {
        const cdnBase = getCdnBase(domainType);
        url = `${cdnBase}${processedImagePath}`;
        // console.log('cdn url ::: ', url);
      }
      return url;
    }

    case 'backend':
      url = `${CORE_ENV.BASE_URL.BACKEND}${processedImagePath}`;
      if (options?.type === 'video') {
        return url; // video thì không thêm query
      }

      url += '?type=webp';

      if (options?.size) {
        if (typeof options.size === 'string') {
          // ? preset size
          url += `&size=${options.size}`;
        } else {
          // ? custom dimension
          const { width, height } = options.size;
          url += `&w=${width}&h=${height}`;
        }
      }

      return url;
    case 'default':
      url = processedImagePath;
      return url;
    default:
      url = processedImagePath;
  }
  return url;
};

function getCdnBase(domainType: DomainType) {
  const CDN_MAP: Partial<Record<DomainType, string>> = {
    cdn: CORE_ENV.BASE_URL.CDN,
    'cdn-abc1tv': CORE_ENV.BASE_URL.CDN_ABC1TV,
  };

  return CDN_MAP[domainType] ?? CORE_ENV.BASE_URL.CDN;
}

// ? Lấy dimensions từ size preset
export const getImageDimensions = (size: ImagePresetEnum): { width: number; height: number } => {
  const dimensions: Record<ImagePresetEnum, { width: number; height: number }> = {
    [ImagePresetEnum.ICON_SMALL]: { width: 50, height: 50 },
    [ImagePresetEnum.SQUARE_SMALL]: { width: 150, height: 150 },
    [ImagePresetEnum.LANDSCAPE_4_3]: { width: 640, height: 480 },
    [ImagePresetEnum.LANDSCAPE_3_2]: { width: 900, height: 600 },
    [ImagePresetEnum.PORTRAIT_4_5]: { width: 1080, height: 1350 },
    [ImagePresetEnum.LANDSCAPE_2_1]: { width: 1200, height: 600 },
    [ImagePresetEnum.LANDSCAPE_5_4]: { width: 1200, height: 960 },
    [ImagePresetEnum.SOCIAL_1_91_1]: { width: 1200, height: 630 },
    [ImagePresetEnum.LANDSCAPE_16_9]: { width: 1920, height: 1080 },
  };

  return dimensions[size];
};
