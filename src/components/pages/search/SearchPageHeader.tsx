import { Box } from '@app/components/shared/Box';
import { Typography } from '@app/components/shared/Typography';

export const SearchPageHeader = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <Box className="flex flex-col space-y-1">
      <Typography size="2xl" weight="semibold">
        Search result of
      </Typography>
      <Typography size="sm" color="muted" weight="regular">
        {searchQuery}
      </Typography>
    </Box>
  );
};
