import { Play, Pause, Volume2, VolumeX, PictureInPicture, Maximize, Minimize } from 'lucide-react';
import { memo, useEffect, useRef } from 'react';

import CoreTooltip from '@/cores/components/tooltip/core-tooltip';
import { cn } from '@/cores/shadcn/lib/utils';
import useI18n from '@/i18n/hooks/use-i18n.hook';

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isFs: boolean;
  show: boolean;

  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (vol: number) => void;
  onEnterNativeFs: () => void;
  onExitNativeFs: () => void;
  onTogglePiP: () => void;
}

function CoreToolbarVideo({
  isPlaying,
  isMuted,
  volume,
  isFs,
  show,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onEnterNativeFs,
  onExitNativeFs,
  onTogglePiP,
}: Readonly<Props>) {
  const { tGeneral } = useI18n();
  const volPercent = Math.round(volume * 100);

  const playColor = isPlaying ? 'text-primary' : 'text-white';
  const volColor = !isMuted && volume > 0 ? 'text-primary' : 'text-white';

  const rootRef = useRef<HTMLDivElement>(null);

  // ? Set inert = DOM, và blur nếu đang ẩn mà bên trong có focus
  useEffect(() => {
    const el = rootRef.current as any;
    if (!el) return;

    // ? toggle inert boolean (tránh warning JSX boolean attribute)
    try {
      el.inert = !show;
    } catch {
      // fallback browsers cũ: có thể bỏ qua, vì ta đã có pointer-events-none
    }

    // ? nếu ẩn và focus đang nằm trong toolbar → blur
    if (!show && el.contains(document.activeElement)) {
      (document.activeElement as HTMLElement | null)?.blur?.();
    }
  }, [show]);

  return (
    <div
      ref={rootRef}
      className={cn(
        'pointer-events-none absolute inset-x-2 bottom-2',
        'flex items-center justify-between gap-2',
        'transition-all duration-300 ease-out',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      )}
    >
      {/* LEFT: Play / Mute / Volume */}
      <div className='pointer-events-auto flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-2 py-1 shadow-sm'>
        {/* Play / Pause */}
        <CoreTooltip value={isPlaying ? tGeneral('pause_video') : tGeneral('play_video')}>
          <button
            type='button'
            onClick={onPlayPause}
            className={cn('px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 focus:outline-none')}
            aria-label={isPlaying ? tGeneral('pause_video') : tGeneral('play_video')}
          >
            {isPlaying ? <Pause className={cn('size-5', playColor)} /> : <Play className={cn('size-5', playColor)} />}
          </button>
        </CoreTooltip>

        {/* Mute */}
        <CoreTooltip value={isMuted ? tGeneral('unmute') : tGeneral('mute')}>
          <button
            type='button'
            onClick={e => {
              e.stopPropagation();
              onMuteToggle();
            }}
            className='px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 focus:outline-none'
            aria-label={isMuted ? tGeneral('unmute') : tGeneral('mute')}
          >
            {isMuted ? <VolumeX className='size-5 text-white' /> : <Volume2 className={cn('size-5', volColor)} />}
          </button>
        </CoreTooltip>

        {/* Volume control */}
        {/* <div className='flex items-center gap-2 pl-1'>
          <CoreTooltip value={`${tGeneral('volume')}: ${volPercent}%`}>
            <input
              type='range'
              min={0}
              max={100}
              value={volPercent}
              onChange={e => onVolumeChange(Number(e.target.value) / 100)}
              className={cn(
                'h-1.5 w-24 md:w-36 rounded-full cursor-pointer outline-none',
                'transition-all duration-200 ease-out hover:w-32 md:hover:w-44 focus:w-32 md:focus:w-44',
                'accent-primary',
                '[--ring:0_0_0_3px_rgba(59,130,246,0.35)] focus-visible:shadow-[var(--ring)]',
              )}
              aria-label={tGeneral('volume')}
            />
          </CoreTooltip>
          <span className='select-none text-xs text-primary/90 min-w-8 text-center'>{volPercent}%</span>
        </div> */}
      </div>

      {/* RIGHT: PiP / Fullscreen */}
      <div className='pointer-events-auto flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-2 py-1 shadow-sm'>
        <CoreTooltip value={tGeneral('pip')}>
          <button
            type='button'
            onClick={onTogglePiP}
            className='px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 focus:outline-none'
            aria-label={tGeneral('pip')}
          >
            <PictureInPicture className='size-5 text-white' />
          </button>
        </CoreTooltip>

        {!isFs ? (
          <CoreTooltip value={tGeneral('full_screen')}>
            <button
              type='button'
              onClick={onEnterNativeFs}
              className='px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 focus:outline-none'
              aria-label={tGeneral('full_screen')}
            >
              <Maximize className='size-5 text-white' />
            </button>
          </CoreTooltip>
        ) : (
          <CoreTooltip value='Exit Fullscreen'>
            <button
              type='button'
              onClick={onExitNativeFs}
              className='px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 focus:outline-none'
              aria-label='Exit Fullscreen'
            >
              <Minimize className='size-5 text-white' />
            </button>
          </CoreTooltip>
        )}
      </div>
    </div>
  );
}

export default memo(CoreToolbarVideo);
