export const IS_PRODUCTION = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
export const IS_DEV = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
export const IS_LOCAL = process.env.NEXT_PUBLIC_NODE_ENV === 'local';
export const IS_DEBUG = process.env.NEXT_PUBLIC_APP_DEBUG === 'true';

export const CORE_ENV = {
  APP: {
    NAME: process.env.NEXT_PUBLIC_NAME ?? 'ABC VIP',
    DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION ?? 'ABC VIP Application',
    ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? 'development',
    VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    TIMEZONE: process.env.NEXT_PUBLIC_TIME_ZONE ?? 'Asia/Ho_Chi_Minh',
  },

  BASE_URL: {
    DOMAIN: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    BACKEND: process.env.NEXT_PUBLIC_BACKEND_URL,
    ABCVIP: process.env.NEXT_PUBLIC_BACKEND_ABCVIP_URL,
    ABC1TV: process.env.NEXT_PUBLIC_BACKEND_ABC1TV_URL ?? 'https://api.sn88.tv',
    SOCKET: `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`,
    API: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_PREFIX_BACKEND_URL}`,
    API_ABCVIP: `${process.env.NEXT_PUBLIC_BACKEND_ABCVIP_URL}/${process.env.NEXT_PUBLIC_PREFIX_BACKEND_ABCVIP_URL}`,
    API_ABC1TV: `${process.env.NEXT_PUBLIC_BACKEND_ABC1TV_URL ?? 'https://api.sn88.tv'}/${process.env.NEXT_PUBLIC_PREFIX_BACKEND_ABC1TV_URL ?? 'api/v1'}`,
    SOCKET_ABC1TV: process.env.NEXT_PUBLIC_SOCKET_ABC1TV_URL ?? 'wss://api.sn88.tv',
    CDN: process.env.NEXT_PUBLIC_CDN_URL ?? 'https://cdnvip.han02.vstorage.vngcloud.vn',
    CDN_ABC1TV: process.env.NEXT_PUBLIC_CDN_ABC1TV_URL ?? 'https://cdnsport.han02.vstorage.vngcloud.vn',
    // CDN: 'https://cdnsport.han02.vstorage.vngcloud.vn',
    DOMAIN_REGISTER: process.env.NEXT_PUBLIC_DOMAIN_REGISTER_ABCVIP ?? 'https://abcvip.in/register',
    FOOTBALL: process.env.NEXT_PUBLIC_API_ABC1TV_FOOTBALL_URL ?? 'https://api.sn88.tv',
    API_FOOTBALL: `${process.env.NEXT_PUBLIC_API_ABC1TV_FOOTBALL_URL ?? 'https://api.sn88.tv'}/${process.env.NEXT_PUBLIC_PREFIX_ABC1TV_FOOTBALL_URL ?? 'sport/v2'}`,
  },

  FACEBOOK: {
    // ? Facebook App ID (cần đăng ký ở developers.facebook.com)
    FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? '',
  },
};
