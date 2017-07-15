import { Component, Input } from '@angular/core';
//import { MyoffersComponent } from '../myoffers.component';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css'],
  providers: [NgbActiveModal]
})


export class YesNoModalComponent {
  @Input() name;
  private activeModal1: NgbActiveModal;
   constructor(public activeModal: NgbActiveModal) {
      this.activeModal1 = new NgbActiveModal();
   }
 
  // onCancel(): void {
  //   this.closeModal();
  // }
 
  // onSubmit(): void {
  //   event.preventDefault();
  //   this._parent.deleteOffer(this.offerID, 0);
  // }

  test()
  {
    alert("NECE");
    this.activeModal1.close('da');
    this.activeModal.close('da');
  }
}

