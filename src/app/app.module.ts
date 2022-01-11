import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { ViewCandidatesComponent } from './components/admin/view-candidates/view-candidates.component';
import { ViewCandidateProfileComponent } from './components/admin/view-candidate-profile/view-candidate-profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { TextSearchFilter } from './pips/text-search.pipe';
import { TextSearchFilterMultiple } from './pips/text-search-multiple.pipe';
import { ViewCandidatesPendingComponent } from './components/admin/view-candidates-pending/view-candidates-pending.component';
import { NgxPrintModule } from 'ngx-print';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddNewApplicantComponent } from './components/admin/add-new-applicant/add-new-applicant.component';
import { ToastrModule } from 'ngx-toastr';
import { CandidateCvComponent } from './components/admin/candidate-cv/candidate-cv.component';
import { CandiateFilterPopupComponent } from './popups/candiate-filter-popup/candiate-filter-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpErrorInterceptor } from './intercepters/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    ViewCandidatesComponent,
    ViewCandidateProfileComponent,
    AdminDashboardComponent,
    TextSearchFilter,
    TextSearchFilterMultiple,
    ViewCandidatesPendingComponent,
    AddNewApplicantComponent,
    CandidateCvComponent,
    CandiateFilterPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDialogModule,
    NgxPrintModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ToastrModule.forRoot() 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}