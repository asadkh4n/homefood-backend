import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateofferComponent } from './components/createoffer/createoffer.component';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { OfferService } from './services/offer.service';

import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LandingpageComponent,
    FooterComponent,
    CreateofferComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule.forRoot(),
    HttpModule,
    routes,
    BrowserAnimationsModule,
    ToastModule.forRoot()
    
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    OfferService,
  ],
  bootstrap: [AppComponent],

  exports:[
    FileSelectDirective
  ]
})
export class AppModule { }
