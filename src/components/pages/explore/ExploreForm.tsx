'use client';

import type { getAllFilter } from '@app/api/filter';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';
import { Checkbox } from '@app/components/shared/Checkbox';
import { Input } from '@app/components/shared/Input';
import { RadioGroup, RadioGroupItem } from '@app/components/shared/RadioGroup';
import { Separator } from '@app/components/shared/Separator';
import { Skeleton } from '@app/components/shared/Skeleton';
import { Typography } from '@app/components/shared/Typography';
import { useFilterApi } from '@app/hooks/api/use-filter-api';
import { objectToQueryParams } from '@app/utils/converter';
import { useRouter } from 'next/navigation';

import { useState, type FormEventHandler } from 'react';

export const ExploreForm = ({
  status,
  type,
  order,
  genre,
}: Awaited<ReturnType<typeof getAllFilter>>) => {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    query?: string;
    status?: string;
    type?: string;
    order?: string;
    genre?: string[];
  }>();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    router.push(`/search?${objectToQueryParams(formData || {})}`);
  };

  return (
    <form className="w-full max-w-2xl flex flex-col space-y-3" onSubmit={handleOnSubmit}>
      <Input
        name="query"
        onChange={(e) => {
          setFormData((formData) => ({ ...formData, query: e.target.value }));
        }}
        value={formData?.query}
        leftIcon={{ variant: 'Search', size: 24, className: 'ml-4' }}
        placeholder="Cari anime kamu disini..."
        className="rounded-full text-md"
      />
      <Box className="flex space-x-2">
        <Typography size="sm">Status:</Typography>
        <RadioGroup
          onValueChange={(value) => {
            setFormData((formData) => ({ ...formData, status: value }));
          }}
          value={formData?.status}
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
      <Separator />
      <Box className="flex space-x-2">
        <Typography size="sm">Tipe:</Typography>
        <RadioGroup
          name="type"
          onValueChange={(value) => {
            setFormData((formData) => ({ ...formData, type: value }));
          }}
          value={formData?.type}
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
          value={formData?.order}
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
        <Box className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
      <Button className="w-full">Search</Button>
    </form>
  );
};

// eslint-disable-next-line react/display-name
ExploreForm.Skeleton = () => {
  return (
    <Box className="w-full max-w-2xl flex flex-col space-y-3">
      {/* <Input
        name="query"
        onChange={(e) => {
          setFormData((formData) => ({ ...formData, query: e.target.value }));
        }}
        leftIcon={{ variant: 'Search', size: 24, className: 'ml-4' }}
        className="rounded-full text-lg"
      /> */}
      <Skeleton className="rounded-full w-full h-12" />
      <Box className="flex space-x-2">
        <Typography size="sm">Status:</Typography>
        <Box className="flex flex-row space-x-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return (
                <Box key={idx} className="flex items-center space-x-2">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Separator />
      <Box className="flex space-x-2">
        <Typography size="sm">Tipe:</Typography>
        <Box className="flex flex-row space-x-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return (
                <Box key={idx} className="flex items-center space-x-2">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Separator />
      <Box className="flex space-x-2">
        <Typography size="sm">Urutan:</Typography>
        <Box className="flex flex-row space-x-2">
          {Array(3)
            .fill('')
            .map((_, idx) => {
              return (
                <Box key={idx} className="flex items-center space-x-2">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Separator />
      <Box className="flex flex-col space-y-2">
        <Typography size="sm">Genre:</Typography>
        <Box className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array(8)
            .fill('')
            .map((_, idx) => {
              return (
                <Box key={idx} className="flex items-center space-x-2">
                  <Skeleton className="size-3 rounded-sm" />
                  <Skeleton className="h-4 w-full" />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Skeleton className="h-10 w-full rounded-lg" />
    </Box>
  );
};
