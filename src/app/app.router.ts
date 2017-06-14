import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

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
    // default to home
    { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
