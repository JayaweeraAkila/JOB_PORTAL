import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UtilService } from 'src/app/services/util.service';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, Education, Experience, SpecialSkills } from 'src/app/models/applicant.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() profileLanguage: any = null;
  @Input() profileId: string = null;
  @Input() profileState = "registered";

  countries: any[] = [];
  applicant: Applicant;
  selectedCountry: any;
  fgPersonalInfo: FormGroup;
  fgWorkAuthrizationInfo: FormGroup;
  fgEducation: FormGroup;
  fgEducationCourses: FormArray
  fgWork: FormGroup;
  faWorExperience: FormArray;
  fgOtherSkills: FormGroup;
  isCompleted = false;
  isCompletedNow = false;
  profilePicture: string = "assets/img/blankprofile.png";

  yearList: string[] = [];
  monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  skillTests = [];
  otherSkills: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  error: any;
  isNew: boolean = false;
  profilePicUploadprogress: number;
  profilePictureFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private applicantService: ApplicantService,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toast: ToastrService) { }

  ngOnInit(): void {

    console.log(this.profileId);
    console.log(this.profileLanguage);
    this.constructForms();

    this.initData();

  }
  constructForms() {
    for (let year = (new Date()).getFullYear() + 5; year >= 1970; year--) {
      this.yearList.push("" + year);
    }

    this.fgPersonalInfo = this.formBuilder.group(
      {
        fcFristName: ['', Validators.required],
        fcJpFristName: [''],
        fcEmail: ['', [Validators.required, Validators.email]],
        fcAddressEN: ['', Validators.required],
        fcAddressJP: ['', Validators.required],
        fcCountry: ['', Validators.required],
        fcContact: ['', [Validators.required, Validators.pattern('^[0-9]([0-9]+)?$')]],
        fcCountryCode: ['', Validators.required],
        fcDob: ['', Validators.required],
        fcGender: ['', Validators.required],
        fcNationality: ['', Validators.required],
        
        fcBloodGroup: [''],

      }
    );

    this.fgWorkAuthrizationInfo = this.formBuilder.group(
      {
        fcPassportNo: [''],
        fcAlienNo: [''],
        fcWorkAuthorization: [''],
        fcVisaEndDate: ['']
      }
    );

    this.fgEducation = this.formBuilder.group(
      {
        fgEducationCourses: this.formBuilder.array([this.addEducationForm()])
      }

    );

    let newWorkForm = this.addWorkExperienceForm();

    if (this.faWorExperience == undefined) {
      newWorkForm['controls'].fcIsCurrent.setValue(true);
    }

    this.fgWork = this.formBuilder.group(
      {
        faWorExperience: this.formBuilder.array([newWorkForm])
      }
    );

    this.fgOtherSkills = this.formBuilder.group(
      {
        fcJlptLevel: ['', Validators.required],
        fcSkillTests: [''],
        fcOtherSkills: [''],
      }
    );
  }

  initData() {
    this.utilService.getAllCountries()
      .subscribe(arg => {
        this.countries = arg.body;
      });

    this.applicantService.getSkillTests()
      .subscribe(arg => {
        this.skillTests = arg.body;
      });

    this.activedRouter.params.subscribe(parms => {
      if (!parms['id']) {
        this.isNew = true;
        this.applicant = new Applicant();
        return;
      }
      this.applicantService.getApplicantForRegister(parms['id'])
        .subscribe(res => {
          this.applicant = res.body;
          this.translate.setDefaultLang(this.applicant.profileLanguage);
          this.setFormData();
          this.getProfilePic();
        }, error => {
          if (error.error.status === 409) {
            this.isCompleted = true;
          } else {
            this.error = error.error.message
          }

        })
    })

  }
  setFormData() {
    this.fgPersonalInfo.controls['fcFristName'].setValue(this.applicant.fullNameEN);
    this.fgPersonalInfo.controls['fcEmail'].setValue(this.applicant.email);
    this.fgPersonalInfo.controls['fcFristName'].disable();
    this.fgPersonalInfo.controls['fcEmail'].disable();
  }


  addEducationForm() {

    return this.formBuilder.group(
      {
        fcInstitute: ['', Validators.required],
        fcCourseName: ['', Validators.required],
        fcAreaOfStudy: ['', Validators.required],
        fcStartDate: ['', Validators.required],
        fcGraduationDate: ['', Validators.required],
        fcGrade: ['', Validators.required],
      }
    );

  }

  addWorkExperienceForm() {
    return this.formBuilder.group(
      {
        fcCompany: ['', Validators.required],
        fcDesignation: ['', Validators.required],
        fcStartDate: ['', Validators.required],
        fcEndDate: ['', Validators.required],
        fcIsCurrent: ['', Validators.required],
        fcDescription: ['', Validators.required],
        fcNoticePeriod: ['', Validators.required],
      }
    );
  }



  addNewEducation() {
    this.fgEducationCourses = this.fgEducation.get('fgEducationCourses') as FormArray
    this.fgEducationCourses.push(this.addEducationForm());
    console.log(this.fgEducation);
  }
  removeEducation(i: any) {
    this.fgEducationCourses = this.fgEducation.get('fgEducationCourses') as FormArray
    this.fgEducationCourses.removeAt(i);
  }
  addNewWorkExperience() {
    this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
    this.faWorExperience.push(this.addWorkExperienceForm());

  }
  removeWorkExperience(i: any) {
    this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
    this.faWorExperience.removeAt(i);
  }
  removeAllWorkExperience() {
    this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
    let length = this.faWorExperience.length;
    for (let index = 0; index < length; index++) {
      this.faWorExperience.removeAt(0);
    }
  }

  addOtherSkill(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.otherSkills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeOtherSkill(skill: string): void {
    const index = this.otherSkills.indexOf(skill);

    if (index >= 0) {
      this.otherSkills.splice(index, 1);
    }
  }

  saveProfile() {

    if (this.fgOtherSkills.valid) {

      if (this.profileState == "new") {
        this.applicant.fullNameEN = this.fgPersonalInfo.controls['fcFristName'].value;
        this.applicant.email = this.fgPersonalInfo.controls['fcEmail'].value;
      }


      this.applicant.addressEN = this.fgPersonalInfo.controls['fcAddressEN'].value;
      this.applicant.addressJP = this.fgPersonalInfo.controls['fcAddressJP'].value;
      this.applicant.contactNo = this.fgPersonalInfo.controls['fcCountryCode'].value.callingCodes[0] + "-"
        + this.fgPersonalInfo.controls['fcContact'].value;
      this.applicant.currCountry = this.fgPersonalInfo.controls['fcCountry'].value.name;
      this.applicant.nationality = this.fgPersonalInfo.controls['fcNationality'].value.demonym;
      this.applicant.bloodGroup = this.fgPersonalInfo.controls['fcBloodGroup'].value;
      this.applicant.passportNo = this.fgWorkAuthrizationInfo.controls['fcPassportNo'].value;
      this.applicant.alienNo = this.fgWorkAuthrizationInfo.controls['fcAlienNo'].value;
      this.applicant.fullNameJP = this.fgPersonalInfo.controls['fcJpFristName'].value;
      this.applicant.dob = this.utilService.formatDate(this.fgPersonalInfo.controls['fcDob'].value);
      this.applicant.gender = this.fgPersonalInfo.controls['fcGender'].value;
      this.applicant.referanceId = this.profileId;
      this.applicant.profileLanguage = (this.profileLanguage) ? this.profileLanguage : this.translate.currentLang;
      this.applicant.visaExpiringDate = this.utilService.formatDate(this.fgWorkAuthrizationInfo.controls['fcVisaEndDate'].value)


      let courses: Education[] = [];
      this.fgEducationCourses = this.fgEducation.get('fgEducationCourses') as FormArray
      for (let index = 0; index < this.fgEducationCourses.length; index++) {
        let formGroup: FormGroup = this.fgEducationCourses.controls[index] as FormGroup;
        let edu = new Education();
        edu.institute = formGroup.controls['fcInstitute'].value;
        edu.course = formGroup.controls['fcCourseName'].value;
        edu.areaOfStudy = formGroup.controls['fcAreaOfStudy'].value;
        edu.grade = formGroup.controls['fcGrade'].value;
        edu.startDate = this.utilService.formatDate(formGroup.controls['fcStartDate'].value);
        edu.graduationDate = this.utilService.formatDate(formGroup.controls['fcGraduationDate'].value);
        edu.language = (this.profileLanguage) ? this.profileLanguage : this.applicant.profileLanguage;
        courses.push(edu);
      }
      this.applicant.educations = courses;

      let works: Experience[] = [];
      this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
      for (let index = 0; index < this.faWorExperience.length; index++) {
        const form = this.faWorExperience.controls[index] as FormGroup;
        let exp = new Experience();
        exp.companyName = form.controls['fcCompany'].value;
        exp.designation = form.controls['fcDesignation'].value;
        exp.startDate = this.utilService.formatDate(form.controls['fcStartDate'].value);
        exp.endDate = this.utilService.formatDate(form.controls['fcEndDate'].value);
        exp.isCurrent = form.controls['fcIsCurrent'].value || false;
        exp.description = form.controls['fcDescription'].value;
        exp.language = (this.profileLanguage) ? this.profileLanguage : this.applicant.profileLanguage;
        works.push(exp);
      }
      this.applicant.experiences = works;
      this.applicant.skills = new SpecialSkills();
      this.applicant.skills.japanese = this.fgOtherSkills.controls['fcJlptLevel'].value;
      this.applicant.skills.hasWorkAuthorization = this.fgWorkAuthrizationInfo.controls['fcWorkAuthorization'].value || false;
      this.applicant.skills.passedSkillTest = this.fgOtherSkills.controls['fcSkillTests'].value || [];
      this.applicant.skills.otherSkills = this.otherSkills.join(",");


      if (this.isNew) {
        this.applicantService.addNewApplicant(this.applicant)
          .subscribe(res => {
            this.fgPersonalInfo.reset();
            this.fgOtherSkills.reset();
            this.fgWork.reset();
            this.fgEducation.reset();
            this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
            for (let index = 1; index < this.faWorExperience.length; index++) {
              this.removeEducation(index);
            }
            this.faWorExperience = this.fgWork.get('faWorExperience') as FormArray
            for (let index = 1; index < this.faWorExperience.length; index++) {
              this.removeWorkExperience(index);
            }
            this.otherSkills = [];
            this.toast.success('Success', 'Applicant Saved Successfully');

            if (this.profilePictureFile) {
              this.applicantService.uploadProfilePic(this.applicant.id, this.profilePictureFile)
              .subscribe(arg => {
                this.toast.success('Success', 'Successfully uploaded profile picture');
              },err => {
                this.toast.error('Error', 'Unable to upload profile picture');
              });
            }

          }, err => {
            this.toast.error('Error', err.error.message);
          });

      } else {
        this.applicantService.updateApplicant(this.applicant).subscribe(res => {
          this.isCompleted = true;
          this.isCompletedNow = true;
        }, error => {
          console.log(error.error);
        })
      }


    }
  }

  gotoRegister() {
    this.router.navigate(["/register"]);
  }


  uploadProfilePic(files: FileList){

    if(!files || files.length == 0){
      return;
    }


    let file : File = files[0];

    if(this.isNew){
      this.profilePictureFile = file;
      return;
    }


    this.profilePicture = "assets/img/loader-bar.svg";
    this.applicantService.uploadProfilePic(this.applicant.id, file).subscribe(event => {
      this.profilePicUploadprogress = event.body.message;
      this.profilePicture = event.body.message;
    },err => {
      this.profilePicUploadprogress = err.error.message;
      this.profilePicture = "assets/img/blankprofile.png";
    })

    console.log(file);

  }


  getProfilePic(){
    this.profilePicture = "assets/img/loader-bar.svg";
    this.applicantService.getProfilePic(this.applicant.id)
      .subscribe(result => {
        this.profilePicture = result.body.data;
      },err =>{
        this.profilePicture = "assets/img/blankprofile.png";
      });
  }

}
