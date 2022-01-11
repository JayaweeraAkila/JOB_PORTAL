import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpService : HttpService) { }


  getAllCountries(){
      return this.httpService.makeGet(env.urls.allCountries);
  }

  formatDate(dateValue: any) {
    if(!dateValue){
      return null;
    }
    let date = new Date(dateValue);
    let month = (date.getMonth()) < 9 ? '0' + (date.getMonth() + 1)  : (date.getMonth() + 1);
    let dayOfMonth = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}-${month}-${dayOfMonth}`;
  }

}
