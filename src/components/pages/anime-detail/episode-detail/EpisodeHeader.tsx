import { Box } from '@app/components/shared/Box';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';

type EpisodeHeaderProps = {
  anime: Pick<Anime, 'title'>;
  episode: Pick<Episode, 'title'>;
};

export const EpisodeHeader = ({ anime, episode }: EpisodeHeaderProps) => {
  return (
    <Box className="flex flex-col space-y-1">
      <Typography>{anime.title!.replace(/^(nonton anime|nonton|anime)\s*/i, '')}</Typography>
      <Typography size="sm" color="muted">
        {episode.title!}
      </Typography>
    </Box>
  );
};

// eslint-disable-next-line react/display-name
EpisodeHeader.Skeleton = () => {
  return (
    <Box className="flex flex-col space-y-1">
      <Skeleton className="w-full max-w-56 h-6" />
      <Skeleton className="w-full max-w-32 h-4" />
    </Box>
  );
};
