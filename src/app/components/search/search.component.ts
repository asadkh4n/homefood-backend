import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Title, DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { OfferService } from '../../services/offer.service';

import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/RX';

import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class MySearchComponent implements OnInit {

  private offers: any[] = [];
  private filteredOffers: any[] = [];
  private searchCriteria = {
    title: null,
    vegan: null,
    vegetarian: null,
    halal: null,
    bio: null
  };
  loadedElementsNum = 0;
  throttle = 300;
  scrollDistance = 1;

  public displayImageUrl = "";

  constructor(private offerService: OfferService,
              private router: Router,
              private titleService: Title,
              private datePipe: DatePipe,
              private sanitizer: DomSanitizer,
              private http:Http) {
                //this.titleService.setTitle("My offers");
              }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
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

  searchOffers($event, searchquery) {
    this.filteredOffers = Object.assign([], this.offers).filter( (item) => {

      let match:boolean = false;
      let keys = Object.keys(searchquery);
      match = searchquery.title == null || item.title.toLowerCase().indexOf(searchquery.title.toLowerCase()) > -1
      match = match && ( searchquery.bio == null ||  searchquery.bio == item.bio);
      match = match && ( searchquery.vegan == null ||  searchquery.vegan == item.vegan);
      match = match && ( searchquery.vegetarian == null ||  searchquery.vegetarian == item.vegetarian);
      match = match && ( searchquery.halal == null ||  searchquery.halal == item.halal);
      return match
              
    }
   )
  }

  checkOfferID(id, query) {
    return id === query;
  }

  getImageUrl(offerID) {
    return this.offerService.getDisplayImage(offerID).subscribe(imgSrc =>{
      this.offers.find(x => x._id == offerID).imgUrl = imgSrc;
    });
  }
}
