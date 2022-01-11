import { Component, OnInit } from '@angular/core';
import languages  from "../../../data/languages.json";
@Component({
  selector: 'app-add-new-applicant',
  templateUrl: './add-new-applicant.component.html',
  styleUrls: ['./add-new-applicant.component.scss']
})
export class AddNewApplicantComponent implements OnInit {

  constructor() { }
  langList:any[] = languages;
  profileLanguage:any;

  ngOnInit(): void {
    this.profileLanguage = languages[0];
  }

}
