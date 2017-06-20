import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { User } from '../../models/user';
import { Offer } from '../../models/offer';
import { UserService } from '../../services/user.service';
import { OfferService } from '../../services/offer.service';

declare var $: any;

@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.css'],
})
export class CreateofferComponent implements OnInit {
  offer: Offer = new Offer();
  deliveryTypes = [
        "Seller will deliver the food",
         "Buyer will pickup the food"
     ];
    selectedValue = null;

    options = ['OptionA', 'OptionB', 'OptionC'];
    optionsMap = {
            OptionA: false,
            OptionB: false,
            OptionC: false,
    };
    optionsChecked = [];




  constructor(private offerService: OfferService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Create new offer");
  }

  ngOnInit() {
    // $(function () {
    //           $('#handoutDatePicker').datetimepicker();
    // });
  }
  createOffer(event) {
    //console.log('something hapened', this.offer.handoutDatetimeStart);
    //return;
    this.offerService.createOffer(this.offer)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });
  }
}
