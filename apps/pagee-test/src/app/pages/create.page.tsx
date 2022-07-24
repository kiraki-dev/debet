import React, { FC, FormEvent, useRef } from 'react';
import { useSetActivePage } from '@debet/pagee';

interface CreatePageProps {
  onSubmit: (item: any) => void;
}

export const CreatePage: FC<CreatePageProps> = ({ onSubmit }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const setActivePage = useSetActivePage();

  const handleFormSubmit = (ev: FormEvent) => {
    ev.stopPropagation();
    onSubmit({ name: nameRef.current?.value, description: descriptionRef.current?.value });
    setActivePage('');
  }

  return (
    <div className="PageContainer">
      <h1>Create an item</h1>

      <form onSubmit={handleFormSubmit} className="CreatePageForm">
        <label>Name</label>
        <input type="text" name="name" ref={nameRef} />

        <label>Description</label>
        <input type="text" name="description" ref={descriptionRef} />

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
