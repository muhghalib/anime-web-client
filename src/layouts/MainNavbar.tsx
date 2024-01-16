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

import { useRef, useState } from 'react';
import { useDebounce } from '@app/hooks/utils/use-debounce';
import { useAnimeApi } from '@app/hooks/api/use-anime-api';
import { useGenreApi } from '@app/hooks/api/use-genre-api';
import { useParams, usePathname, useRouter } from 'next/navigation';

const NAVBAR_LINK = [
  { label: 'Home', url: '/' },
  {
    label: 'Ongoing Anime',
    url: '/ongoing-anime',
  },
  { label: 'Jadwal anime', url: '/schedule' },
];

export const MainNavbar = () => {
  const pathname = usePathname();

  const { data: genres, isLoading: genresIsLoading } = useGenreApi().getAll();

  return (
    <Box className="w-full sticky top-0 z-20 bg-background flex-col space-y-3 pt-6 pb-2 px-4 transition-transform duration-700 md:px-10 lg:px-20 flex">
      <Box className="w-full flex items-center space-x-4 justify-between">
        <Box className="w-full items-center flex space-x-3">
          <AppLogo />
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
      {genresIsLoading ? (
        <Box className="w-full flex space-x-4 pt-5 overflow-hidden">
          {Array(36)
            .fill('')
            .map((_, idx) => {
              return <Skeleton key={idx} className="w-10 h-5 flex-none" />;
            })}
        </Box>
      ) : (
        <NavigationScrollArea>
          <Box className="w-fit flex">
            {genres?.map(({ judul, slug }, idx) => {
              return (
                <Button key={idx} asChild size="sm" variant="ghost" className="rounded-none">
                  <Link href="/genre/[genre_slug]" as={`/genre/${slug}`}>
                    {judul}
                  </Link>
                </Button>
              );
            })}
          </Box>
        </NavigationScrollArea>
      )}
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
            <Button
              key={idx}
              asChild
              onClick={() => setDropdownIsOpen(false)}
              size="sm"
              className="font-normal justify-start"
              variant={url == pathname ? 'secondary' : 'ghost'}
            >
              <DropdownMenuItem key={idx}>
                <Link href={url}>{label}</Link>
              </DropdownMenuItem>
            </Button>
          );
        })}
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { search_query } = useParams<{ search_query: string }>();
  const [searchQuery, setSearchQuery] = useState(decodeURIComponent(search_query || ''));
  const router = useRouter();

  const handleOnChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    return setSearchQuery(e.target.value);
  }, 200);

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key == 'Enter') {
      router.push(`/search/${e.currentTarget.value}`);
      inputRef.current?.blur();
    }
  };

  const handleOnClickResult: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
  };

  const { data: searchResult, isLoading: searchResultIsLoading } = useAnimeApi().getAll({
    search: searchQuery,
  });

  return (
    <Box className="flex group relative w-full max-w-xs items-center space-x-2 px-3 py-2.5 rounded-full border-2 border-muted">
      <Box className="block text-muted-foreground">
        <Search width={18} height={18} />
      </Box>
      <Input
        type="text"
        ref={inputRef}
        placeholder="Search anime disini..."
        className="border-none p-0 h-full focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none focus-visible:ring-offset-0 w-full bg-transparent"
        defaultValue={searchQuery}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
      />
      <Card className="w-full z-10 absolute top-12 p-0 left-0 hidden group-[:has(:focus)]:flex flex-col h-max">
        {searchResultIsLoading && (
          <Box className="w-fit mx-auto py-2">
            <ReactSpinners variant="PulseLoader" width={10} height={10} />
          </Box>
        )}
        <ScrollArea>
          <ScrollAreaViewport className="h-fit max-h-64">
            {searchResult?.map(({ judul }, idx) => (
              <Link
                key={idx}
                href="/search/[search_query]"
                as={`/search/${judul}`}
                onMouseDown={handleOnClickResult}
                onClick={inputRef.current?.blur}
              >
                <Box className="w-full p-2 cursor-pointer hover:bg-muted-foreground/20">
                  <Typography size="sm" className="line-clamp-2">
                    {judul}
                  </Typography>
                </Box>
              </Link>
            ))}
          </ScrollAreaViewport>
        </ScrollArea>
      </Card>
    </Box>
  );
};
