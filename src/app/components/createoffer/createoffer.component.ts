import {Directive, Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FormsModule, NgForm} from '@angular/forms';
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

  offer: Offer;
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
    submitted = false;

  createofferForm: NgForm;
  @ViewChild('createofferForm') currentForm: NgForm;

  formErrors = {
    'inputTitle': '',
    'inputPrice': '',
    'inputIngredients': '',
    'inputPlace': '',
    'handoutDatetimeStart': '',
    'handoutDatetimeEnd': '',
    'inputDescription': '',
    'inputDeliveryType': ''
  };

  validationMessages = {
    'inputTitle': {
      'required': 'Title is required.',
      'minlength': 'Title must be at least 4 characters long.',
      'maxlength': 'Title cannot be more than 24 characters long.'
    },
    'inputPrice': {
      'required': 'Price is required.',
      'pattern': 'Letters are not allowed'
    },
    'inputIngredients': {
      'required': 'Ingredients is required.',
      'minlength': 'Title must be at least 4 characters long.',
      'maxlength': 'Title cannot be more than 24 characters long.',
      'pattern': 'Numbers are not allowed'
    },
    'inputDeliveryType': {
      'required': 'Delivery type is required.'
    },
    'inputPlace': {
      'required': 'Place is required.',
      'minlength': 'Title must be at least 4 characters long.',
      'maxlength': 'Title cannot be more than 10 characters long.',
      'pattern': 'Numbers are not allowed'
    },
    'handoutDatetimeStart': {
      'required': 'Datetime start is required.'
    },
    'handoutDatetimeEnd': {
      'required': 'DatetimeEnd is required.'
    },
    'inputDescription': {
      'required': 'Description is required.'
    }
  };

  constructor(private offerService: OfferService,
              private router: Router, private titleService: Title,
              public toastr: ToastsManager,
              private vcr: ViewContainerRef)
  {
            this.toastr.setRootViewContainerRef(vcr);
            this.titleService.setTitle("Create new offer");
            this.offer = new Offer();
            this.submitted = false;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  onSubmit() {
    this.submitted = true;
  }

  formChanged() {
    if (this.currentForm === this.createofferForm) { return; }
    this.createofferForm = this.currentForm;
    if (this.createofferForm) {
      this.createofferForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.createofferForm) { return; }
    const form = this.createofferForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  convertDate(date: any): Date {
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
        .subscribe(data => {

          var createdOffer = JSON.parse(JSON.stringify(data));
          if (createdOffer._id) {
            this.uploader.setOptions({
              headers: [{name: 'Authorization', value: user.token}],
              url: "http://localhost:3000/api/offer/pictures/" + user.username + "/" + createdOffer._id
            });

                this.uploader.uploadAll();

                this.toastr.success('You have sucessfully created offer!', null, { showCloseButton: true });
            }
            else{
                this.toastr.success('Error in offer creation, please try later.', null, { showCloseButton: true });
            }

          setTimeout(() => {
            this.router.navigate(['/myoffers']);
          }, 1000)

        });
  }
}
