import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Injectable({
    providedIn: 'root'
  })
  export class SharedService {

    private dataSource = new BehaviorSubject([]);
    countries = this.dataSource.asObservable();

    private dsSkillTests = new BehaviorSubject([]);
    skillTests = this.dsSkillTests.asObservable();

    setCounties(data : any){
        this.dataSource.next(data);
    }

    setSkillTests(data: any) {
       this.dsSkillTests.next(data);
    }

  }