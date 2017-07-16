import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { DatePipe } from '@angular/common';

import { routes } from './app.router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateofferComponent } from './components/createoffer/createoffer.component';
import { MyoffersComponent } from './components/myoffers/myoffers.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { TransactionConfirmationComponent } from './components/transactionconfirmation/transactionconfirmation.component';
import { MySearchComponent } from './components/search/search.component';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { OfferService } from './services/offer.service';
import { FeedbackService } from './services/feedback.service';
import { OrderService } from './services/order.service';

import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { OfferdetailsComponent } from './components/offerdetails/offerdetails.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GivefeedbackComponent } from './components/givefeedback/givefeedback.component';
import { ConfirmOfferComponent } from './components/confirm-offer/confirm-offer.component';

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
    FileSelectDirective,
    MyoffersComponent,
    MyordersComponent,
    OfferdetailsComponent,
    FeedbackComponent,
    TransactionConfirmationComponent,
    MySearchComponent,
    ConfirmOfferComponent,
    GivefeedbackComponent
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
    ToastModule.forRoot(),
    CarouselModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    OfferService,
    DatePipe,
    FeedbackService,
    OrderService,
  ],
  bootstrap: [AppComponent],
  //entryComponents: [YesNoModalComponent],
  exports: [
    FileSelectDirective
  ]
})
export class AppModule { }
