import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offerdetails',
  templateUrl: './offerdetails.component.html',
  styleUrls: ['./offerdetails.component.css']
})
export class OfferdetailsComponent implements OnInit {

  private offer;
  constructor(private offerService: OfferService,
              private router: Router
              ) { }

  ngOnInit() {
    var url = location.pathname;
    var res = url.split("/");
    var id = res[2];
    this.getOffer(id);
  }

  getOffer(id: String)
  {
      this.offer =  this.offerService.getOffer(id);
      console.log(this.offer.price);
      this.offerService.getOffer(id).subscribe(offer => {

        this.offer = offer;

      })


  }
}
