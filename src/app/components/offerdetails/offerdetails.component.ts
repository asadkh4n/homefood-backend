import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { FeedbackService } from '../../services/feedback.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  public offer_id = "sf";
  private check = false;
  private feedbackService : FeedbackService;
  private feedbacks: any[] = [];
  constructor(private offerService: OfferService,
              private router: Router,
              private datePipe: DatePipe,
              private orderService: OrderService) { }

  ngOnInit() {
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    if(res[1].localeCompare("offerdetails") === 0){
      this.getOffer(id);
      this.getImageUrl(id);
      this.check = true;
    }else{
      this.getOfferIdFromOrderId(id);
    }
    
    //this.user_id = this.offer.user;
    //this.getFeedbacks(this.offer.user_id);
    
  }

  getOffer(id: String)
  {
      this.offer =  this.offerService.getOffer(id);
      this.offerService.getOffer(id).subscribe(offer => {
        this.offer = offer;
        this.date = offer.handoutDatetimeStart;
      })
  }
   getImageUrl(offerID)
  {
    return this.offerService.getDisplayImage(offerID).subscribe(imgSrc =>{
      this.offer.imgUrl = imgSrc;
    });
  }

   getOfferIdFromOrderId(order_id:String){
    
    this.orderService.getOrder(order_id).subscribe(order => {
      this.offer_id = order.offer;
      this.getOffer(this.offer_id);
      this.getImageUrl(this.offer_id);
    })
  }

 
}
