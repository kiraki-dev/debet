import { FC, ReactNode } from 'react';

export interface PageProps {
  index?: boolean;
  path: string;
  element: ReactNode;
}

export const Page: FC<PageProps> = ({ index = false, path = '', element }) => {
  return (
    <div>
      <h1>Welcome to Page!</h1>
    </div>
  );
};
