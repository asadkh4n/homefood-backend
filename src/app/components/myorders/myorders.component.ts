import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Title, DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { OrderService } from '../../services/order.service';
import { OfferService } from '../../services/offer.service';

import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/RX';

import { Http, Headers, Response } from '@angular/http';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  private orders: any[] = [];
  private offers: any[] = [];

  loadedElementsNumOffers = 0;
  loadedElementsNumOrders = 0;
  throttle = 300;
  scrollDistance = 1;

  public displayImageUrl = '';

  constructor(private orderService: OrderService,
              private offerService: OfferService,
              private router: Router,
              private titleService: Title,
              private datePipe: DatePipe,
              private sanitizer: DomSanitizer,
              private http: Http) {
    this.titleService.setTitle("My orders");

    this.getOrders();
    this.getOffersFromOrders();
  }

  ngOnInit() {

    if (window.pageYOffset == 0) {
      this.getOrders();
    } else {
      setTimeout(() => {
        this.getOrders();
      }, 1200)
    }

  }

  getOrders() {
    this.orderService.getOrders(this.loadedElementsNumOrders).subscribe(orders => {
      for (let i = 0; i < orders.length; i++) {
        this.orders.push(orders[i]);
      }
      this.loadedElementsNumOrders += orders.length;
    })
  }

  getOffersFromOrders() {
    this.offerService.getOffers(this.loadedElementsNumOffers).subscribe(offers => {
      for (let i = 0; i < offers.length; i++) {
        for (let j = 0; i < this.orders.length; j++) {
          if (offers[i]._id == this.orders[j].offer ) {
            console.log("!!!!");
            this.offers.push(offers[i]);
            this.getImageUrl(offers[i]._id);
          } else {
            console.log("Noooooes");
          }
        }
      }
      this.loadedElementsNumOffers += offers.length;
    })
  }

  getImageUrl(offerID) {
    return this.offerService.getDisplayImage(offerID).subscribe(imgSrc => {
      this.offers.find(x => x._id == offerID).imgUrl = imgSrc;
    });
  }

  checkOrderID(id, query) {
    return id === query;
  }

  cancelOrder(orderID, elementIndex) {
    alert('Canceling ' + orderID + "IND: " + elementIndex);

    this.orderService.cancelOrder(orderID).subscribe(res => {
      if (res.status == 200) {
        this.orders.splice(elementIndex,1);
      }
    });
  }


}
