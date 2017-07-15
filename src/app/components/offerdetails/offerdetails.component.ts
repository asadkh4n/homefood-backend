import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-offerdetails',
  templateUrl: './offerdetails.component.html',
  styleUrls: ['./offerdetails.component.css']
})

export class OfferdetailsComponent implements OnInit {
  private offer;
  private user;
  private feedback;
  private user_id;
  private date;
  private feedbackService: FeedbackService;
  private feedbacks: any[] = [];
  constructor(private offerService: OfferService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    this.getOffer(id);
    this.getImageUrl(id);
    //this.user_id = this.offer.user;
    //this.getFeedbacks(this.offer.user_id);
  }

  getOffer(id: String) {
    //this.offer = this.offerService.getOffer(id);
    
    this.offerService.getOffer(id).subscribe(offer => {
      this.offer = offer;
      this.date = new Date(offer.handoutDatetimeStart);
      console.log(this.date);
    })
  }

  getImageUrl(offerID) {
    return this.offerService.getDisplayImage(offerID).subscribe(imgSrc => {
      this.offer.imgUrl = imgSrc;
    });
  }


}
