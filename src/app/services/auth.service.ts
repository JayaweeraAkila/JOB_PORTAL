import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpService) { }

  doLogin(username : string, password: string) {
    return this.http.makeGet(environment.urls.authentication + '?username=' + username + '&password=' + password)
    .pipe(map((data:HttpResponse<any>) => {
      this.updateToken(data.body.token);
      return data.body;

   }));
  }
  updateToken(token:string) {
    console.log(atob(token.split('.')[1]));
    localStorage.setItem('token', token);
  }

  hasToken():boolean{
    return localStorage.getItem('token') ? true: false;
  }
  
}
