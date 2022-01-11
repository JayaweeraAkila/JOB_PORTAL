// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  basePath : 'http://localhost:8080/',
  apiPath : 'api/v1/',
  urls : {
    allCountries : 'utils/countries' ,
    special_skills : "utils/special-skill-tests",
    update_registration: 'candidate/registered/',
    update_applicant : 'candidate/update',
    applicants_completed : 'candidate/completed',
    applicants_incompleted : 'candidate/incompleted',
    profile : 'candidate',
    authentication : 'authentication',
    moderators : 'user/moderators',
    assingments : 'assignments/candidate/',
    saveAssingment : 'assignments',
    profilePicture : "utils/profile-picture/candidate/"
  },
  registration : {
    register : 'register',
    complete : 'register/complete',
    uploadProfilePic : 'register/{id}/picture'
  }
};

/*basePath : 'http://jobs.yoyointernational.jp/api/v1/',
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
