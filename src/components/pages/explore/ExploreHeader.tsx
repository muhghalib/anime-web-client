import { Box } from '@app/components/shared/Box';
import { Typography } from '@app/components/shared/Typography';

export const ExploreHeader = () => {
  return (
    <Box as="header" className="flex flex-col space-y-2 md:max-w-xl">
      <Typography
        size="3xl"
        weight="semibold"
        align="center"
        className="md:text-5xl tracking-tight text-pretty"
      >
        Eksplor berbagai anime yang kamu cari
      </Typography>
      <Typography size="sm" color="muted" align="center">
        Temukan anime berdasarkan status, type, ataupun genre kesukaan kamu
      </Typography>
    </Box>
  );
};
