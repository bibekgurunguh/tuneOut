/*global chrome*/
/// <reference types="chrome" />

import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import Popup from '../components/popup/Popup';

describe('captureAudioFromCurrentTab()', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Popup />);
  });
  it('should trigger the animation when identify button is pressed', async () => {
    const identify = screen.getByRole('button');
    fireEvent.click(identify);

    const animation = await document.querySelector('.animation');
    expect(animation).toBeInTheDocument();
  });
});