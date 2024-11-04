import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import Link from 'next/link';
import { Fragment } from 'react';

type EpisodeDownloadProps = {
  download: Episode['downloads'];
};

export const EpisodeDownload = ({ download }: EpisodeDownloadProps) => {
  return (
    <Box className="flex flex-col space-y-4">
      {Object.entries(download).map(([key, value], idx) => {
        return (
          <Box key={idx} className="w-full flex flex-col space-y-2">
            <Typography weight="semibold">Link download {key}</Typography>
            <Separator />
            {Object.entries(value).every(([_, value]) => value.length == 0) ? (
              <Typography size="sm" className="text-destructive">
                Maaf link download {key} belum tersedia untuk saat ini
              </Typography>
            ) : (
              <Box className="flex flex-col space-y-2">
                {Object.entries(value).map(([key, value], idx) => {
                  if (value.length == 0) return null;

                  return (
                    <Box key={idx} className="w-full flex items-center">
                      <Box className="h-full bg-muted grid place-items-center px-3 py-2">
                        <Typography size="sm">{key}</Typography>
                      </Box>
                      <Box className="flex flex-wrap items-center">
                        {value.map(({ link, title }, idx) => {
                          return (
                            <Fragment key={idx}>
                              <Link href={link} target="_blank" className="px-2">
                                {title}
                              </Link>
                              <Separator orientation="vertical" className="h-4 last:hidden" />
                            </Fragment>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

// eslint-disable-next-line react/display-name
EpisodeDownload.Skeleton = () => {
  return (
    <Box className="flex flex-col space-y-4">
      <Box className="w-full flex flex-col space-y-2">
        {Array(3)
          .fill('')
          .map((_, idx) => {
            return (
              <Box key={idx} className="w-full flex flex-col space-y-2">
                <Skeleton className="w-full max-w-32 h-10" />
                <Separator />
                <Box className="flex flex-col space-y-2">
                  {Array(3)
                    .fill('')
                    .map((_, idx) => {
                      return (
                        <Box key={idx} className="w-full flex items-center space-x-2">
                          <Skeleton className="w-14 h-10" />
                          <Box className="flex flex-wrap items-center space-x-2">
                            {Array(3)
                              .fill('')
                              .map((_, idx) => {
                                return <Skeleton key={idx} className="w-12 h-6" />;
                              })}
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
