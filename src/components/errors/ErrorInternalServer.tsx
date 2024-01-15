'use client';

import { Button } from '../shared/Button';
import { Box } from '../shared/Box';
import { Typography } from '../shared/Typography';

import { useRouter } from 'next/navigation';

export const ErrorInternalServer = () => {
  const { refresh } = useRouter();

  return (
    <Box className="flex mx-auto flex-col mt-12 space-y-1 items-center">
      <Typography size="xl" align="center">
        Error: 500 Internal server error
      </Typography>
      <Typography className="italic" weight="light" size="sm" align="center">
        Something when wrong please try again later.
      </Typography>
      <Button onClick={() => refresh()} size="sm" variant="secondary">
        Try again
      </Button>
    </Box>
  );
};
