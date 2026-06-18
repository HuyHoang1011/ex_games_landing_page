export function waitLoadedMetadata(video: HTMLVideoElement) {
  return new Promise<void>(resolve => {
    if (video.readyState >= 2) return resolve();
    const on = () => {
      video.removeEventListener('loadedmetadata', on);
      resolve();
    };
    video.addEventListener('loadedmetadata', on, { once: true });
  });
}

export function hasFiniteVideoDuration(video: HTMLVideoElement) {
  return Number.isFinite(video.duration) && video.duration > 0;
}

export function replayFiniteVideo(video: HTMLVideoElement) {
  if (!hasFiniteVideoDuration(video)) return false;

  try {
    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }

    return true;
  } catch {
    return false;
  }
}

export function bindFiniteVideoLoop(video: HTMLVideoElement) {
  const handleEnded = () => {
    replayFiniteVideo(video);
  };

  video.addEventListener('ended', handleEnded);

  return () => {
    video.removeEventListener('ended', handleEnded);
  };
}

export function bindVideoLoadingState(video: HTMLVideoElement, setIsLoading: (isLoading: boolean) => void) {
  const hasUsableFrame = () => video.currentTime > 0 || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
  let hasRenderedFrame = hasUsableFrame();

  const markLoading = () => {
    if (hasRenderedFrame || hasUsableFrame()) {
      return;
    }

    setIsLoading(true);
  };

  const markReady = () => {
    if (hasUsableFrame()) {
      hasRenderedFrame = true;
    }

    setIsLoading(false);
  };

  video.addEventListener('loadstart', markLoading);
  video.addEventListener('waiting', markLoading);
  video.addEventListener('stalled', markLoading);
  video.addEventListener('loadeddata', markReady);
  video.addEventListener('canplay', markReady);
  video.addEventListener('playing', markReady);
  video.addEventListener('timeupdate', markReady);

  return () => {
    video.removeEventListener('loadstart', markLoading);
    video.removeEventListener('waiting', markLoading);
    video.removeEventListener('stalled', markLoading);
    video.removeEventListener('loadeddata', markReady);
    video.removeEventListener('canplay', markReady);
    video.removeEventListener('playing', markReady);
    video.removeEventListener('timeupdate', markReady);
  };
}
