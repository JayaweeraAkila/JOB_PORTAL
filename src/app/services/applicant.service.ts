import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Applicant } from '../models/applicant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  getProfilePic(id: string) {
    return this.httpService.makeGet(environment.urls.profilePicture + id)
  }
  uploadProfilePic(id: string, file: File) {
    let form:FormData = new FormData();
    form.append('file',file);
    return this.httpService.makePost(
      environment.registration.uploadProfilePic.replace("{id}",id), form);
  }
  addNewApplicant(applicant: Applicant) {
    return this.httpService.makeApiPost(environment.urls.profile, applicant);
  }
  getSkillTests() {
    return this.httpService.makeGet(environment.urls.special_skills);
  }

  constructor(private httpService : HttpService) { }

  registerApplicant(applicant : Applicant){
    return this.httpService.makePost(environment.registration.register, applicant);
  }

  getApplicantForRegister(id:string){
    return this.httpService.makeGet(environment.registration.register + "/" + id);
  }

  updateApplicant(applicant: Applicant) {
    return this.httpService.makePost(environment.registration.complete, applicant);
  }


  getAllRegisteredApplicants(){
    return this.httpService.makeApiGet(environment.urls.applicants_completed);

  }

  getPendingRegistions() {
    return this.httpService.makeApiGet(environment.urls.applicants_incompleted);
  }

  getProfile(id: string) {
    return this.httpService.makeApiGet(environment.urls.profile + "/" + id);
  }

}
