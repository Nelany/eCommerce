import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// const projectKey = 'cool-coders';
// const scopes = [
//   'manage_customers:cool-coders manage_audit_log:cool-coders manage_payments:cool-coders manage_product_selections:cool-coders manage_order_edits:cool-coders manage_connectors:cool-coders manage_cart_discounts:cool-coders manage_categories:cool-coders manage_connectors_deployments:cool-coders manage_checkout_payment_intents:cool-coders manage_discount_codes:cool-coders manage_associate_roles:cool-coders manage_project:cool-coders manage_business_units:cool-coders manage_orders:cool-coders manage_products:cool-coders manage_sessions:cool-coders manage_customer_groups:cool-coders manage_import_containers:cool-coders manage_attribute_groups:cool-coders manage_extensions:cool-coders',
// ];

const {
  VITE_PROJECT_KEY,
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_SCOPES
} = import.meta.env;

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey: VITE_PROJECT_KEY,
  credentials: {
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
  },
  scopes: VITE_SCOPES.split(' '),
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(VITE_PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: VITE_PROJECT_KEY,
});
