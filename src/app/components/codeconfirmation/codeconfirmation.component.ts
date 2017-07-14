import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {OfferService} from 'app/services/offer.service';

@Component({
  selector: 'app-codeconfirmation',
  templateUrl: './codeconfirmation.component.html',
  styleUrls: ['./codeconfirmation.component.css']
})
export class CodeconfirmationComponent implements OnInit {

  private offer = null;

  constructor(private offerService: OfferService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Confirm code');
  }

  ngOnInit() {
    const url = location.pathname;
    const res = url.split('/');
    const id = res[2];

    this.getOffer(id);
  }

  confirmCode(event) {
  }

  getOffer(offer_id: String) {
    this.offerService.getOffer(offer_id).subscribe(offer => {
      this.offer = offer;
    })
  }

}
