import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment.model';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    

    constructor(
        private http : HttpService
    ){}

    getAssignmentbyCandidate(id: string){
        return this.http.makeApiGet(environment.urls.assingments + id);
    }

    saveAssignment(assignment: Assignment) {
        
        if (assignment.id) {
            return this.http.makeApiPatch(environment.urls.saveAssingment, assignment);
        }else{
            return this.http.makeApiPost(environment.urls.saveAssingment, assignment);
        }    
    }

}