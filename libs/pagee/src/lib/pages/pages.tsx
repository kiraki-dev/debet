import {
  createContext,
  FC,
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  useContext,
  useCallback,
  useEffect,
  useState,
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
};

const useListenToPageManagerChanges = (pageManager: PageManager) => {
  const [, setChangeIndicator] = useState(0);

  useEffect(() => {
    const listener = () => setChangeIndicator((val) => val + 1);
    pageManager.addChangeListener(listener);

    return () => pageManager.removeChangeListener(listener);
  }, [pageManager])
}

export const useActivePagePath = () => {
  const pageManager = usePageManagerContext('useActivePagePath');

  useListenToPageManagerChanges(pageManager);

  return pageManager.activePage;
};

export const useActivePageData = <T extends unknown = unknown>(): T => {
  const pageManager = usePageManagerContext('useActivePagePath');

  useListenToPageManagerChanges(pageManager);

  return pageManager.pageData as T;
};

export const useSetActivePage = () => {
  const pageManager = usePageManagerContext('useSetActivePage');

  return useCallback((page: string, data?: unknown) => {
    pageManager.setActivePage(page, data);
  }, [pageManager]);
};
