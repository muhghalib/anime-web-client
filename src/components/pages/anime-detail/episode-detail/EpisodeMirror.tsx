import { memo, type MouseEvent } from 'react';

import { NavigationScrollArea } from '@app/components/scrollArea/NavigationScrollArea';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Skeleton } from '@app/components/shared/Skeleton';
import { useIframe } from './use-iframe';

type EpisodeMirrorProps = Pick<Episode, 'iframe'>;

export const EpisodeMirror = ({ iframe }: EpisodeMirrorProps) => {
  const { iframe: currentIframe, setIframe } = useIframe();

  const handleOnClickMirror = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dataset = e.currentTarget.dataset;

    setIframe({
      nume: dataset.nume as string,
      post: dataset.post as string,
    });
  };

  return (
    <NavigationScrollArea>
      <Box className="flex space-x-2">
        {iframe.map(({ post, nume, title }, idx) => {
          return (
            <Button
              key={idx}
              data-nume={nume}
              data-post={post}
              onClick={(e) => handleOnClickMirror(e)}
              className="w-max text-xs"
              variant={currentIframe.nume == nume ? 'secondary' : 'ghost'}
              disabled={currentIframe.nume == nume}
            >
              {title}
            </Button>
          );
        })}
      </Box>
    </NavigationScrollArea>
  );
};

// eslint-disable-next-line react/display-name
EpisodeMirror.Skeleton = () => {
  return (
    <NavigationScrollArea>
      <Box className="flex space-x-2">
        {Array(3)
          .fill('')
          .map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-16" />
          ))}
      </Box>
    </NavigationScrollArea>
  );
};
