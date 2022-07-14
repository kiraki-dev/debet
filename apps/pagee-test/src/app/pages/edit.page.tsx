import React, { FC, FormEvent, useRef } from 'react';
import { useActivePageData, useSetActivePage } from '@debet/pageee';

interface EditPageProps {
  onSubmit: (item: any, oldItem: any) => void;
}

export const EditPage: FC<EditPageProps> = ({ onSubmit }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const originalItem = useActivePageData<any>();
  const setActivePage = useSetActivePage();

  const handleFormSubmit = (ev: FormEvent) => {
    ev.stopPropagation();
    onSubmit(
      { name: nameRef.current?.value, description: descriptionRef.current?.value },
      originalItem,
    );
    setActivePage('');
  }

  if (!originalItem) {
    return null;
  }

  return (
    <div className="PageContainer">
      <h1>Edit "{originalItem.name}"</h1>

      <form onSubmit={handleFormSubmit} className="CreatePageForm">
        <label>Name</label>
        <input type="text" name="name" defaultValue={originalItem.name} ref={nameRef} />

        <label>Description</label>
        <input type="text" name="description" defaultValue={originalItem.description} ref={descriptionRef} />

        <div className="FormActions">
          <button type="submit" className="Button">Submit</button>

          <button
            type="button"
            className="Button"
            onClick={() => setActivePage('')}
          >
            Cancel
          </button>
        </div>
      </form>

    </div>
  );
};
