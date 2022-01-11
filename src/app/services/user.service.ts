import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UserService {


    constructor(
        private http : HttpService
    ){}

    getAllModerators(){
        return this.http.makeApiGet(env.urls.moderators);
    }



}