import { useState } from 'react';

export interface PageDescriptor {
  path: string;
  isIndex: boolean;
}

type ChangeListener = () => void;

type WithData<T> = T & { data?: unknown };

export interface PageManager {
  readonly activePage: string;
  readonly pageData: unknown;
  addChangeListener(listener: ChangeListener): void;
  removeChangeListener(listener: ChangeListener): void;
  setActivePage(page: string, data?: unknown): void;
}

export const usePageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  const [pageManager] = useState(() => createPageManager(pageDescriptors));

  return pageManager;
}

const createPageManager = (pageDescriptors: PageDescriptor[]): PageManager => {
  let changeListeners: ChangeListener[] = [];
  const pages = new Map<string, WithData<PageDescriptor>>(
    pageDescriptors.map((descriptor) => [descriptor.path, { ...descriptor, data: undefined }])
  );

  const indexPage = pageDescriptors.find((descriptor) => descriptor.isIndex) ?? pageDescriptors[0];
  let activePage = indexPage.path;

  const fireChange = () => changeListeners.forEach(listener => listener());

  return {
    addChangeListener: (listener: ChangeListener) => {
      changeListeners.push(listener);
    },
    removeChangeListener(listener: ChangeListener) {
      changeListeners = changeListeners.filter((cl) => cl !== listener);
    },
    setActivePage(page: string, data?: unknown) {
      const oldPageDescriptor = pages.get(activePage);
      if (activePage !== page && oldPageDescriptor) {
        oldPageDescriptor.data = undefined;
      }

      const pageDescriptor = pages.get(page);
      if (!pageDescriptor) {
        throw new Error(`Invalid page "${page}"`);
      }

      pageDescriptor.data = data;
      activePage = page;
      fireChange();
    },
    get activePage(): string {
      return activePage;
    },
    get pageData() {
      return pages.get(activePage)?.data;
    },
  }
};
