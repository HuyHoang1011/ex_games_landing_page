export const CORE_SETTING = {
  LOCALE: 'NEXT_LOCALE',
  // LOCALE_DEFAULT: 'vi',
  REF_KEY_LOCAL_STORAGE: 'ref',

  AUTH: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
  },

  RULE: {
    PAGINATION: {
      INITIAL_PAGE: 1,
      LIMIT_PAGINATION: 10,
      MAX_LIMIT: 9999999,
      SHORT_MAX_LIMIT: 100,
      SHORT_MAX_LIMIT_V2: 20,

      LAMBDA: 20,
    },

    FORM: {
      MIN_LENGTH_GENERAL: 1,

      MIN_LENGTH_NAME: 3,
      MAX_LENGTH_NAME: 100,

      MIN_LENGTH_PASSWORD: 6,
      MAX_LENGTH_PASSWORD: 30,

      MAX_LENGTH_VARCHAR: 255,
    },

    CHAT: {
      MAX_LENGTH: 200,
    },
  },

  REACT_QUERY: {
    STALE_TIME: 60 * 1000 * 30, // 30 minutes (cache refetch)
    GC_TIME: 35 * 60 * 1000, // 35 minutes (cache memory)
    RETRY: 1,
    REFETCH_ON_WINDOW_FOCUS: false,

    CACHE: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },

  OTHER: {
    MIN_FOR_LOOP: 4,
    REQUEST_TIMEOUT: 5000,
    DEBOUNCE_TIME: 1000,
    DOUBLE_PRESS_TIME: 250,

    SOCKET_RECONNECT_DELAY: 3000,
    DEFAULT_BE_EMPTY: 'none',

    DEFAULT_EMPTY: 'N/A',

    // ! Tạm thời
    // HARD_VIDEO_ADS: 'https://cdnsport.han02.vstorage.vngcloud.vn/uploads/streams/1763887275202176060_1/stream.m3u8',
    // HARD_VIDEO_ADS: '/uploads/stream/f97421ffd3b386bab6a4668dbcaa7690/index.m3u8',
    // HARD_VIDEO_ADS: '/uploads/stream/f97421ffd3b386bab6a4668dbcaa7690/index.m3u8',
    HARD_VIDEO_ADS: '/uploads/stream/829245aedd4e31b27b5610baa4548e27d/index.m3u8',
    // HARD_VIDEO_ADS: '',
  },
};
