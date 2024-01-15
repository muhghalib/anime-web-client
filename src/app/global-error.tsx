'use client';

import {ErrorInternalServer} from '@app/components/errors/ErrorInternalServer';
import { Box } from '@app/components/shared/Box';
import { Button } from '@app/components/shared/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box className="h-screen w-full grid place-items-center">
      <Box className="flex flex-col items-center space-y-3">
        <ErrorInternalServer />
        <Button onClick={() => reset()}>Try again</Button>
      </Box>
    </Box>
  );
}
