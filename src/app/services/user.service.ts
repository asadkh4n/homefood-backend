import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';

import * as myGlobals from '../../globals';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private apiURL = myGlobals.baseAPIUrl + '/user';
  private headers: Headers;

  constructor(private http: Http) { }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  createUser(newUser: User): Observable<boolean> {
    console.log(newUser);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiURL}/signup`, JSON.stringify(newUser), { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: newUser.username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }
  getUser(id: String){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(this.apiURL + '/' + id);
    return this.http.get(this.apiURL + '/' + id , {headers: headers})
    .map(res => res.json());
  }
}
