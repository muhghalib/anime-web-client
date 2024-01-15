import { Box } from '@app/components/shared/Box';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';

type EpisodeHeaderProps = {
  animeTitle?: Anime['judul'];
  episodeTitle?: AnimeEpisode['judul'];
  isLoading: boolean;
};

export const EpisodeHeader = ({ animeTitle, episodeTitle, isLoading }: EpisodeHeaderProps) => {
  return (
    <Box className="flex flex-col space-y-1">
      {isLoading ? (
        <>
          <Skeleton className="w-full max-w-56 h-6" />
          <Skeleton className="w-full max-w-32 h-4" />
        </>
      ) : (
        <>
          <Typography>{animeTitle!}</Typography>
          <Typography size="sm" color="muted">
            {episodeTitle!}
          </Typography>
        </>
      )}
    </Box>
  );
};
