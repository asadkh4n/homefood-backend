import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { OfferService } from '../../services/offer.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myoffers',
  templateUrl: './myoffers.component.html',
  styleUrls: ['./myoffers.component.css']
})
export class MyoffersComponent implements OnInit {

  private offers: any[] = [];
  loadedElementsNum = 0;
  throttle = 300;
  scrollDistance = 1;

  constructor(private offerService: OfferService,
              private router: Router,
              private titleService: Title,
              private datePipe: DatePipe) 
              {
                this.titleService.setTitle("My offers");
              }

  ngOnInit() {
    this.getOffers();
  }

  getOffers()
  {
      this.offerService.getOffers(this.loadedElementsNum).subscribe(offers => {

        for (var i = 0; i < offers.length; i++) {
          this.offers.push(offers[i]);
        } 
        //this.offers = offers;
        this.loadedElementsNum += offers.length;

      })
  }

}
