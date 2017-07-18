import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastsManager) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  loginUser(event) {
    this.authenticationService.login(this.username, this.password)
      .subscribe( success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });

  }
}
