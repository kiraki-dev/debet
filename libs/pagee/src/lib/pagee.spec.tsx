import { render } from '@testing-library/react';

import Pagee from './pagee';

describe('Pagee', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pagee />);
    expect(baseElement).toBeTruthy();
  });
});
