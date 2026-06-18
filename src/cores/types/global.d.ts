declare global {
  interface Window {
    __openImageModal?: () => void;
    __onInsertImageByUrl?: (url: string) => void;
    grecaptcha: any;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }

  interface GlobalThis {
    __openImageModal?: () => void;
    __onInsertImageByUrl?: (url: string) => void;
    grecaptcha: any;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export {};
