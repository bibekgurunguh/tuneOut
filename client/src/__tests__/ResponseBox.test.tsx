import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockSongInfo from '../../__mocks__/mocks';

import ResponseItem from '../components/popup/components/ResponseItem';

describe('<ResponseItem /> 1', () => {
  test('matches snapshot', () => {
    const tree = render(<ResponseItem item="" attribute="" />);
    expect(tree).toMatchSnapshot();
  });

  test('should display a blank login form, with remember me checked by default', async () => {
    await render(<ResponseItem item="testitem" attribute="testattribute" />);
  });
});
// describe('<ResponseItem /> 2', () => {
// });
