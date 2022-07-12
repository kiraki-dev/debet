// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Page, Pages } from '@debet/pageee';
import styles from './app.module.css';

export function App() {
  return (
    <>
      <h1>Welcome to Pagee!</h1>

      <Pages>
        <Page path="" index element={<div>List</div>} />
        <Page path="edit" element={<div>Edit</div>} />
        <Page path="create" element={<div>Create</div>} />
      </Pages>
      <div />
    </>
  );
}

export default App;
