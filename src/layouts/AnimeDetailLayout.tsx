import { Box } from '@app/components/shared/Box';

export const AnimeDetailLayout = ({
  children,
  related_anime,
}: {
  children: React.ReactNode;
  related_anime: React.ReactNode;
}) => {
  return (
    <Box className="w-full grid gap-6 grid-cols-1 md:grid-cols-2">
      {children}
      {related_anime}
    </Box>
  );
};
