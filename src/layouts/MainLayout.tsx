import { Box } from '@app/components/shared/Box';
import { MainNavbar } from './MainNavbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="w-full max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <MainNavbar />
      <Box as="main" className="relative w-full flex-1 px-4 md:px-10 lg:px-20 py-4">
        {children}
      </Box>
    </Box>
  );
};
