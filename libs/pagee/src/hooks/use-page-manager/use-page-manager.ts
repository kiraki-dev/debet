import { ReactNode, useState } from 'react';

export interface PageDescriptor {
  path: string;
  isIndex: boolean;
  element: ReactNode;
}

type WithData<T> = T & { data: unknown };

export interface PageManager {
  activePage: string;
  get pageElement(): ReactNode | null;
  get pageData(): unknown;
}

export const usePageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  const [pageManager] = useState(() => createPageManager(pageDescriptors));

  return pageManager;
}

const createPageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  const pages = new Map<string, WithData<PageDescriptor>>(
    pageDescriptors.map((descriptor) => [descriptor.path, { ...descriptor, data: null }])
  );

  const indexPage = pageDescriptors.find((descriptor) => descriptor.isIndex) ?? pageDescriptors[0];
  let activePage = indexPage.path;

  return {
    get activePage() {
      return activePage;
    },
    set activePage(value: string) {
      activePage = value;
    },
    get pageElement() {
      return pages.get(activePage)?.element;
    },
    get pageData() {
      return pages.get(activePage)?.data;
    },
  }
};
