// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Page, Pages } from '@debet/pageee';

import './app.scss';
import { ListPage } from './pages/list.page';
import { useState } from 'react';
import { CreatePage } from './pages/create.page';
import { EditPage } from './pages/edit.page';

const INITIAL_ITEMS = [
  { name: 'hello', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'world', description: 'Quisque pellentesque quis sapien eget imperdiet' },
];

export function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const handleAddItem = (item: any) => {
    setItems([...items, item]);
  };

  const handleEditItem = (item: any, oldItem: any) => {
    setItems(items.map((it) => it === oldItem ? item : it));
  };

  return (
    <>
      <h1>Welcome to Pagee!</h1>

      <Pages>
        <Page path="" index element={<ListPage items={items} />} />
        <Page path="edit" element={<EditPage onSubmit={handleEditItem} />} />
        <Page path="create" element={<CreatePage onSubmit={handleAddItem} />} />
      </Pages>
      <div />
    </>
  );
}

export default App;
