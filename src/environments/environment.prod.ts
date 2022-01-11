export const environment = {
  production: true,
  basePath : 'http://ec2-54-237-43-104.compute-1.amazonaws.com:8080/',
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
    saveAssingment : 'assignments'
  },
  registration : {
    register : 'register',
    complete : 'register/complete'
  }

};
