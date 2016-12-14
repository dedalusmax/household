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
    if (this.authService.profile) {
      this.username = this.authService.profile.Username;
    } else {
      this.username = 'Not logged in';
    }
  }
}
