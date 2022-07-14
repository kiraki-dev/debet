import { useState } from 'react';

export interface PageDescriptor {
  path: string;
  isIndex: boolean;
}

type ChangeListener = () => void;

type WithData<T> = T & { data?: unknown };

export interface PageManager {
  activePage: string;
  pageData: unknown;
  addChangeListener(listener: ChangeListener): void;
  removeChangeListener(listener: ChangeListener): void;
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
    get activePage() {
      return activePage;
    },
    set activePage(value: string) {
      const activePageDescriptor = pages.get(activePage);
      if (activePage !== value && activePageDescriptor) {
        activePageDescriptor.data = undefined;
      }
      activePage = value;
      fireChange();
    },
    get pageData() {
      return pages.get(activePage)?.data;
    },
    set pageData(value: unknown) {
      const activePageDescriptor = pages.get(activePage);
      if (activePageDescriptor) {
        activePageDescriptor.data = value;
      }
      fireChange();
    }
  }
};
