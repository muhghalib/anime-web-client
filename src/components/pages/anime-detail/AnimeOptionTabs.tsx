import { NavigationScrollArea } from '@app/components/scrollArea/NavigationScrollArea';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Skeleton } from '@app/components/shared/Skeleton';
import { useState, type MouseEvent } from 'react';

type AnimeOptionTabsProps = {
  onChange: (v: string) => any;
  value: string;
};

const TABS_OPTIONS_ITEM = [
  {
    label: 'Genre terkait',
    value: 'genre',
  },
  {
    label: 'Ongoing',
    value: 'ongoing',
  },
  {
    label: 'Completed',
    value: 'complete',
  },
];

export const AnimeOptionTabs = ({ onChange, value }: AnimeOptionTabsProps) => {
  const handleOnClickOption = (e: MouseEvent<HTMLButtonElement>, value: string) => {
    e.preventDefault();

    onChange(value);
  };

  return (
    <NavigationScrollArea>
      <Box className="w-fit flex space-x-4">
        {TABS_OPTIONS_ITEM.map(({ label, value: v }, idx) => {
          return (
            <Button
              key={idx}
              onClick={(e) => handleOnClickOption(e, v)}
              className="font-medium text-xs"
              size="sm"
              variant={v == value ? 'secondary' : 'ghost'}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </NavigationScrollArea>
  );
};

// eslint-disable-next-line react/display-name
AnimeOptionTabs.Skeleton = () => {
  return (
    <Box className="w-fit flex space-x-4 overflow-hidden">
      {Array(3)
        .fill('')
        .map((_, idx) => {
          return <Skeleton key={idx} className="h-10 w-16" />;
        })}
    </Box>
  );
};
