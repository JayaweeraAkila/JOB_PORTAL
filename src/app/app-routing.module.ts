import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ViewCandidatesComponent } from './components/admin/view-candidates/view-candidates.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ViewCandidatesPendingComponent } from './components/admin/view-candidates-pending/view-candidates-pending.component';
import { ViewCandidateProfileComponent } from './components/admin/view-candidate-profile/view-candidate-profile.component';
import { AddNewApplicantComponent } from './components/admin/add-new-applicant/add-new-applicant.component';
import { CandidateCvComponent } from './components/admin/candidate-cv/candidate-cv.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path : 'admin-panel', component: AdminHomeComponent, children: [
      {path:'', component: AdminDashboardComponent},
      {path:'view-candidates', component: ViewCandidatesComponent},
      {path:'candidates/pending-registratoin', component: ViewCandidatesPendingComponent},
      {path:'candidates/new', component: AddNewApplicantComponent},
      { path: 'profile/:id/view', component: ViewCandidateProfileComponent },
      { path: 'profile/:id/cv', component: CandidateCvComponent },
    ]
  },
  {
    path: '', component: HomeComponent, children: [
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'register'}
    ]
  },
  { path: '**' , redirectTo: 'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
