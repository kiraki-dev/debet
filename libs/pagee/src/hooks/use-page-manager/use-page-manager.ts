import { useState } from 'react';

export interface PageDescriptor {
  path: string;
  isIndex: boolean;
}

type WithData<T> = T & { data?: unknown };

export interface PageManager {
  activePage: string;
  pageData: unknown;
}

export const usePageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  const [pageManager] = useState(() => createPageManager(pageDescriptors));

  return pageManager;
}

const createPageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  const pages = new Map<string, WithData<PageDescriptor>>(
    pageDescriptors.map((descriptor) => [descriptor.path, { ...descriptor, data: undefined }])
  );

  const indexPage = pageDescriptors.find((descriptor) => descriptor.isIndex) ?? pageDescriptors[0];
  let activePage = indexPage.path;

  return {
    get activePage() {
      return activePage;
    },
    set activePage(value: string) {
      const activePageDescriptor = pages.get(activePage);
      if (activePage !== value && activePageDescriptor) {
        activePageDescriptor.data = undefined;
      }
      activePage = value;
    },
    get pageData() {
      return pages.get(activePage)?.data;
    },
    set pageData(value: unknown) {
      const activePageDescriptor = pages.get(activePage);
      if (activePageDescriptor) {
        activePageDescriptor.data = value;
      }
    }
  }
};
