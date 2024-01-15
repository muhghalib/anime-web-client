import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@app/components/shared/Badge';
import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import { Fragment } from 'react';

type AnimeHeaderProps = Partial<Pick<Anime, 'judul' | 'namaJapan' | 'gambar' | 'slug'>> & {
  genres: Array<string>;
  animeInfo: Array<string>;
};

export const AnimeHeader = ({
  genres,
  judul,
  namaJapan,
  animeInfo,
  gambar,
  slug,
}: AnimeHeaderProps) => {
  return (
    <Fragment>
      <Box className="flex flex-col space-y-2">
        <Box className="flex flex-col">
          <Typography>{judul}</Typography>
          <Typography size="xs" color="muted">
            {namaJapan}
          </Typography>
        </Box>
        <Box className="flex flex-wrap gap-2">
          {genres?.map((genreSlug, idx) => {
            return (
              <Link key={idx} href={`/genre/${genreSlug}`}>
                <Badge variant="outline">{genreSlug}</Badge>
              </Link>
            );
          })}
        </Box>
      </Box>
      <Separator />
      <Box className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <Box className="w-full max-w-xs mx-auto relative aspect-[9/12]">
          <Image src={gambar || ''} alt={slug || ''} fill />
        </Box>
        <table className="w-full table-fixed h-max">
          {animeInfo.map((v, idx) => {
            const [key, value] = v.split(':');

            return (
              <tr key={idx}>
                <Typography size="sm" asChild>
                  <td className="align-top py-1">{key}:</td>
                </Typography>
                <Typography size="sm" asChild>
                  <td className="align-top py-1">{value}</td>
                </Typography>
              </tr>
            );
          })}
        </table>
      </Box>
    </Fragment>
  );
};

// eslint-disable-next-line react/display-name
AnimeHeader.Skeleton = () => {
  return (
    <Box className="w-full flex flex-col space-y-3">
      <Box className="flex flex-col space-y-2">
        <Box className="flex flex-col space-y-1.5">
          <Skeleton className="w-full max-w-56 h-6" />
          <Skeleton className="w-full max-w-32 h-4" />
        </Box>
        <Box className="flex flex-wrap space-x-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return <Skeleton key={idx} className="w-8 h-4 rounded-full" />;
            })}
        </Box>
      </Box>
      <Separator />
      <Box className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <Skeleton className="w-full max-w-xs mx-auto relative aspect-[9/12]" />
        <Box className="flex flex-col w-full space-y-3">
          {Array(7)
            .fill('')
            .map((_, idx) => {
              return <Skeleton key={idx} className="w-full max-w-44 h-4 rounded-full" />;
            })}
        </Box>
      </Box>
    </Box>
  );
};
