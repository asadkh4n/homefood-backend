import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Offer } from '../../models/offer';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../../services/feedback.service';
import { OrderService } from '../../services/order.service';
import { OfferService } from '../../services/offer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-givefeedback',
  templateUrl: './givefeedback.component.html',
  styleUrls: ['./givefeedback.component.css']
})
export class GivefeedbackComponent implements OnInit {
private rate = 0;
private feedback = new Feedback;
private order;
private user_id;
private offer_id;
constructor(private feedbackService: FeedbackService,
            private orderService: OrderService,
            private offerService: OfferService,
            private router: Router
              ) { }

  ngOnInit() {
    
  }
  /*createFeedback(event){
    this.getOrder();
    this.feedbackService.createFeedback(this.feedback)
          .subscribe( data => {
            var createdFeedback = JSON.parse(JSON.stringify(data));
    });
    var of = this.offer_id;
     setTimeout(()=>{ 
              this.router.navigate(['/myoffers']); 
            }, 1000)
  }*/
  getOrder(event){
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    this.orderService.getOrder(id).subscribe(order =>{
      this.order = order;
      this.offer_id = order.offer;
      this.offerService.getOffer(this.offer_id).subscribe(offer =>{
      this.user_id = offer.user;
      console.log(this.user_id);
      this.feedback.user = offer.user;
      this.feedback.offer = this.offer_id;
      this.feedbackService.createFeedback(this.feedback)
          .subscribe( data => {
            var createdFeedback = JSON.parse(JSON.stringify(data));
             setTimeout(()=>{ 
              this.router.navigate(['/myoffers']); 
            }, 1000)
    });
    })
    })
  }

}

/*export class NgbdRatingBasic {
  currentRate = 8;
  print(){
    console.log(this.currentRate);
  }
}*/
