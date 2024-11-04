import { Box } from '@app/components/shared/Box';
import { Skeleton } from '@app/components/shared/Skeleton';

type EpisodeIframeProps = { src: string };

export const EpisodeIframe = ({ src }: EpisodeIframeProps) => {
  return (
    <Box className="w-full aspect-video">
      <iframe
        allowFullScreen
        src={src!}
        sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-scripts allow-top-navigation"
        className="w-full h-full rounded-xl"
      />
    </Box>
  );
};

// eslint-disable-next-line react/display-name
EpisodeIframe.Skeleton = () => {
  return (
    <Box className="w-full aspect-video">
      <Skeleton className="w-full h-full" />
    </Box>
  );
};
