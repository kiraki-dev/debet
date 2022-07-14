import React, { FC } from 'react';
import { useSetActivePage } from '@debet/pageee';

interface ListPageProps {
  items: any[],
}

export const ListPage: FC<ListPageProps> = ({ items }) => {
  const setActivePage = useSetActivePage();

  return (
    <div className="PageContainer">
      <h1>List page goes here</h1>
      <button className="Button" onClick={() => setActivePage('create')}>Create</button>

      {
        items.map((item) => (
          <div className="PageItem" onClick={() => setActivePage('edit', item)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))
      }
    </div>
  );
};
