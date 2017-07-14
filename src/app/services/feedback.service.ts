import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as myGlobals from '../../globals';
import { Feedback } from '../models/feedback';

@Injectable()
export class FeedbackService {

  private apiURL = myGlobals.baseAPIUrl + '/feedback';
  private headers: Headers;
  private currentUser: any;

  constructor(private http: Http) {
    this.headers = new Headers();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('Authorization', this.currentUser.token);
   }
  getFeedbacks(user_id : String){
    this.headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiURL + '/getByUser/' + user_id, { headers: this.headers }).map(res => res.json());

  }


}
