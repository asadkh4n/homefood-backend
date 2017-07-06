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

  private orders: any[] = [];

  constructor(private orderService: OrderService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Transaction confirmation');
  }

  ngOnInit() {
  }

  getOrders() {
  }

}
