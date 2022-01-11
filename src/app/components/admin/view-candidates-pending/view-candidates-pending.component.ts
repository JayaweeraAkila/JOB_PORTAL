import { Component, OnInit } from '@angular/core';
import { Applicant } from 'src/app/models/applicant.model';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-candidates-pending',
  templateUrl: './view-candidates-pending.component.html',
  styleUrls: ['./view-candidates-pending.component.scss']
})
export class ViewCandidatesPendingComponent implements OnInit {

  isLoading = false;
  applicants: Applicant[] = [];
  searchText: any;

  constructor(private applicantService: ApplicantService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPendingRegistions();
  }

  getPendingRegistions(){
    this.isLoading = true;
    this.applicantService.getPendingRegistions()
    .subscribe(restult => {
      this.isLoading = false;
      this.applicants = restult.body;
    }, err=>{
      this.isLoading = false;
      console.log(err);
    });
  }

}
