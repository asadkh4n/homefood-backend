import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-transactionconfirmation',
  templateUrl: './transactionconfirmation.component.html',
  styleUrls: ['./transactionconfirmation.component.css']
})
export class TransactionConfirmationComponent implements OnInit {

  constructor(private titleService: Title, private authService: AuthenticationService) {
   }

  ngOnInit() {
  }

}
