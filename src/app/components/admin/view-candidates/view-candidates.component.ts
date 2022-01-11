import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { Applicant } from 'src/app/models/applicant.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CandiateFilterPopupComponent } from 'src/app/popups/candiate-filter-popup/candiate-filter-popup.component';
import { CandidateFilter } from 'src/app/popups/candiate-filter-popup/candidate.filter.model';
import { UtilService } from 'src/app/services/util.service';
import { SharedService } from 'src/app/services/shared.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit {

  isLoading = false;
  applicants: Applicant[] = [];
  searchText: any;
  filterCritaria: CandidateFilter = new CandidateFilter();
  isLoadingSkills: boolean = false;
  isLoadingContries: boolean = false;
  originalApplicants: Applicant[] = [];

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private dialog: MatDialog,
    private utilService: UtilService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.isLoadingContries = true;
    this.isLoadingSkills = true;
    this.utilService.getAllCountries()
      .subscribe(arg => {
        this.isLoadingContries = false;
        this.shared.setCounties(arg.body);
      });

    this.applicantService.getSkillTests()
      .subscribe(arg => {
        this.isLoadingSkills = false;
        this.shared.setSkillTests(arg.body);
      });


    this.getAllRegistedApplicants();

  }

  getAllRegistedApplicants() {
    this.isLoading = true;
    this.applicantService.getAllRegisteredApplicants()
      .subscribe(restult => {
        this.isLoading = false;
        this.applicants = restult.body;
        this.originalApplicants = this.applicants;
      }, err => {
        this.isLoading = false;
        console.log(err);
      });
  }

  gotoApplicnat(id: string) {
    this.router.navigate(['admin-panel/profile/' + id + '/view']);
  }

  onClickOpenfilterCandidatesDialog() {
    if (this.filterCritaria) {
      this.filterCritaria = new CandidateFilter();
    }



    const filterDilog = this.dialog.open(CandiateFilterPopupComponent, {
      width: '40%',
      data: {
        currCountry: this.filterCritaria?.currCountry,
        skillsPassed: this.filterCritaria?.skillsPassed,
        nationality: this.filterCritaria?.nationality,
        japanese: this.filterCritaria?.japanese,
      },
    });

    filterDilog.afterClosed().subscribe(result => {
      this.filterCandidates(result);
    })

  }

  resetFilter() {
    this.applicants = this.originalApplicants;
  }


  filterCandidates(result: any) {
    this.filterCritaria = result;

    if (this.filterCritaria.skillsPassed) {

      this.applicants =[];
      this.originalApplicants.forEach(candidate => {
        candidate.skills.passedSkillTest.filter(test => {
          if (test.id == this.filterCritaria.skillsPassed.id) {
            this.applicants.push(candidate);
          }
        });
      });
    }

    if (this.filterCritaria.currCountry) {
      this.applicants = this.applicants.filter(candidate => candidate.currCountry == this.filterCritaria.currCountry.name);
    }

    if (this.filterCritaria.nationality) {
      this.applicants = this.applicants.filter(candidate => candidate.nationality == this.filterCritaria.currCountry.name);
    }

    if (this.filterCritaria.japanese) {
      this.applicants = this.applicants.filter(candidate => candidate.skills.japanese == this.filterCritaria.japanese);
    }

    

  }

}
