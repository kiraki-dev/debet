import {
  createContext,
  FC,
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useContext,
} from 'react';

import {
  PageManager,
  usePageManager,
} from '../../hooks/use-page-manager/use-page-manager';
import { Page } from '../page/page';

const PageManagerContext = createContext<PageManager | null>(null);

export interface PagesProps {
  children: ReactNode;
}

export const Pages: FC<PagesProps> = ({ children }) => {
  const pageNodes = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Page
  ) as ReactElement[];

  const pageDescriptors = pageNodes.map(({ props }) => ({
    path: props.path,
    element: props.element,
    isIndex: props.index,
  }));

  const pageManager = usePageManager(pageDescriptors);

  return (
    <PageManagerContext.Provider value={pageManager}>
      {children}
    </PageManagerContext.Provider>
  );
};

const usePageManagerContext = (parentName: string) => {
  const pageManager = useContext(PageManagerContext);

  if (pageManager === null) {
    throw new Error(`${parentName} must be used within a Pages`);
  }

  return pageManager;
}

const useActivePagePath = () => {
  return usePageManagerContext('useActivePagePath').activePage;
};

const useActivePageElement = () => {
  return usePageManagerContext('useActivePageElement').pageElement;
};

const useActivePageData = () => {
  return usePageManagerContext('useActivePageData').pageData;
};
