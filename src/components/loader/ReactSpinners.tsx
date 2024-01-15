import { useTheme } from 'next-themes';
import * as Loader from 'react-spinners';

type ReactSpinnersProps = {
  variant?: keyof typeof Loader;
  height?: number | string;
  width?: number | string;
};

export const ReactSpinners = ({
  variant = 'FadeLoader',
  width = 30,
  height = 30,
}: ReactSpinnersProps) => {
  const { theme } = useTheme();

  const Spinner = Loader[variant];

  return (
    <Spinner
      width={width}
      height={height}
      color={theme == 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222 84% 4%)'}
    />
  );
};
