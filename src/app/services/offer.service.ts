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
  private headers: Headers;
  private currentUser: any;

  constructor(private http: Http) {
  }

  private prepareRequest()
  {
    this.headers = new Headers();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('Authorization', this.currentUser.token);
  }

  createOffer(newOffer: Offer): Observable<Object> {

    this.prepareRequest();

    if (!this.headers.get("Content-Type"))
      this.headers.append('Content-Type', 'application/json');

    newOffer.user = this.currentUser.userId;

    return this.http.post(this.apiURL, JSON.stringify(newOffer), { headers: this.headers })

      .map((response: Response) => response.json())
      .catch((response: Response) => Observable.throw(response.status))
  }

  getOffers(loadedElements: Number) {
    this.prepareRequest();

    this.headers.set('LoadedElements', loadedElements.toString());
    return this.http.get(this.apiURL, { headers: this.headers }).map(res => res.json());
  }

  getAllOffers(loadedElements: Number) {
    this.prepareRequest();

    this.headers.set('LoadedElements', loadedElements.toString());
    return this.http.get(this.apiURL + "/search", { headers: this.headers }).map(res => res.json());
  }


  getOffer(id: String) {

    this.prepareRequest();

    if (!this.headers.get("Content-Type"))
      this.headers.append('Content-Type', 'application/json');

    return this.http.get(this.apiURL + '/' + id, { headers: this.headers })
      .map(res => res.json());
  }


  getDisplayImage(offerID): Observable<string> {

    this.prepareRequest();

    return this.http.get(this.apiURL + "/pictures/" + offerID, { headers: this.headers }).map(res => res.json());
  }

  deleteOffer(offerID) {
    try {

      this.prepareRequest();

      return this.http.delete(this.apiURL + "/" + offerID, { headers: this.headers }).map(res => res);
    } catch (error) {
    }
  }

  confirmOffer(offerID, confirmationCode) {
    try {

      this.prepareRequest();

      if (!this.headers.get("Content-Type"))
        this.headers.append('Content-Type', 'application/json');

      return this.http.put(this.apiURL + "/confirm/" + offerID,
        { confirmationCode: confirmationCode },
        { headers: this.headers })
        .map(res => res)
        .catch(res => { return Observable.of<Response>(res); });

    } catch (error) {
      console.log("sda")
    }
  }
}
