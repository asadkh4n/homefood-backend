import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService, private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }
  registerUser(event) {
    console.log('something hapened');
    this.userService.createUser(this.user)
      .subscribe( success => {
        if (success) {
          this.authenticationService.login(this.user.username, this.user.password)
           .subscribe();
          this.router.navigate(['/home']);
        } else {
          alert('Error while creating offer!');
        }
      });
  }
}
