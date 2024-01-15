import type { MouseEvent } from 'react';

import { NavigationScrollArea } from '@app/components/scrollArea/NavigationScrollArea';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Skeleton } from '@app/components/shared/Skeleton';

type EpisodeMirrorProps = {
  mirror?: AnimeEpisode['mirror'];
  onChange: (v: string) => any;
  currentResolution: MirrorType;
  currentMirror: string;
  isLoading: boolean;
};

export const EpisodeMirror = ({
  mirror,
  onChange,
  currentResolution,
  currentMirror,
  isLoading,
}: EpisodeMirrorProps) => {
  const handleOnClickMirror = (e: MouseEvent<HTMLButtonElement>, content: string) => {
    e.preventDefault();

    onChange(content);
  };

  return (
    <NavigationScrollArea>
      <Box className="flex space-x-2">
        {isLoading
          ? Array(3)
              .fill('')
              .map((_, idx) => <Skeleton key={idx} className="h-10 w-16" />)
          : mirror![currentResolution].map(({ nama, content }) => (
              <Button
                key={content}
                onClick={(e) => handleOnClickMirror(e, content)}
                className="w-max text-xs"
                variant={currentMirror == content ? 'secondary' : 'ghost'}
              >
                {nama}
              </Button>
            ))}
      </Box>
    </NavigationScrollArea>
  );
};
