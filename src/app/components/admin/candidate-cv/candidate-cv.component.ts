import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/models/applicant.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-candidate-cv',
  templateUrl: './candidate-cv.component.html',
  styleUrls: ['./candidate-cv.component.scss']
})
export class CandidateCvComponent implements OnInit {

  isLoading: boolean = false;
  applicant: Applicant;
  today : any = null;
  profilePicture: string;


  constructor(
    private applicantService: ApplicantService,
    private activedRouter: ActivatedRoute,
    private translate : TranslateService
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.setToday();
  }
  setToday() {
    let date = new Date();
    this.today = {
      year : date.getFullYear(),
      month : (date.getMonth() + 1),
      day : date.getDate()
    }
  }

  getProfile(){
    this.isLoading = true;

    this.activedRouter.params.subscribe(parms => {
      this.applicantService.getProfile(parms['id'])
        .subscribe(result => {
          this.applicant = result.body;
          this.getProfilePic();
        },err =>{
          console.log(err);
        }, complete =>{
          this.isLoading = false;
        });
    });

  }

  getFormattedBirthday(){
    let bday = new Date(this.applicant.dob);
    let currDate = new Date();
    let age = currDate.valueOf() - bday.valueOf();    

    return bday.getFullYear() + ' ' + this.translate.instant('cv.year')   + ' ' + 
      (bday.getMonth() + 1 )  + ' ' + this.translate.instant('cv.month')   + ' ' + 
      bday.getDate()  + ' ' + this.translate.instant('cv.day') + 
      this.translate.instant('cv.age1')  +  Math.floor(age / 31536000000)  + this.translate.instant('cv.age2');
    
  }

  getFormattedDate(inDate){
    if(!inDate){
      return this.translate.instant('cv.present');
    }
    let bday = new Date(inDate); 
    return bday.getFullYear() + ' ' + this.translate.instant('cv.year')   + ' ' +
      (bday.getMonth() + 1 )  + ' ' + this.translate.instant('cv.ewmonth') 
    
  }

  


  getFormatedContact(){
    let phone = this.applicant.contactNo.split("-");
    if(phone.length == 2){
      let part2 = phone[1];
      if(part2.length > 7){
         return phone[0] + ' (' + part2.substring(0, (part2.length - 7)) + ') '+ part2.substring((part2.length - 7), part2.length - 3) + ' ' + part2.substring((part2.length - 3))
      }
    }
    return phone;
  }

  getProfilePic(){
    this.profilePicture = "assets/img/blankprofile.png";
    //return;
    this.profilePicture = "assets/img/loader-bar.svg";
    this.applicantService.getProfilePic(this.applicant.id)
      .subscribe(result => {
        this.profilePicture = result.body.data;
      },err =>{
        this.profilePicture = "assets/img/blankprofile.jpg";
      });
  }

}
