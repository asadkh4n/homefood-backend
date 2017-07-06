import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

import { IsLoggedIn } from './resolves/is-logged-in.resolve'

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateofferComponent } from './components/createoffer/createoffer.component';
import { MyoffersComponent } from './components/myoffers/myoffers.component';
import { OfferDetailsComponent } from './components/offerdetails/offerdetails.component';


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
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
