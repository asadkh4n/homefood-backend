import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Offer } from '../../models/offer';
import { Feedback } from '../../models/feedback';
import { FeedbackService } from '../../services/feedback.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-givefeedback',
  templateUrl: './givefeedback.component.html',
  styleUrls: ['./givefeedback.component.css']
})
export class GivefeedbackComponent implements OnInit {
private rate = 0;
private feedback = new Feedback;
private order;
private user_id = "d";
private offer_id;
constructor(private feedbackService: FeedbackService,
            private orderService: OrderService
              ) { }

  ngOnInit() {
    
  }
  createFeedback(event){
    this.getOrder();
    this.feedback.user = this.user_id;
    this.feedback.offer = this.offer_id;
    this.feedbackService.createFeedback(this.feedback)
          .subscribe( data => {
            var createdFeedback = JSON.parse(JSON.stringify(data));
    });
  }
  getOrder(){
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    this.orderService.getOrder(id).subscribe(order =>{
      this.order = order;
      this.user_id = order.user;
      this.offer_id = order.offer;
      console.log(this.offer_id);
    })
  }

}

/*export class NgbdRatingBasic {
  currentRate = 8;
  print(){
    console.log(this.currentRate);
  }
}*/
