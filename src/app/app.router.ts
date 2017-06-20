import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateofferComponent } from './components/createoffer/createoffer.component';

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
    // default to home
    { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
