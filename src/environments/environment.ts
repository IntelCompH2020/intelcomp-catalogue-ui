// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  beta: false,
  MATOMO_URL: 'https://analytics.openaire.eu/',
  MATOMO_SITE: -1,
  FAQ_ENDPOINT: 'https://dl105.madgik.di.uoa.gr/faq/api',
  API_ENDPOINT: '/catalogue',
  STATS_ENDPOINT: 'https://providers.eosc-portal.eu/stats-api/',
  API_TOKEN_ENDPOINT: '',
  projectName: 'OpenAIRE Catalogue',
  projectMail: 'example@oac.eu',
  serviceORresource: 'Resource',
  hasUserConsent: true,
  showHelpContent: false,
  privacyPolicyURL: '',
  marketplaceBaseURL: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
