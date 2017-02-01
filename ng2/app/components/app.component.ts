import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, Event } from '@angular/router';
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
  location;

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {

    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: Event) => {
        this.location = event.url;
      });

    // read the credentials from cookie
    let cookie: Profile = this.cookieService.getObject('profile') as Profile;

    if (cookie && !this.authService.isLoggedIn()) {
      // try to silently login
      this.authService.logIn(cookie).subscribe((data) => {
        if (data) { // this is the indication of valid profile
          this.authService.profile.next(data); // inject profile data for subscribers
        }
      });
    }

    this.authService.profile.asObservable().subscribe((data) => {
        if (data && data.id) { // this is the indication of valid profile
          this.currentUser = data.displayName;
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
