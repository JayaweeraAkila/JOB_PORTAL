import { Component, OnInit } from '@angular/core';
import { ApplicantService } from 'src/app/services/applicant.service';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/app/models/applicant.model';
import { AssignmentService } from 'src/app/services/assignment.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Assignment } from 'src/app/models/assignment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-candidate-profile',
  templateUrl: './view-candidate-profile.component.html',
  styleUrls: ['./view-candidate-profile.component.scss']
})
export class ViewCandidateProfileComponent implements OnInit {

  isLoading = false;
  applicant: Applicant;
  users: User[] = [];
  assignment: Assignment;
  assignee: any;
  assignmentStatus: any;

  constructor(
    private applicantService: ApplicantService,
    private activedRouter: ActivatedRoute,
    private assignmentService : AssignmentService,
    private userService: UserService,
    private toast : ToastrService
  ) { }

  ngOnInit(): void {

    this.getProfile();

    this.userService.getAllModerators()
      .subscribe(response => this.users = response.body);
    
    

  }


  getProfile(){
    this.isLoading = true;

    this.activedRouter.params.subscribe(parms => {
      this.applicantService.getProfile(parms['id'])
        .subscribe(result => {
          this.applicant = result.body;
        },err =>{
          console.log(err);
        }, complete =>{
          this.isLoading = false;
        });

        this.assignmentService.getAssignmentbyCandidate(parms['id'])
          .subscribe(response =>{
            this.setAssignmentDetails(response.body);
          } ,
             err => this.assignment = null);
        

    });

  }
  setAssignmentDetails(body: any) {
    this.assignment = body
    this.assignee = this.assignment.assignee.id;
    this.assignmentStatus = this.assignment.assignmentStatus;

  }

  print(){
    var printContent = document.getElementById('print-area');
    var WinPrint = window.open();
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.focus();
    WinPrint.print();
  }


  onClickChangeAssignment(){
    if(!this.assignee){
      this.toast.error('error', 'Please select an assignee');
      return;
    }
    if(!this.assignmentStatus){
      this.toast.error('error', 'Please select a Status');
      return;
    }

    if (!this.assignment){
      this.assignment = new Assignment();
    }

    this.assignment.assignee = this.users.filter(value => value['id'] == this.assignee)[0];
    this.assignment.assignmentStatus = this.assignmentStatus
    this.assignment.candidateId = this.applicant.id

    this.assignmentService.saveAssignment(this.assignment)
      .subscribe(arg => {
        this.toast.success('Success', "Assignment Saved");
      }, error =>{
        this.toast.error('Error', error.error.message);
      });
    

  }
}
