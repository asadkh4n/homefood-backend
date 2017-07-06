import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor(private titleService: Title, private authService: AuthenticationService) {
        this.titleService.setTitle('Welcome to Home Food');
   }

  ngOnInit() {
  }

}
