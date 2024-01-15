import { Box } from '@app/components/shared/Box';
import { Typography } from '@app/components/shared/Typography';

export const GenrePageHeader = ({ genreName }: { genreName: string }) => {
  return (
    <Box className="flex flex-col space-y-1">
      <Typography size="2xl" weight="semibold">
        Genre {genreName}
      </Typography>
      <Typography size="sm" color="muted" weight="regular">
        kami telah mencarikan anime yang terkait dengan genre {genreName}
      </Typography>
    </Box>
  );
};
