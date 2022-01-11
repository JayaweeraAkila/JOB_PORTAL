import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateFilter } from './candidate.filter.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-candiate-filter-popup',
  templateUrl: './candiate-filter-popup.component.html',
  styleUrls: ['./candiate-filter-popup.component.scss']
})
export class CandiateFilterPopupComponent implements OnInit {
  countries: any;
  skillTests: any;

  constructor(
    public dialog: MatDialogRef<CandiateFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CandidateFilter,
    private shared : SharedService
  ) { }

  ngOnInit(): void {
    this.shared.countries.subscribe(data => this.countries = data);
    this.shared.skillTests.subscribe(data => this.skillTests = data);

  }
  
    onClickFilter(): void {
      console.log(this.data);
      this.dialog.close(this.data);
    }
  

}
