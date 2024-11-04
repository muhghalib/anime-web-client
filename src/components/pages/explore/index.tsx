'use client';

import { Box } from '@app/components/shared/Box';
import { useFilterApi } from '@app/hooks/api/use-filter-api';
import { ExploreForm } from './ExploreForm';
import { ExploreHeader } from './ExploreHeader';

export const ExplorePage = () => {
  const { data, isLoading } = useFilterApi().getAll();

  return (
    <Box className="w-full items-center flex flex-col space-y-6">
      <ExploreHeader />
      {isLoading ? (
        <ExploreForm.Skeleton />
      ) : (
        <ExploreForm
          genre={data!.genre}
          order={data!.order}
          status={data!.status}
          type={data!.type}
        />
      )}
    </Box>
  );
};
