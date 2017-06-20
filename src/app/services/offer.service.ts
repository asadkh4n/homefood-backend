import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';

import { Offer } from '../models/offer';

@Injectable()
export class OfferService {
  private baseUrl = 'http://localhost:3001/api/offer';
  constructor(private http: Http) {
   }

  createOffer(newOffer: Offer) : Observable<boolean> {
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(currentUser);

    //headers.append('Authorization', currentUser.token)

    return this.http.post(this.baseUrl, JSON.stringify(newOffer), { headers: headers })
    .map((response: Response) => {
      if(response.status == 201)
        return true;
      else
        return false;
    });
  }

}
