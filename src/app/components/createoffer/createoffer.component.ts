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

/*  fileChangeEvent(fileInput: any){
        console.log("NEW FILE");
        this.files = <Array<File>> fileInput.target.files;
        console.log(this.files);
  }*/

  /*makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
      return new Promise((resolve, reject) => {
          var formData: any = new FormData();
          var xhr = new XMLHttpRequest();

          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              formData.append(key, params[key]);
            }
          }

          alert()
          for(var i = 0; i < files.length; i++) {
              formData.append("uploads[]", files[i], files[i].name);
          }

          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      resolve(JSON.parse(xhr.response));
                  } else {
                      reject(xhr.response);
                  }
              }
          }

          var user = JSON.parse(localStorage.getItem('currentUser'));
          xhr.open("POST", url, true);
          xhr.setRequestHeader('Authorization', user.token);
          xhr.send(formData);
      });
  }
*/
  convertDate(date: any) : Date {
    if(!date) return;
    return new Date(date.year, date.month, date.day);
  } 
  createOffer(event) {
    
    //reassigning date to Date object
    this.offer.handoutDatetimeStart = this.convertDate(this.offer.handoutDatetimeStart);
    this.offer.handoutDatetimeEnd = this.convertDate(this.offer.handoutDatetimeEnd);

/*    var json = JSON.stringify(this.offer);
    var array = JSON.parse(json);

    this.makeFileRequest("http://localhost:3000/api/offer", array, this.files).then((result) => {
          console.log(result);
      }, (error) => {
          console.error(error);
      });*/

    this.offerService.createOffer(this.offer)
          .subscribe( data => {

            var createdOffer = JSON.parse(JSON.stringify(data));
            console.log(createdOffer._id);
            
            if(createdOffer._id)
            {
                var user = JSON.parse(localStorage.getItem('currentUser'));
                this.uploader.setOptions({
                  headers: [{name: 'Authorization', value: user.token }],
                  url : "http://localhost:3000/api/offer/pictures/" + user.username + "/" + createdOffer._id
                });

                this.uploader.uploadAll();
            }

            this.toastr.success('You have sucessfully created offer!', null, { showCloseButton: true })
            return;
      });
/*      .subscribe( success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });*/
  }
}
