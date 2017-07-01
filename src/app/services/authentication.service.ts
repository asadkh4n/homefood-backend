import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map'
import * as myGlobals from '../../globals';

@Injectable()
export class AuthenticationService {
  public token: string;
  private apiURL = myGlobals.baseAPIUrl + '/user';

  constructor(private http: Http, private router: Router) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiURL}/login`, JSON.stringify({ username: username, password: password }), { headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        const userId = response.json().userId;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, userId: userId, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getLoggedUser(): string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
