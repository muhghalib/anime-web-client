'use client';

import Link from 'next/link';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@app/components/shared/Skeleton';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

type EpisodeNavigationProps = {
  episodes?: Anime['episodes'];
  isLoading: boolean;
};

export const EpisodeNavigation = ({ episodes, isLoading }: EpisodeNavigationProps) => {
  const [currentEpsIdx, setCurrentEpsIdx] = useState<number>();

  const { episode_slug, anime_slug } = useParams<{ episode_slug: string; anime_slug: string }>();

  useEffect(() => {
    if (episodes) setCurrentEpsIdx(episodes.findIndex(({ slug }) => slug == episode_slug));
  }, [episodes]);

  const nextEpsSlug = useMemo(() => {
    if (currentEpsIdx != undefined && episodes && currentEpsIdx != episodes.length - 1) {
      return episodes[currentEpsIdx + 1].slug;
    }
  }, [episodes, currentEpsIdx]);

  const prevEpsSlug = useMemo(() => {
    if (currentEpsIdx != undefined && episodes && currentEpsIdx != 0) {
      return episodes[currentEpsIdx - 1].slug;
    }
  }, [episodes, currentEpsIdx]);

  return (
    <Box className="flex space-x-1">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-14" />
          <Skeleton className="h-10 w-14" />
        </>
      ) : (
        <>
          {prevEpsSlug && (
            <Button asChild variant="secondary" className="w-max text-xs">
              <Link href="/[anime_slug]/[episode_slug]" as={`/${anime_slug}/${prevEpsSlug}`}>
                <ChevronLeft width={16} height={16} strokeWidth={3} /> prev
              </Link>
            </Button>
          )}
          {nextEpsSlug && (
            <Button asChild variant="secondary" className="w-max text-xs">
              <Link href="/[anime_slug]/[episode_slug]" as={`/${anime_slug}/${nextEpsSlug}`}>
                next <ChevronRight width={16} height={16} strokeWidth={3} />
              </Link>
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
