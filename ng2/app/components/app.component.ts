import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'angular2-cookie/core';
import { Profile } from '../model/profile';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html'
})
export class AppComponent implements OnInit { 
  currentUser: string;
  loggedIn = false;
  noAccounts: boolean;

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {

    // read the credentials from cookie
    let cookie: Profile = this.cookieService.getObject('profile') as Profile;

    if (cookie && !this.authService.isLoggedIn()) {
      // try to silently login
      this.authService.logIn(cookie).subscribe((data) => {
        if (data.id) { // this is the indication of valid profile
          this.authService.profile.next(data); // inject profile data for subscribers
        }
      });
    }

    this.authService.profile.asObservable().subscribe((data) => {
        if (data.id) { // this is the indication of valid profile
          this.currentUser = data.username;
          this.loggedIn = true;
          this.noAccounts = true;
        } else {
          this.currentUser = 'Not logged in';
          this.loggedIn = false;
        } 
      }
    );
  }
}
