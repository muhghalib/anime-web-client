'use client';

import Link from 'next/link';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@app/components/shared/Skeleton';

import { useParams } from 'next/navigation';

type EpisodeNavigationProps = Pick<Episode, 'previousStreaming' | 'nextStreaming'>;

export const EpisodeNavigation = ({ previousStreaming, nextStreaming }: EpisodeNavigationProps) => {
  const { anime_slug } = useParams<{ episode_slug: string; anime_slug: string }>();

  return (
    <Box className="w-full flex items-center">
      {previousStreaming != '#' && (
        <Button asChild variant="secondary" className="w-max text-xs">
          <Link href={`/anime/${anime_slug}/episode/${previousStreaming}`}>
            <ChevronLeft width={16} height={16} strokeWidth={3} /> prev eps
          </Link>
        </Button>
      )}
      {nextStreaming != '#' && (
        <Button asChild variant="secondary" className="w-max text-xs ml-auto">
          <Link href={`/anime/${anime_slug}/episode/${nextStreaming}`}>
            next eps
            <ChevronRight width={16} height={16} strokeWidth={3} />
          </Link>
        </Button>
      )}
    </Box>
  );
};

// eslint-disable-next-line react/display-name
EpisodeNavigation.Skeleton = () => {
  return (
    <Box className="w-full flex items-center justify-between">
      <Skeleton className="h-10 w-14" />
      <Skeleton className="h-10 w-14" />
    </Box>
  );
};
