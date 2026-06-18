'use client';
import Image from 'next/image';
import { useFormatter } from 'next-intl';

import { Card } from '@/cores/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/cores/shadcn/components/ui/tabs';

const matches = [
  {
    league: 'ROM Liga I',
    time: '23:00',
    date: '11/07/2025',
    teamA: 'Metaloglobus',
    teamB: 'Universitatea',
    caster: 'HẠNG VŨ',
    isLive: true,
    viewers: 1892,
    teamAImage: 'https://okapi999.com/storage/photos/blog/images/Guangzhou%20Langtai%20Haiben%20(13)_1751967732.webp',
    teamBImage: 'https://okapi999.com/storage/photos/blog/images/Thiết kế chưa có tên (16)_1750047738.webp',
  },
  {
    league: "UEFA Women's",
    time: '02:00',
    date: '12/07/2025',
    teamA: 'Italy (w)',
    teamB: 'Spain (w)',
    caster: 'ROONEY',
    isLive: false,
    viewers: 2156,
    teamAImage: 'https://okapi999.com/storage/photos/blog/images/Guangzhou%20Langtai%20Haiben%20(13)_1751967732.webp',
    teamBImage: 'https://okapi999.com/storage/photos/blog/images/Thiết kế chưa có tên (16)_1750047738.webp',
  },
  {
    league: "UEFA Women's",
    time: '02:00',
    date: '12/07/2025',
    teamA: 'Portugal (w)',
    teamB: 'Belgium (w)',
    caster: 'SATI',
    isLive: true,
    viewers: 3754,
    teamAImage: 'https://okapi999.com/storage/photos/blog/images/Guangzhou%20Langtai%20Haiben%20(13)_1751967732.webp',
    teamBImage: 'https://okapi999.com/storage/photos/blog/images/Thiết kế chưa có tên (16)_1750047738.webp',
  },
  {
    league: 'PER Liga 1',
    time: '03:00',
    date: '12/07/2025',
    teamA: 'AD Tarma',
    teamB: 'Comerciantes',
    caster: 'SIUU',
    isLive: false,
    viewers: 1247,
    teamAImage: 'https://okapi999.com/storage/photos/blog/images/Guangzhou%20Langtai%20Haiben%20(13)_1751967732.webp',
    teamBImage: 'https://okapi999.com/storage/photos/blog/images/Thiết kế chưa có tên (16)_1750047738.webp',
  },
];

export default function TabListLive() {
  return (
    <Tabs defaultValue='live' className='w-full'>
      <TabsList className='flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg mb-6'>
        <TabsTrigger
          value='all'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          TẤT CẢ
        </TabsTrigger>
        <TabsTrigger
          value='live'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white'
        >
          ((O)) ĐANG PHÁT
        </TabsTrigger>
        <TabsTrigger
          value='soccer'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          ⚽ BÓNG ĐÁ
        </TabsTrigger>
        <TabsTrigger
          value='basketball'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          🏀 BÓNG RỔ
        </TabsTrigger>
        <TabsTrigger
          value='esports'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          🎮 ESPORTS
        </TabsTrigger>
        <TabsTrigger
          value='other'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          🏆 KHÁC
        </TabsTrigger>
        <TabsTrigger
          value='today'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          📅 HÔM NAY
        </TabsTrigger>
        <TabsTrigger
          value='tomorrow'
          className='text-sm font-semibold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900'
        >
          📅 NGÀY MAI
        </TabsTrigger>
      </TabsList>

      <TabsContent value='all'>
        <MatchGrid matches={matches} />
      </TabsContent>

      <TabsContent value='live'>
        <MatchGrid matches={matches.filter(m => m.isLive)} />
      </TabsContent>

      <TabsContent value='soccer'>
        <MatchGrid matches={matches.filter(m => m.league.includes('Liga') || m.league.includes('UEFA'))} />
      </TabsContent>

      <TabsContent value='basketball'>
        <MatchGrid matches={[]} />
      </TabsContent>

      <TabsContent value='esports'>
        <MatchGrid matches={[]} />
      </TabsContent>

      <TabsContent value='other'>
        <MatchGrid matches={[]} />
      </TabsContent>

      <TabsContent value='today'>
        <MatchGrid matches={matches} />
      </TabsContent>

      <TabsContent value='tomorrow'>
        <MatchGrid matches={[]} />
      </TabsContent>
    </Tabs>
  );
}

function MatchGrid({ matches }: { matches: any }) {
  const format = useFormatter();

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {matches.map((match: any, index: number) => (
        <Card
          key={index}
          className='relative bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow'
        >
          {/* LIVE tag */}
          {match.isLive && (
            <div className='absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded'>
              🔴 LIVE
            </div>
          )}

          {/* Match content */}
          <div className='flex flex-col items-center py-3 px-2'>
            <div className='text-white text-xs font-semibold mb-1 text-center'>{match.league}</div>

            {/* Teams + Time */}
            <div className='flex items-center justify-between w-full px-3 mb-2'>
              <Image src={match.teamAImage} alt={match.teamA} width={32} height={32} />
              <div className='text-center'>
                <div className='text-xl font-bold text-white leading-none'>{match.time}</div>
                <div className='text-xs text-gray-300'>{match.date}</div>
              </div>
              <Image src={match.teamBImage} alt={match.teamB} width={32} height={32} />
            </div>

            {/* Caster */}
            <div className='flex items-center justify-between w-full text-white text-sm px-3 mt-2'>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white'>
                  🎙️
                </div>
                <span>{match.caster}</span>
              </div>

              {/* Viewers */}
              <div className='flex items-center text-xs gap-1 text-primary-light'>
                🔥
                <span>{format.number(match.viewers)}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
