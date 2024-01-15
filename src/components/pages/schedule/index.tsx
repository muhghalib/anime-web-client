'use client';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@app/components/shared/Accordion';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Separator } from '@app/components/shared/Separator';
import { Typography } from '@app/components/shared/Typography';
import { ErrorConnection } from '@app/components/errors/ErrorConnection';
import { Skeleton } from '@app/components/shared/Skeleton';
import { SchedulePageHeader } from './SchedulePageHeader';

import { useScheduleApi } from '@app/hooks/api/use-schedule-api';

export const SchedulePage = () => {
  const { data, isLoading, isError } = useScheduleApi().getAll();

  if (isError) return <ErrorConnection />;

  return (
    <Box className="flex flex-col space-y-4">
      <SchedulePageHeader />
      <Separator />
      {isLoading ? (
        <Box className="flex flex-col space-y-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return <Skeleton key={idx} className="w-full h-10 rounded-none" />;
            })}
        </Box>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {data!.map(({ hari, anime }, idx) => {
            return (
              <AccordionItem value={hari} key={idx}>
                <Button
                  variant="ghost"
                  className="rounded-none flex justify-between px-2 py-3"
                  asChild
                >
                  <AccordionTrigger className="!no-underline">{hari}</AccordionTrigger>
                </Button>
                <AccordionContent asChild>
                  <Box className="flex flex-col w-max px-2 divide-y-2">
                    {anime.map(({ judul, slug }) => {
                      return (
                        <Button
                          key={slug}
                          variant="link"
                          className="rounded-none w-full justify-start px-0 text-foreground"
                          asChild
                        >
                          <Typography size="sm" weight="regular" className="py-2" asChild>
                            <Link href="/[anime_slug]" as={`/${slug}`}>
                              {judul}
                            </Link>
                          </Typography>
                        </Button>
                      );
                    })}
                  </Box>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </Box>
  );
};
