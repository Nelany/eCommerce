import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,

  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import {
  VITE_PROJECT_KEY,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} from '../utils/constants';
import { store } from '../store/store';
import { decryptUser } from '../utils/crypto';

const tokenCache: TokenCache = {
  get() {
    return JSON.parse(localStorage.getItem('tokenInfo') || 'null');
  },
  set(cache) {
    localStorage.setItem('tokenInfo', JSON.stringify(cache));
  },
};

const anonymousOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: VITE_PROJECT_KEY,
  credentials: {
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
  },
  tokenCache,
  scopes: [`manage_project:${VITE_PROJECT_KEY}`],
  fetch,
};

const passwordOptions: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: VITE_PROJECT_KEY,
  credentials: {
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
    user: {
      username: '',
      password: '',
    },
  },
  tokenCache,
  scopes: [`manage_project:${VITE_PROJECT_KEY}`],
  fetch,
};

export const removePreviousToken = () => localStorage.removeItem('tokenInfo');

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

const anonymousClient = new ClientBuilder()
  .withProjectKey(VITE_PROJECT_KEY)
  .withAnonymousSessionFlow(anonymousOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const userClient = new ClientBuilder()
  .withProjectKey(VITE_PROJECT_KEY)
  .withPasswordFlow(passwordOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const setUser = () => {
  passwordOptions.credentials.user = decryptUser(
    localStorage.getItem('userSecret') || 'null'
  ) || { username: '', password: '' };
};

export const getApiRoot = () => {
  const userId = store.getState().user.value;
  if (userId && !passwordOptions.credentials.user.username) {
    setUser();
  }
  const builder = userId
    ? createApiBuilderFromCtpClient(userClient)
    : createApiBuilderFromCtpClient(anonymousClient);
  return builder.withProjectKey({
    projectKey: VITE_PROJECT_KEY,
  });
};
