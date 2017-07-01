import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as myGlobals from '../../globals';

import { Offer } from '../models/offer';

@Injectable()
export class OfferService {
  private apiURL = myGlobals.baseAPIUrl + '/offer';

  constructor(private http: Http) {
   }

  createOffer(newOffer: Offer) : Observable<Object> {
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('Authorization', currentUser.token)

    newOffer.user = currentUser.userId;

    return this.http.post(this.apiURL, JSON.stringify(newOffer), { headers: headers })
    .map((response: Response) => response.json())
    .catch((response: Response) => Observable.throw(response.status)) 

/*      if(response.status == 201)
        return true;
      else
        return false;*/
    
  }

}
