// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/',
  URL_RH: 'http://localhost:8000/api/rh/v1/',
  URL_CONFIG: 'http://localhost:8000/api/config/v1/',
  URL_COMMER: 'http://localhost:8000/api/commercial/',
  URL_PRODUC: 'http://localhost:8000/api/production/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
