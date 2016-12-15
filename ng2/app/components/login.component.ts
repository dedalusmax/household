import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Profile } from '../model/profile';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'login',
  templateUrl: 'app/templates/login.component.html'
})
export class LoginComponent implements OnInit { 
  model = new Profile();
  showError: boolean;
  rememberMe: boolean;

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  login() {

    if (this.rememberMe) {
      this.cookieService.putObject('profile', this.model);
    }

    this.authService.logIn(this.model).subscribe((data) => {
        if (data.id) { // this is the indication of valid profile
          this.authService.profile.next(data); // inject profile data for subscribers
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
