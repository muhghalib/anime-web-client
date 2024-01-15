import { Badge } from '@app/components/shared/Badge';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@app/components/shared/Drawer';
import { ScrollArea, ScrollAreaViewport } from '@app/components/shared/ScrollArea';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import Link from 'next/link';

type AnimeEpisodeListProps = {
  episodes: Pick<AnimeEpisode, 'judul' | 'slug' | 'tanggal'>[];
  animeTitle?: string;
  anime_slug: string;
  isLoading: boolean;
};

export const AnimeEpisodeList = ({
  episodes,
  isLoading,
  anime_slug,
  animeTitle,
}: AnimeEpisodeListProps) => {
  return (
    <Box className="flex divide-y-2 flex-col">
      {isLoading ? (
        Array(3)
          .fill('')
          .map((_, idx) => <Skeleton key={idx} className="w-full rounded-none h-10 mt-2" />)
      ) : (
        <>
          {episodes.slice(0, 12).map(({ judul, slug, tanggal }, idx) => (
            <Box
              key={idx}
              className="hover:bg-muted/30 group/item p-2 cursor-pointer w-full flex justify-between items-center"
              asChild
            >
              <Link href="/[anime_slug]/[episode_slug]" as={`/${anime_slug}/${slug}`}>
                <Typography
                  size="sm"
                  color="muted"
                  weight="regular"
                  className="group-hover/item:text-foreground"
                >
                  {judul}
                </Typography>
                <Typography asChild size="xs">
                  <Badge className="w-max cursor-default" variant="secondary">
                    {tanggal}
                  </Badge>
                </Typography>
              </Link>
            </Box>
          ))}
          <Drawer>
            {episodes.length > 12 && (
              <DrawerTrigger asChild>
                <Button className="w-full text-sm rounded-none" variant="ghost">
                  View more episodes
                </Button>
              </DrawerTrigger>
            )}
            <DrawerContent>
              <Box className="w-full max-w-md mx-auto">
                <Box className="flex flex-col p-2 space-y-1">
                  <DrawerTitle className="leading-normal" asChild>
                    <Typography size="md" weight="semibold">
                      {animeTitle} episode
                    </Typography>
                  </DrawerTitle>
                  <DrawerDescription asChild>
                    <Typography size="sm" weight="regular" color="muted">
                      total episode: {episodes.length}
                    </Typography>
                  </DrawerDescription>
                </Box>
                <ScrollArea>
                  <ScrollAreaViewport className='h-full max-h-80'>
                    <Box className="flex divide-y-2 flex-col">
                      {episodes.map(({ judul, slug, tanggal }, idx) => (
                        <Box
                          key={idx}
                          className="hover:bg-muted/30 group/item p-2 cursor-pointer w-full flex justify-between items-center"
                          asChild
                        >
                          <Link href="/[anime_slug]/[episode_slug]" as={`/${anime_slug}/${slug}`}>
                            <Typography
                              size="sm"
                              color="muted"
                              weight="regular"
                              className="group-hover/item:text-foreground"
                            >
                              {judul}
                            </Typography>
                            <Typography asChild size="xs">
                              <Badge className="w-max cursor-default" variant="secondary">
                                {tanggal}
                              </Badge>
                            </Typography>
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </ScrollAreaViewport>
                </ScrollArea>
              </Box>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
};
