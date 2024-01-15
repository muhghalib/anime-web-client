'use client';

import { Box } from '../shared/Box';
import { Button } from '../shared/Button';
import { Typography } from '../shared/Typography';

import { useRouter } from 'next/navigation';

export const ErrorConnection = () => {
  const { refresh } = useRouter();

  return (
    <Box className="flex mx-auto flex-col mt-12 space-y-1 items-center">
      <Typography size="xl" align="center">
        Error: 503 Internal server error
      </Typography>
      <Typography className="italic" weight="light" size="sm" align="center">
        Service unavailable please check your connection.
      </Typography>
      <Button onClick={() => refresh()} size="sm" variant="secondary">
        Try again
      </Button>
    </Box>
  );
};
