import { Directive, Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { User } from '../../models/user';
import { Offer } from '../../models/offer';
import { UserService } from '../../services/user.service';
import { OfferService } from '../../services/offer.service';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-createoffer',
  templateUrl: './createoffer.component.html',
  styleUrls: ['./createoffer.component.css'],
})
export class CreateofferComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: "http://localhost:3000/api/offer/pictures"});
  
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

  constructor(private offerService: OfferService,
              private router: Router, private titleService: Title,
              public toastr: ToastsManager,
              private vcr: ViewContainerRef) 
  {
            this.toastr.setRootViewContainerRef(vcr);
            this.titleService.setTitle("Create new offer");
  }

  ngOnInit() {
  }

  convertDate(date: any) : Date {
    if(!date) return;
    return new Date(date.year, date.month, date.day);
  }
  createRandomOffer(event) {
    let foodTitles = ["donor", "rice", "ramen"];
    this.offer.title = `${foodTitles[Math.floor(Math.random()*foodTitles.length)]} ${Math.floor(Math.random()*100 + 1)}`;
    this.offer.price = Math.floor(Math.random()*100 + 1);
    this.offer.bio = Math.random() >= 0.5;
    this.offer.vegan = Math.random() >= 0.5;
    this.offer.vegetarian = Math.random() >= 0.5;
    this.offer.halal = Math.random() >= 0.5;
  }
  createOffer(event) {
    
    //reassigning date to Date object
    this.offer.handoutDatetimeStart = this.convertDate(this.offer.handoutDatetimeStart);
    this.offer.handoutDatetimeEnd = this.convertDate(this.offer.handoutDatetimeEnd);

    var user = JSON.parse(localStorage.getItem('currentUser'));
    //this.offer.user = user.userId;

    this.offerService.createOffer(this.offer)
          .subscribe( data => {

            var createdOffer = JSON.parse(JSON.stringify(data));
            if(createdOffer._id)
            {
                this.uploader.setOptions({
                  headers: [{name: 'Authorization', value: user.token }],
                  url : "http://localhost:3000/api/offer/pictures/" + user.username + "/" + createdOffer._id
                });

                this.uploader.uploadAll();
            }

            this.toastr.success('You have sucessfully created offer!', null, { showCloseButton: true });
            
            setTimeout(()=>{ 
              this.router.navigate(['/myoffers']); 
            }, 1000)
            
            return;
      });
/*      .subscribe( success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });*/
  }
}
