import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Profile } from '../model/profile';

@Component({
  selector: 'login',
  templateUrl: 'app/templates/login.component.html'
})
export class LoginComponent implements OnInit { 
  returnUrl: string;
  model = new Profile();
  showError: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  login() {
    var profile = this.authService.logIn(this.model).subscribe(
      data => {
        if (data.id) { // this is an indication of valid profile
          // store the profile for latter guards
          this.authService.profile = data;

          this.router.navigate(['/']);

        } else {
          this.model = new Profile();
          this.showError = true;
        }
      },
      error => {
        this.model = new Profile();
        this.showError = true;
      });
  }
}
