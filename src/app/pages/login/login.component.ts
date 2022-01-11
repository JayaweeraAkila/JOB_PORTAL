import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute) { }

  hasError:boolean = false;
  errorText:string = "Error";  

  isLoading= false;
  redirectTo = null;
  loginForm:FormGroup;

  fcUsername = new FormControl();
  fcPassword = new FormControl();

  ngOnInit(): void {

    this.loginForm = new FormGroup(
      {
        fcUsername : this.fcUsername,
        fcPassword : this.fcPassword
      }
    );
  }



  tryLogin(){
    this.hasError= false;
    this.isLoading = true;

    this.authService.doLogin(this.fcUsername.value, this.fcPassword.value)
    .subscribe( (data) => { 
      this.isLoading = false;
 
      if(this.redirectTo){
        this.router.navigate([this.redirectTo]);
      }else{
        this.router.navigate(['/admin-panel']);
      }
      
    }, err => {
      this.isLoading = false;
      let e : HttpErrorResponse = err; 
      this.hasError= true;
      this.errorText=e.error.message;
    });
  }
}
