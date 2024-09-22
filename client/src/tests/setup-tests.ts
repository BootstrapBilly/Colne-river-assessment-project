// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

import { setupServer } from 'msw/node';

export const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
