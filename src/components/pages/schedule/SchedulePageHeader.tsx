import { Box } from '@app/components/shared/Box';
import { Typography } from '@app/components/shared/Typography';

export const SchedulePageHeader = () => {
  return (
    <Box className="flex flex-col space-y-1">
      <Typography size="2xl" weight="semibold">
        Jadwal update anime
      </Typography>
      <Typography size="sm" color="muted" weight="regular">
        terus pantau update terbaru dari anime favorit kamu
      </Typography>
    </Box>
  );
};
