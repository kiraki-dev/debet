import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import usePageManager from './use-page-manager';

describe('usePageManager', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePageManager());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
