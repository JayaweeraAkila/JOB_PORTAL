import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from "src/environments/environment";
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getAuthToken(): string {
    let token = localStorage.getItem("token");
    return token ? token : "";
  }

  makePost(url: string, body: any): any {
    let headers: HttpHeaders = new HttpHeaders({ "authorization": this.getAuthToken() });
    return this.http.post<any>(env.basePath + url, body, { headers, observe: 'response' });
  }

  makeGet(url: string): any {
    let headers: HttpHeaders = new HttpHeaders({ "authorization": this.getAuthToken() });
    return this.http.get<any>(env.basePath + url, { headers, observe: 'response' });
  }

  makeApiPost(url: string, body: any) {
    return this.makePost(env.apiPath + url, body);
  }
  makeApiGet(url: string): any {
    return this.makeGet(env.apiPath + url)
  }

  makeApiPatch(url: string, body: any) {
    let headers: HttpHeaders = new HttpHeaders({ "authorization": this.getAuthToken() });
    return this.http.patch<any>(env.basePath + env.apiPath + url, body, { headers, observe: 'response' });
  }

  makeFileUpload(path: string, form: FormData) {
    return this.http.post<any>(env.basePath + path , form, {
      reportProgress: true,
      responseType: 'json'
    });
  }
  

}
