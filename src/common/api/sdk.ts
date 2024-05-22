import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  TokenCache,

  // Import middlewares
  // type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { UserData } from '../types';
import {
  VITE_PROJECT_KEY,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
} from '../utils/constants';
import { store } from '../store/store';
// const projectKey = 'cool-coders';
// const scopes = [
//   'manage_customers:cool-coders manage_audit_log:cool-coders manage_payments:cool-coders manage_product_selections:cool-coders manage_order_edits:cool-coders manage_connectors:cool-coders manage_cart_discounts:cool-coders manage_categories:cool-coders manage_connectors_deployments:cool-coders manage_checkout_payment_intents:cool-coders manage_discount_codes:cool-coders manage_associate_roles:cool-coders manage_project:cool-coders manage_business_units:cool-coders manage_orders:cool-coders manage_products:cool-coders manage_sessions:cool-coders manage_customer_groups:cool-coders manage_import_containers:cool-coders manage_attribute_groups:cool-coders manage_extensions:cool-coders',
// ];

// Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: 'https://auth.us-central1.gcp.commercetools.com',
//   projectKey: VITE_PROJECT_KEY,
//   credentials: {
//     clientId: VITE_CLIENT_ID,
//     clientSecret: VITE_CLIENT_SECRET,
//   },
//   scopes: VITE_SCOPES.split(' '),
//   fetch,
// };
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

export const buildPasswordOptions = (user: UserData) => {
  passwordOptions.credentials.user = user;
};
const removePreviousToken = () => localStorage.removeItem('tokenInfo');

export const setNewUser = (user: UserData) => {
  removePreviousToken();
  buildPasswordOptions(user);
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// ClientBuilder
// const adminClient = new ClientBuilder()
//   .withProjectKey(VITE_PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();

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
// Create apiRoot from the imported ClientBuilder and include your Project key

export const getApiRoot = () => {
  const userId = store.getState().user.value;
  const builder = userId
    ? createApiBuilderFromCtpClient(userClient)
    : createApiBuilderFromCtpClient(anonymousClient);
  return builder.withProjectKey({
    projectKey: VITE_PROJECT_KEY,
  });
};
