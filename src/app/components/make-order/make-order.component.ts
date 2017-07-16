import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Offer } from '../../models/offer';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../../services/order.service';
import { OfferService } from '../../services/offer.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Order } from '../../models/order';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  offerID: String;
  private sub: any;
  offer: Offer;
  order: Order;
  dataAvailable = false;
  month: String;
  year: String;
  orderCreated = false;
  private codeBuyersPart = "";

  orderPaymentOptions = [
      "Credit Card"
    ];

    monthsOptions = [
      "01","02", "03", "04", "05", "06", 
      "07", "08", "09", "10","11","12"
    ];

    yearsOptions = [
      "2017", "2018", "2019", "2020", "2021", "2022"
    ];

  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private offerService: OfferService,
    private router: Router,
    private titleService: Title,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef) {

    this.order = new Order();

    this.toastr.setRootViewContainerRef(vcr);
    this.titleService.setTitle("Making order");

    this.sub = this.route.params.subscribe(params => {
      this.offerID = params['id'];
    });

      this.offerService.getOffer(this.offerID).subscribe(offer => {
      this.offer = offer;
      this.offer.handoutDatetimeStart = new Date(offer.handoutDatetimeStart);
      this.offer.handoutDatetimeEnd = new Date(offer.handoutDatetimeEnd);

      this.dataAvailable = true;
    });

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createOrder()
  {
      this.order.offer = this.offerID;
      if(this.order.paymentOption == "Credit Card")
      {
        this.order.expiringMonth = this.month;
        this.order.expiringYear = this.year;
        this.order.price = this.offer.price;
      }

      this.orderService.createOrder(this.order)
      .subscribe( data => {

        var createdOrder = JSON.parse(JSON.stringify(data));

        var createdOrder = JSON.parse(JSON.stringify(data));
        if(createdOrder._id)
        {
            this.toastr.success('You have sucessfully made the order!', null, { showCloseButton: true });
            this.codeBuyersPart = createdOrder.randNum;
            this.orderCreated = true;
        }
        else{
            this.toastr.success('Error in order creation, please try later.', null, { showCloseButton: true });
        }
 
      });
  }
}
