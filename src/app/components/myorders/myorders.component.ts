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
  private myorders: any[] = [];
  private currentUser;

  orderIDs : any[] = [];

  loadedElementsNumOffers = 0;
  loadedElementsNumOrders = 0;

  public displayImageUrl = '';

  constructor(private orderService: OrderService,
              private offerService: OfferService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('My orders');
  }

  ngOnInit() {
    
    if (window.pageYOffset == 0) {
      this.getOffersFromOrders();
    } else {
      setTimeout(() => {
        this.getOffersFromOrders();
      }, 1200)
    }
  }

  getOrders() {
    this.orderService.getOrders(this.loadedElementsNumOrders).subscribe(orders => {
      console.log(orders.length);
      for (let i = 0; i < orders.length; i++) {
        this.orders.push(orders[i]);
      }
      this.loadedElementsNumOrders += orders.length;
    })
  }

  getOffersFromOrders() {
    this.getOrders();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser.userId + " sdlkmfas");
    this.offerService.getAllOffers(this.loadedElementsNumOffers).subscribe(offers => {
      for (let i = 0; i < offers.length; i++) {
        for (let j = 0; j < this.orders.length; j++) {
          if (offers[i]._id == this.orders[j].offer && this.orders[j].user == this.currentUser.userId) {
            this.offers.push(offers[i]);
            this.orderIDs.push(this.orders[j]._id);
            this.myorders.push(this.orders[j]);
            this.getImageUrl(offers[i]._id);
          } else {
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
    alert(orderID);
    this.orderService.cancelOrder(orderID).subscribe(res => {
      if (res.status == 200) {
        this.orders.splice(elementIndex,1);
      }
    });
  }

  redirectToGiveFeedback(orderID) {
    this.router.navigate(['/givefeedback', orderID ]);
  }


}
