'use client';
import React from 'react';

import { IS_DEBUG } from '@/cores/configs/core-env.config';

interface Props {
  stats: {
    fps: number;
    dropped: number;
    total: number;
    lag: boolean;
    latencyMs: number;
    throughputMbps: number;
    bufferSec: number;
    level: string | number;
    resolution: string;
  };
  visible?: boolean;
  error?: string;
}

export default function StatsArtPlayer({ stats, visible, error }: Readonly<Props>) {
  if (!IS_DEBUG || !visible || !!error) return null;

  return (
    <div className='absolute top-2 right-2 z-20'>
      <div className='rounded-lg bg-black/70 backdrop-blur-sm text-white px-3 py-2 shadow-lg border border-white/10'>
        <div className='space-y-0.5 text-xs font-mono'>
          <StatItem
            label='FPS'
            value={stats.fps}
            colorLogic={stats.fps >= 50 ? 'green' : stats.fps >= 30 ? 'yellow' : 'red'}
            warn={stats.lag}
          />
          <StatItem
            label='Dropped'
            value={`${stats.dropped}/${stats.total}`}
            colorLogic={
              stats.total === 0
                ? 'gray'
                : stats.dropped / stats.total < 0.01
                  ? 'green'
                  : stats.dropped / stats.total < 0.05
                    ? 'yellow'
                    : 'red'
            }
          />
          <StatItem
            label='Latency'
            value={`${stats.latencyMs} ms`}
            colorLogic={stats.latencyMs < 50 ? 'green' : stats.latencyMs < 100 ? 'yellow' : 'red'}
          />
          <StatItem
            label='Throughput'
            value={`${stats.throughputMbps} Mb/s`}
            colorLogic={stats.throughputMbps >= 5 ? 'green' : stats.throughputMbps >= 2 ? 'yellow' : 'red'}
          />
          <StatItem
            label='Buffer'
            value={`${stats.bufferSec.toFixed(2)} s`}
            colorLogic={stats.bufferSec >= 2 ? 'green' : stats.bufferSec >= 1 ? 'yellow' : 'red'}
          />
          <div className='flex items-center justify-between gap-3'>
            <span className='text-gray-400'>Level:</span>
            <span className='font-semibold text-blue-400'>
              {stats.level} <span className='text-gray-500'>({stats.resolution})</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  colorLogic,
  warn,
}: {
  label: string;
  value: React.ReactNode;
  colorLogic: 'green' | 'yellow' | 'red' | 'gray';
  warn?: boolean;
}) {
  const colorMap = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    gray: 'text-gray-300',
  };

  return (
    <div className='flex items-center justify-between gap-3'>
      <span className='text-gray-400'>{label}:</span>
      <span className={`font-semibold flex items-center gap-1 ${colorMap[colorLogic]}`}>
        {value}
        {warn && <span className='text-amber-400'>⚠️</span>}
      </span>
    </div>
  );
}
