import { toString } from '../utils';

describe('utils', () => {
  it('should make string fra array correctly', () => {
    const array = ['1', '2', '3'];
    const result = toString(array);

    expect(result).toBe('1,2,3');
  });
});
