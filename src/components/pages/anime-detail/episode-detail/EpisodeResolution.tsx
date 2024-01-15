'use client';

import { useState, type MouseEvent } from 'react';

import { Button } from '@app/components/shared/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@app/components/shared/DropdownMenu';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import { ChevronRight } from 'lucide-react';

type EpisodeResolutionProps = {
  currentResolution: MirrorType;
  mirror?: AnimeEpisode['mirror'];
  onChange: (v: MirrorType) => any;
  isLoading: boolean;
};

export const EpisodeResolution = ({
  currentResolution,
  isLoading,
  mirror,
  onChange,
}: EpisodeResolutionProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleOnClickResolution = (e: MouseEvent<HTMLDivElement>, resolution: MirrorType) => {
    e.preventDefault();
    setDialogIsOpen(false);

    onChange(resolution);
  };

  return (
    <DropdownMenu open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <Skeleton className="h-10 w-16" />
        ) : (
          <Button variant="outline" className="w-max text-xs">
            {currentResolution} <ChevronRight width={16} height={16} strokeWidth={3} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right">
        {Object.entries(mirror || {}).map(([resolution, value], idx) => {
          if (value.length == 0) return;

          return (
            <Typography key={idx} asChild size="sm">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => handleOnClickResolution(e, resolution as MirrorType)}
              >
                {resolution}
              </DropdownMenuItem>
            </Typography>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
