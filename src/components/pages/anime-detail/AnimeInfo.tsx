'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@app/components/shared/Badge';
import { Box } from '@app/components/shared/Box';
import { Separator } from '@app/components/shared/Separator';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import { Fragment, useState } from 'react';

type AnimeInfoProps = Pick<
  Anime,
  | 'title'
  | 'image'
  | 'genre'
  | 'released'
  | 'total_episode'
  | 'type'
  | 'producers'
  | 'rating'
  | 'status'
  | 'synopsis'
  | 'trailer'
>;

export const AnimeInfo = ({ genre, title, image, synopsis, trailer, ...props }: AnimeInfoProps) => {
  const [synopsisIsOpen, setSynopsisIsOpen] = useState(false);

  const handleOnShowMoreSynopsis = () => {
    setSynopsisIsOpen(!synopsisIsOpen);
  };

  const info = {
    judul: title.replace(/^(nonton anime|nonton|anime)\s*/i, ''),
    rating: props.rating,
    'tanggal rilis': props.released,
    'total episode': /<a\s+(?:[^>]*?\s+)?href=|https?:\/\//i.test(props.total_episode)
      ? 'Unknown'
      : props.total_episode,
    status: props.status,
    type: props.type,
    produser: props.producers
      .map((producer) => producer.title)
      .join(', ')
      .toString(),
  };

  return (
    <Fragment>
      <Box className="flex flex-col space-y-2">
        {trailer != '' && (
          <iframe
            className="w-full aspect-video rounded-xl"
            src={trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
        <Typography>{title.replace(/^(nonton anime|nonton|anime)\s*/i, '')}</Typography>
        <Typography size="sm" className="text-muted-foreground">
          {synopsisIsOpen ? synopsis : synopsis.slice(0, 250)}{' '}
          {synopsis.length > 250 && (
            <button className="text-muted-foreground/70" onClick={handleOnShowMoreSynopsis}>
              {synopsisIsOpen ? 'show less' : 'show more...'}
            </button>
          )}
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {genre?.map(({ title, slug }, idx) => {
            return (
              <Link
                key={idx}
                href={{
                  pathname: '/search',
                  query: {
                    genre: slug,
                  },
                }}
              >
                <Badge variant="outline">{title}</Badge>
              </Link>
            );
          })}
        </Box>
      </Box>
      <Separator />
      <Box className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <Box className="w-full max-w-xs mx-auto relative aspect-[9/12]">
          <Image src={image} alt={title} fill />
        </Box>
        <table className="w-full table-fixed h-max">
          {Object.entries(info).map((v, idx) => {
            const [key, value] = v;

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
AnimeInfo.Skeleton = () => {
  return (
    <Box className="w-full flex flex-col space-y-3">
      <Box className="flex flex-col space-y-1.5">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="w-full max-w-64 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full max-w-72 h-4" />
        <Box className="flex flex-wrap space-x-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return <Skeleton key={idx} className="w-10 h-5 rounded-full" />;
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
