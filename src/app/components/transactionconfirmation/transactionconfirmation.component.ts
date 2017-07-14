import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-transactionconfirmation',
  templateUrl: './transactionconfirmation.component.html',
  styleUrls: ['./transactionconfirmation.component.css']
})

export class TransactionConfirmationComponent implements OnInit {

  private order;

  constructor(private orderService: OrderService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Transaction confirmation');
  }

  ngOnInit() {
    const url = location.pathname;
    const res = url.split('/');
    const id = res[2];

    this.getOrder(id);
  }


  getOrder(order_id: String) {
    this.orderService.getOrder(order_id).subscribe(order => {
      this.order = order;
    })
  }

}
