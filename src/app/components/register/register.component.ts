import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Applicant } from 'src/app/models/applicant.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  fgRegister: FormGroup;
  error: string;
  message: string;
  isLoading: boolean;

  constructor(
    private formBuilder : FormBuilder,
    private applicantService: ApplicantService,
    private translate:TranslateService) { }

  ngOnInit(): void {

    this.fgRegister = this.formBuilder.group(
      {
        fcEmail: ['',[Validators.required,Validators.email]],
        fcFristName: ['',Validators.required],
        fcPassword1: ['',Validators.required],
        fcPassword2: ['',Validators.required],
        
      }
    );
  }


  registerApplicant(){
    this.error = null;
    this.message = null;
    if(this.fgRegister.valid){
      this.isLoading = true;

      if (this.fgRegister.controls['fcPassword1'].value != this.fgRegister.controls['fcPassword2'].value) {
        this.error = 'Passwords are not matching';
        this.isLoading = false;
        return;
      }

      let applicant = new Applicant();
      applicant.email = this.fgRegister.controls['fcEmail'].value
      applicant.fullNameEN = this.fgRegister.controls['fcFristName'].value
      applicant.password = this.fgRegister.controls['fcPassword1'].value
      applicant.profileLanguage = this.translate.getDefaultLang();
       
      this.applicantService.registerApplicant(applicant).subscribe(res => {
        this.isLoading = false;
        this.message = this.translate.instant('register.msgSuccess');
        this.fgRegister.reset();
      },err=>{
        this.isLoading = false;
        this.error = err.error.message;
      });

    }else{
      this.error = 'Please fill the required fields.';
    }

  }



}
