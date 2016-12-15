import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'angular2-cookie/core';
import { Profile } from '../model/profile';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html'
})
export class AppComponent implements OnInit { 
  username: string;
  loggedIn = false;
  noAccounts: boolean;

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {

    // read the credentials from cookie
    let profile: Profile = this.cookieService.getObject('profile') as Profile;
    if (profile) {
      // try to silently login
      this.authService.logIn(profile).subscribe((data) => {
        if (data.id) { // this is the indication of valid profile
          this.authService.profile.next(data); // inject profile data for subscribers
      }});
    }

    this.authService.profile.asObservable().subscribe((data) => {
        if (data.id) { // this is the indication of valid profile
          this.username = data.username;
          this.loggedIn = true;
        } else {
          this.username = 'Not logged in';
          this.loggedIn = false;
        } 
      }
    );
  }
}
