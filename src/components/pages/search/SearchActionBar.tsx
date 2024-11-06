'use client';

import type { getAllFilter } from '@app/api/filter';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Checkbox } from '@app/components/shared/Checkbox';
import { RadioGroup, RadioGroupItem } from '@app/components/shared/RadioGroup';
import { Separator } from '@app/components/shared/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@app/components/shared/Sheet';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import { objectToQueryParams } from '@app/utils/converter';
import { Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

export const SearchActionBar = ({
  status,
  type,
  order,
  genre,
}: Awaited<ReturnType<typeof getAllFilter>>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<{
    query?: string;
    status?: string;
    type?: string;
    order?: string;
    genre?: string[];
  }>({});

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      query: searchParams.get('query') || undefined,
      status: searchParams.get('status') || undefined,
      type: searchParams.get('type') || undefined,
      order: searchParams.get('order') || undefined,
      genre: searchParams.getAll('genre'),
    }));
  }, [searchParams]);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    router.push(`/search?${objectToQueryParams(formData || {})}`);

    setFilterModalIsOpen(false);
  };

  return (
    <Box className="flex sticky top-0 items-center w-full p-2 bg-muted rounded-md">
      <Typography>{formData.query || ''}</Typography>
      <Sheet modal open={filterModalIsOpen} onOpenChange={setFilterModalIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md overflow-auto">
          <SheetHeader className="text-left">
            <SheetTitle>Filter</SheetTitle>
            <SheetDescription>Filter hasil pencarian anime kamu</SheetDescription>
          </SheetHeader>
          <form className="w-full flex flex-col space-y-3 mt-4" onSubmit={handleOnSubmit}>
            <Box className="flex space-x-2">
              <Typography size="sm">Status:</Typography>
              <RadioGroup
                onValueChange={(value) => {
                  setFormData((formData) => ({ ...formData, status: value }));
                }}
                value={formData.status}
                name="status"
                className="flex flex-row flex-wrap"
              >
                {status.map(({ title, slug }, idx) => {
                  return (
                    <Box key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={slug} />
                      <Typography size="sm">{title}</Typography>
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>
            <Box className="flex space-x-2">
              <Typography size="sm">Tipe:</Typography>
              <RadioGroup
                onValueChange={(value) => {
                  setFormData((formData) => ({ ...formData, type: value }));
                }}
                value={formData.type}
                name="type"
                className="flex flex-row flex-wrap"
              >
                {type.map(({ title, slug }, idx) => {
                  return (
                    <Box key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={slug} />
                      <Typography size="sm">{title}</Typography>
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>
            <Separator />
            <Box className="flex space-x-2">
              <Typography size="sm">Urutan:</Typography>
              <RadioGroup
                name="order"
                onValueChange={(value) => {
                  setFormData((formData) => ({ ...formData, order: value }));
                }}
                value={formData.order}
                className="flex flex-row flex-wrap"
              >
                {order.map(({ title, slug }, idx) => {
                  return (
                    <Box key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={slug} />
                      <Typography size="sm">{title}</Typography>
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>
            <Separator />
            <Box className="flex flex-col space-y-2">
              <Typography size="sm">Genre:</Typography>
              <Box className="w-full grid grid-cols-2 gap-2">
                {genre.map(({ title, slug }, idx) => {
                  return (
                    <Box key={idx} className="flex items-center space-x-2 w-max">
                      <Checkbox
                        value={slug}
                        checked={formData?.genre?.includes(slug)}
                        onCheckedChange={(checked) =>
                          setFormData((formData) => ({
                            ...formData,
                            genre: checked
                              ? [...(formData?.genre || []), slug]
                              : formData?.genre?.filter((genre) => genre != slug),
                          }))
                        }
                        className="size-3"
                      />
                      <Typography size="sm">{title}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Button className="w-full">Apply</Button>
          </form>
        </SheetContent>
      </Sheet>
    </Box>
  );
};

// eslint-disable-next-line react/display-name
SearchActionBar.Skeleton = () => {
  return <Skeleton className="w-full h-14 rounded-md" />;
};
