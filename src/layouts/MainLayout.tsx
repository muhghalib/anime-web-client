import { MainNavbar } from './MainNavbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNavbar />
      <main className="w-full px-4 md:px-10 lg:px-20 pb-6">{children}</main>
    </>
  );
};
