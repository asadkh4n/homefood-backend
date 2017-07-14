import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  private feedbacks1: any[] = [];
  private user_id;
  private rating;
  private offers: any[] = [];
  constructor(private feedbackService : FeedbackService,
              private offerService:OfferService) { }

  ngOnInit() {
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    //console.log(this.offers[0].user);
    this.getFeedbacks(id);
    //console.log(this.user_id);
  }


  getFeedbacks(offer_id:String)
  {
     this.offerService.getOffer(offer_id).subscribe(offer => {
          
          this.user_id = offer.user;
          this.offers.push(offer);
          console.log(this.user_id);
          this.feedbackService.getFeedbacks(this.user_id).subscribe(feedbacks => {
          for (var i = 0; i < feedbacks.length; i++) {
            this.feedbacks1.push(feedbacks[i]);
            this.rating += feedbacks[i].rating;
            console.log(this.feedbacks1[0].comment);
          } 
          this.rating = this.rating/feedbacks.length;
      })
    }) 
    
    
  }

}
