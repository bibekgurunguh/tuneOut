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

import { mockSongInfo, clintEastwoodSongInfo } from '../../__mocks__/mocks';
import ResponseItem from '../components/popup/components/ResponseItem';
import { ResponseBox } from '../components/popup/components/ResponseBox';
import Popup from '../components/popup/Popup'
const chrome = require('sinon-chrome');

describe('<ResponseBox /> should render various elements of the song result correctly', () => {
  beforeEach(() => {
    render(
      <ResponseBox
        animation={false}
        stringifiedSongInfo={JSON.stringify(mockSongInfo)}
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
        stringifiedSongInfo={JSON.stringify(mockSongInfo)}
        animation={false}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('<ResponseBox /> Links container', () => {
  beforeEach(() => {
    render(
      <ResponseBox
        animation={false}
        stringifiedSongInfo={JSON.stringify(clintEastwoodSongInfo)}
      ></ResponseBox>,
    );
  });
  it('should display links container', () => {
    const trackId = document.querySelector('.linkbox');
    expect(trackId).toBeInTheDocument();
  });
  it('should display youtube button', () => {
    const trackId = document.querySelector('.yt');
    expect(trackId).toBeInTheDocument();
  });
  it('should display spotify button', () => {
    const trackId = document.querySelector('.spotify');
    expect(trackId).toBeInTheDocument();
  });
  it('should display discogs button', () => {
    const trackId = screen.getByAltText('Search on Discogs');
    expect(trackId).toBeInTheDocument();
  });
  test('should render links container to match previous snapshot', () => {
    const linkboxSnap = render(<ResponseBox
      animation={false}
      stringifiedSongInfo={JSON.stringify(clintEastwoodSongInfo)}
    ></ResponseBox>);
    expect(linkboxSnap).toMatchSnapshot();
  });
});

describe('<ResponseItem />', () => {
  test('should render responseItem to match previous snapshot', () => {
    const tree = render(<ResponseItem item="trackId" attribute="Woods" />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Identify button', () => {
  beforeEach(() => {
    global.chrome = chrome;
    render(
      <Popup />,
    );
  });
  it('should display identify button', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});