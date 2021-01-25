import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import { mockSongInfo } from '../../__mocks__/mocks';

import ResponseItem from '../components/popup/components/ResponseItem';
import { ResponseBox } from '../components/popup/components/ResponseBox';

describe('<ResponseBox /> should render various elements of the song result correctly', () => {
  beforeEach(() => {
    render(
      <ResponseBox
        animation={false}
        setSongInfo={''}
        songInfo={JSON.stringify(mockSongInfo)}
      ></ResponseBox>,
    );
  });
  it('should render the trackID correctly', () => {
    const trackId = screen.getByText('Woods');
    expect(trackId).toBeInTheDocument();
  });
  it('should render the Artist correctly', () => {
    const trackArtist = screen.getByText('&ME');
    expect(trackArtist).toBeInTheDocument();
  });
  it('should render the release date correctly', () => {
    const trackReleased = screen.getByText('2015-07-10');
    expect(trackReleased).toBeInTheDocument();
  });
  it('should render the album title correctly', () => {
    const albumTitle = screen.getByText('Trilogy');
    expect(albumTitle).toBeInTheDocument();
  });
  it('should render the Label correctly', () => {
    const artistLabel = screen.getByText('Keinemusik');
    expect(artistLabel).toBeInTheDocument();
  });
  it('should render all elements together', () => {
    const trackId = screen.getByText('Woods');
    const trackArtist = screen.getByText('&ME');
    const trackReleased = screen.getByText('2015-07-10');
    const albumTitle = screen.getByText('Trilogy');
    const artistLabel = screen.getByText('Keinemusik');

    expect(trackId).toBeInTheDocument();
    expect(trackArtist).toBeInTheDocument();
    expect(trackReleased).toBeInTheDocument();
    expect(albumTitle).toBeInTheDocument();
    expect(artistLabel).toBeInTheDocument();
  });
  test('rendered ResponseBox matches the existing snapshot when songInfo is provided', () => {
    const tree = render(
      <ResponseBox
        songInfo={JSON.stringify(mockSongInfo)}
        setSongInfo=""
        animation="false"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('<ResponseItem />', () => {
  test('should render responseItem to match previous snapshot', () => {
    const tree = render(<ResponseItem item="trackId" attribute="Woods" />);
    expect(tree).toMatchSnapshot();
  });
});
