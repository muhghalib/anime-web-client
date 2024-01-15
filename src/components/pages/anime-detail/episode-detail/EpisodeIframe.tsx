import { Box } from '@app/components/shared/Box';
import { Skeleton } from '@app/components/shared/Skeleton';

type EpisodeIframeProps = {
  src?: string;
  isLoading: boolean;
};

export const EpisodeIframe = ({ isLoading, src }: EpisodeIframeProps) => {
  return (
    <Box className="w-full aspect-video">
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <iframe allowFullScreen src={src!} className="w-full h-full" />
      )}
    </Box>
  );
};
