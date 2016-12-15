import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html'
})
export class AppComponent implements OnInit { 
  username: string;
  loggedIn = false;
  noAccounts: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
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
