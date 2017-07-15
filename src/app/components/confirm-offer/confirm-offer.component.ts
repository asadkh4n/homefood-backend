import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-confirm-offer',
  templateUrl: './confirm-offer.component.html',
  styleUrls: ['./confirm-offer.component.css']
})
export class ConfirmOfferComponent implements OnInit, OnDestroy {

  id: String;
  private sub: any;
  offer: Offer;
  confirmationCode: String;
  dataAvailable = false;

  constructor(private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router,
    private titleService: Title,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
    this.titleService.setTitle("Confirm the transaction");

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

    });

    this.offerService.getOffer(this.id).subscribe(offer => {
      this.offer = offer;
      this.offer.handoutDatetimeStart = new Date(offer.handoutDatetimeStart);
      this.offer.handoutDatetimeEnd = new Date(offer.handoutDatetimeEnd);

      this.dataAvailable = true;

    });
  }
  ngOnInit() {/*
        this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.offerService.getOffer(this.id).subscribe(offer => {
      this.offer = offer;
      this.offer.handoutDatetimeStart = new Date(offer.handoutDatetimeStart);
      this.offer.handoutDatetimeEnd = new Date(offer.handoutDatetimeEnd);

    })*/
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  confirmTransaction() {
    this.offerService.confirmOffer(this.id, this.confirmationCode)
      .subscribe(res => {

        if (res.status == 200) {
          this.toastr.success('You have sucessfully confirmed the transaction!', null, { showCloseButton: true });

          setTimeout(() => {
            this.router.navigate(['/myoffers']);
          }, 1000)
        }
        else if(res.status == 400) {
          this.toastr.error(res.text() , null, { showCloseButton: true });
        }
        else{
          this.toastr.error('Error occured during confirmation please try later!', null, { showCloseButton: true });
        }
      });
  }

}
