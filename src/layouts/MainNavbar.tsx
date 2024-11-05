'use client';

import type { ChangeEvent, KeyboardEventHandler, MouseEventHandler } from 'react';
import Link from 'next/link';

import { Menu, Search } from 'lucide-react';
import { Box } from '@app/components/shared/Box';
import { Input } from '@app/components/shared/Input';
import { Typography } from '@app/components/shared/Typography';
import { NavigationScrollArea } from '@app/components/scrollArea/NavigationScrollArea';

import { cn } from '@app/lib/cn';
import { Skeleton } from '@app/components/shared/Skeleton';
import { ThemeToggle } from '@app/components/toggle/ThemeToggle';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@app/components/shared/DropdownMenu';
import { Button } from '@app/components/shared/Button';
import { Card } from '@app/components/shared/Card';
import { AppLogo } from '@app/components/shared/AppLogo';
import { ScrollArea, ScrollAreaViewport } from '@app/components/shared/ScrollArea';
import { ReactSpinners } from '@app/components/loader/ReactSpinners';

import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@app/hooks/utils/use-debounce';
import { useAnimeApi } from '@app/hooks/api/use-anime-api';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NAVBAR_LINK = [
  { label: 'Anime List', url: '/' },
  {
    label: 'Ongoing Anime',
    url: '/ongoing-anime',
  },
  { label: 'Explore', url: '/explore' },
];

export const MainNavbar = () => {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      className="w-full sticky top-0 z-20 bg-background flex-col space-y-3 py-3 px-4 transition-transform duration-700 md:px-10 lg:px-20 flex"
    >
      <Box className="w-full flex items-center space-x-4 justify-between">
        <Box className="w-full items-center flex space-x-3">
          <AppLogo className="flex-none" />
          <SearchInput />
        </Box>
        <Box className="flex space-x-4 max-md:hidden">
          <Box className="flex space-x-4 items-center min-w-max">
            {NAVBAR_LINK.map(({ label, url }, idx) => {
              return (
                <Typography
                  key={idx}
                  size="sm"
                  weight="light"
                  className={cn('hover:font-medium transition-all', {
                    'font-medium': pathname === url,
                  })}
                  asChild
                >
                  <Link href={url}>{label}</Link>
                </Typography>
              );
            })}
          </Box>
          <ThemeToggle />
        </Box>
        <DropdownNavbarMenu />
      </Box>
    </Box>
  );
};

const DropdownNavbarMenu = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="block w-fit h-fit p-2 text-foreground md:hidden">
          <Menu width={24} height={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col space-y-1" align="end">
        {NAVBAR_LINK.map(({ label, url }, idx) => {
          return (
            <DropdownMenuItem key={idx} asChild>
              <Button
                asChild
                onClick={() => setDropdownIsOpen(false)}
                size="sm"
                className="font-normal justify-start cursor-pointer"
                variant={url == pathname ? 'default' : 'ghost'}
              >
                <Link href={url}>{label}</Link>
              </Button>
            </DropdownMenuItem>
          );
        })}
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (pathname == '/search' && Boolean(searchParams.get('query'))) {
      setSearchQuery(decodeURIComponent(searchParams.get('query') as string));
    }

    setSearchQuery('');
  }, [pathname, searchParams]);

  const { data: searchResult, isLoading: searchResultIsLoading } = useAnimeApi().getAll(
    {
      title: searchQuery,
    },
    { enabled: searchQuery !== '' },
  );

  const handleOnChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, 0);

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key == 'Enter') {
      router.push(`/search?query=${e.currentTarget.value}`);
      inputRef.current?.blur();
    }
  };

  return (
    <Box className="flex group relative w-full max-w-xs items-center">
      <Button variant="secondary" size="sm" className="sm:hidden">
        <Link href="/explore">
          <Search className="size-4" />
        </Link>
      </Button>
      <Input
        type="text"
        name="query"
        ref={inputRef}
        defaultValue={searchQuery}
        leftIcon={{ variant: 'Search' }}
        placeholder="Search anime disini..."
        className="rounded-full max-sm:hidden"
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
      />
      <Card
        data-active={searchQuery != ''}
        className="w-full z-10 absolute top-12 p-0 left-0 hidden group-has-[:focus]:data-[active=true]:flex flex-col h-max"
      >
        {searchResultIsLoading && (
          <Box className="w-fit mx-auto py-2">
            <Typography weight="regular">loading...</Typography>
          </Box>
        )}
        <ScrollArea>
          <ScrollAreaViewport className="h-fit max-h-64">
            {searchResult?.map(({ title }, idx) => {
              return (
                <Link
                  key={idx}
                  data-title={title}
                  href={{
                    pathname: '/search',
                    query: {
                      query: title,
                    },
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => inputRef.current?.blur()}
                >
                  <Box className="w-full p-2 cursor-pointer hover:bg-muted-foreground/20">
                    <Typography size="sm" className="line-clamp-2">
                      {title}
                    </Typography>
                  </Box>
                </Link>
              );
            })}
          </ScrollAreaViewport>
        </ScrollArea>
      </Card>
    </Box>
  );
};
