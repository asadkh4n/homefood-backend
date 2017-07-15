import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Title, DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { OfferService } from '../../services/offer.service';

import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/RX';

import { Http, Headers, Response } from '@angular/http';

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

  public displayImageUrl = "";

  constructor(private offerService: OfferService,
              private router: Router,
              private titleService: Title,
              private datePipe: DatePipe,
              private sanitizer: DomSanitizer,
              private http:Http) 
              {
                this.titleService.setTitle("My offers");
              }

  ngOnInit() {
    this.getOffers();
  }

  getOffers()
  {
      this.offerService.getOffers(this.loadedElementsNum).subscribe(offers => {

        console.log(this.loadedElementsNum);

        for (var i = 0; i < offers.length; i++) {
          this.offers.push(offers[i]);

          this.getImageUrl(offers[i]._id);

        } 
        //this.offers = offers;
        this.loadedElementsNum += offers.length;

      })
  }

  checkOfferID(id, query)
  {
    return id === query;
  }

  getImageUrl(offerID)
  {
    return this.offerService.getDisplayImage(offerID).subscribe(imgSrc =>{
      this.offers.find(x => x._id == offerID).imgUrl = imgSrc;
    });
  }
}
