import { FC, ReactNode } from 'react';
import { useActivePagePath } from '../pages/pages';

export interface PageProps {
  index?: boolean;
  path: string;
  element: ReactNode;
}

export const Page: FC<PageProps> = ({ path = '', element }) => {
  const activePath = useActivePagePath();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {activePath === path ? element : null}
    </>
  );
};
