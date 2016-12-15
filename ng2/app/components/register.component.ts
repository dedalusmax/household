import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Profile } from '../model/profile';

@Component({
  selector: 'register',
  templateUrl: 'app/templates/register.component.html'
})
export class RegisterComponent { 
  model = new Profile();
  showError: boolean;
  error: string;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    //first check whether the profile with that username and password exists
    this.authService.checkProfile(this.model).subscribe((data) => { 
      if (data && data.id) {
        this.error = 'Username with this password already registered!';
        this.showError = true;
      } else {
        this.authService.register(this.model).subscribe((nothing) => {
            this.authService.profile.next(this.model); // inject profile data for subscribers
            this.router.navigate(['/']);
         },
          error => {
            this.error = 'Profile cannot be registered: ' + error.message;
            this.showError = true;
          });
      }
    });
  }
}
