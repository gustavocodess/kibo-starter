/** @type {import('next').NextConfig} */
const { withHydrationOverlay } = require('@builder.io/react-hydration-overlay/next')

const { i18n } = require('./next-i18next.config')
const LOCATION_COOKIE = 'kibo_purchase_location'
const DEFAULT_WISHLIST_NAME = 'default-wishlist'

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: true,
    emotion: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  i18n,
  images: {
    domains: [
      'd1slj7rdbjyb5l.cloudfront.net',
      'cdn-tp1.mozu.com',
      'cdn-tp2.mozu.com',
      'cdn-tp3.mozu.com',
      'cdn-tp4.mozu.com',
      'cdn-sb.mozu.com',
      'encrypted-tbn0.gstatic.com',
      'images.ctfassets.net',
      'cdn.builder.io',
    ],
  },
  publicRuntimeConfig: {
    colorAttributeFQN: 'Tenant~Color',
    sizeAttributeFQN: 'Tenant~Size',
    paymentTypes: [
      {
        id: 'CreditCard',
        name: 'Credit / Debit Card',
      },
    ],
    countries: ['US', 'AT', 'DE', 'NL'],
    debounceTimeout: '1000',
    productListing: {
      sortOptions: [
        { value: 'Best Match', id: '' },
        { value: 'Price: Low to High', id: 'price asc' },
        { value: 'Price: High to Low', id: 'price desc' },
        { value: 'Latest', id: 'createDate desc' },
        { value: 'Oldest', id: 'createDate asc' },
      ],
      pageSize: 16,
    },
    orderHistory: {
      startIndex: 0,
      pageSize: 20,
    },
    ratingAttrFQN: `tenant~rating`,
    userCookieKey: process.env.KIBO_USER_COOKIE_KEY || 'kibo_at',
    maxCookieAge: 5 * 24 * 60 * 60 * 1000, //5 days
    fulfillmentOptions: [
      {
        value: 'DirectShip',
        code: 'DS',
        name: 'Direct Ship',
        label: 'Ship to Home',
        details: 'Available to Ship',
        unavailableDetails: 'Unavailable to Ship',
        isRequired: false,
        shortName: 'Ship',
      },
      {
        value: 'InStorePickup',
        code: 'SP',
        name: 'In Store Pickup',
        label: 'Pickup in Store',
        details: 'Available at',
        unavailableDetails: 'Unavailable at',
        isRequired: false,
        shortName: 'Pickup',
      },
    ],
    storeLocator: {
      defaultRange: '160934',
    },
    storeLocationCookie: LOCATION_COOKIE,
    defaultWishlistName: DEFAULT_WISHLIST_NAME,
    pciHost: process.env.KIBO_PCI_HOST,
    apiHost: process.env.KIBO_API_HOST,
    isMultiShipEnabled: false,
    shipOptions: [
      {
        value: 'ShipToHome',
        code: 'STH',
        name: 'Ship to Home',
        label: 'Ship to Home',
        shortName: 'SingleShip',
      },
      {
        value: 'ShipToMultiAddress',
        code: 'STMA',
        name: 'Ship to more than one address',
        label: 'Ship to more than one address',
        shortName: 'MultiShip',
      },
    ],
    isSubscriptionEnabled: true,
    builderIO: {
      apiKey: process.env.BUILDER_IO_API_KEY,
    },
  },
  serverRuntimeConfig: {
    revalidate: process.env.GLOBAL_PAGE_REVALIDATE || 30,
    pageSize: 1000,
    cacheKey: 'categoryTree',
    cacheTimeOut: 10000,
    isMultiShipEnabled: false,
  },
  staticPageGenerationTimeout: 1000,
}

module.exports = withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: 'main',
})(nextConfig)
