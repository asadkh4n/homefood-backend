import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

import { IsLoggedIn } from './resolves/is-logged-in.resolve'

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateofferComponent } from './components/createoffer/createoffer.component';
import { MyoffersComponent } from './components/myoffers/myoffers.component';
import { OfferdetailsComponent } from './components/offerdetails/offerdetails.component';
import { ConfirmOfferComponent } from './components/confirm-offer/confirm-offer.component';
import { GivefeedbackComponent } from './components/givefeedback/givefeedback.component';
import { TransactionConfirmationComponent } from './components/transactionconfirmation/transactionconfirmation.component';



const appRoutes: Routes = [
    {
        path: '',
        component: LandingpageComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'createoffer',
        component: CreateofferComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'myoffers',
        component: MyoffersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'offerdetails/:id',
        component: OfferdetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'confirm-offer/:id',
        component: ConfirmOfferComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'givefeedback/:id',
        component: GivefeedbackComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactionconfirmation/:id',
        component: TransactionConfirmationComponent,
        canActivate: [AuthGuard]
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
