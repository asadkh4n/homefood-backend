import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Offer } from '../../models/offer';
import { Feedback } from '../../models/feedback';
@Component({
  selector: 'app-givefeedback',
  templateUrl: './givefeedback.component.html',
  styleUrls: ['./givefeedback.component.css']
})
export class GivefeedbackComponent implements OnInit {
private rate = 0;
private a;
feedback:Feedback;
  constructor() { }

  ngOnInit() {
    

  }
  createFeedback(event){

  }

}

/*export class NgbdRatingBasic {
  currentRate = 8;
  print(){
    console.log(this.currentRate);
  }
}*/
