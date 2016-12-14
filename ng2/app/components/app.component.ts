import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/app.component.html'
})
export class AppComponent { 
  username: string;
  loggedIn = false;
  noAccounts: boolean;


}
