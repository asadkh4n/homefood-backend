import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as myGlobals from '../../globals';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  private apiURL = myGlobals.baseAPIUrl + '/order';
  private headers: Headers;
  private currentUser: any;

  constructor(private http: Http) {

  }

  private prepareRequest() {
    this.headers = new Headers();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('Authorization', this.currentUser.token);
  }

  getOrders(loadedElements: Number) {
    this.prepareRequest();

    this.headers.set('LoadedElements', loadedElements.toString());
    return this.http.get(this.apiURL, { headers: this.headers }).map(res => res.json());
  }

  getOrder(id: String) {

    this.prepareRequest();

    if (!this.headers.get("Content-Type"))
      this.headers.append('Content-Type', 'application/json');

    return this.http.get(this.apiURL + '/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  getSellerCodePart(offerID) {
    this.prepareRequest();

    if (!this.headers.get("Content-Type"))
      this.headers.append('Content-Type', 'application/json');

    return this.http.get(this.apiURL + '/code/' + offerID, { headers: this.headers })
      .map(res => res.json());

  }

  createOrder(newOrder: Order): Observable<Object> {
    this.prepareRequest();

    if (!this.headers.get("Content-Type"))
      this.headers.append('Content-Type', 'application/json');

      return this.http.post(this.apiURL, JSON.stringify(newOrder), { headers: this.headers })

      .map((response: Response) => response.json())
      .catch((response: Response) => Observable.throw(response.status))
  }

  cancelOrder(orderID) {
    try {

      this.prepareRequest();

      return this.http.delete(this.apiURL + "/" + orderID, { headers: this.headers }).map(res => res);
    } catch (error) {
    }
  }

}
