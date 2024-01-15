import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Separator } from '@app/components/shared/Separator';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import Link from 'next/link';

type EpisodeDownloadProps = {
  download?: AnimeEpisode['download'];
  isLoading: boolean;
};

export const EpisodeDownload = ({ isLoading, download }: EpisodeDownloadProps) => {
  return (
    <Box className="flex flex-col space-y-3">
      <Typography>Downloads</Typography>
      <Separator />
      <Box className="flex flex-col divide-y-2">
        {isLoading
          ? Array(3)
              .fill('')
              .map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full max-w-sm mt-2 first:mt-0" />
              ))
          : Object.entries(download!).map(([key, value], idx) => {
              if (value.length == 0) return null;

              return (
                <Box key={idx} className="py-2 flex items-center space-x-2">
                  <Typography size="sm">{key}:</Typography>
                  <Box className="flex gap-1 flex-wrap">
                    {value.map(({ nama, href }, idx) => (
                      <Button key={idx} size="sm" variant="outline" asChild>
                        <Link href={href} target="_blank">
                          {nama}
                        </Link>
                      </Button>
                    ))}
                  </Box>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};
