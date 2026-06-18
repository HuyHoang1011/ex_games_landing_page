export type LiveChatWidgetApi = {
  call: (method: string, ...args: unknown[]) => void;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  once?: (event: string, callback: (...args: unknown[]) => void) => void;
  off?: (event: string, callback: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    LiveChatWidget?: LiveChatWidgetApi;
  }
}

function runWhenLiveChatReady(callback: () => void): void {
  const widget = window.LiveChatWidget;
  if (!widget) return;

  if (widget.once) {
    widget.once('ready', callback);
    return;
  }

  widget.on?.('ready', callback);
}

/** Ẩn bubble góc sau khi user đóng chat; popup vẫn mở được qua maximize. */
export function hideLiveChatLauncher(): void {
  window.LiveChatWidget?.call?.('hide');
}

export function setupLiveChatLauncherHide(): void {
  const widget = window.LiveChatWidget;
  if (!widget) return;

  widget.on?.('visibility_changed', (data: unknown) => {
    const visibility = (data as { visibility?: string })?.visibility;
    if (visibility === 'minimized') {
      hideLiveChatLauncher();
    }
  });
}

export function openLiveChat(): void {
  if (typeof window === 'undefined') return;

  const widget = window.LiveChatWidget;
  if (!widget?.call) return;

  const open = () => widget.call('maximize');

  runWhenLiveChatReady(open);
  open();
}
