import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatesPendingComponent } from './view-candidates-pending.component';

describe('ViewCandidatesPendingComponent', () => {
  let component: ViewCandidatesPendingComponent;
  let fixture: ComponentFixture<ViewCandidatesPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCandidatesPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidatesPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
