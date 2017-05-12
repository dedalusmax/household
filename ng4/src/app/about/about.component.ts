import { Component } from '@angular/core';

@Component({
  selector: 'about',
  template: `
    <div class="row">
        <div class="offset-md-4 col-md-1">
            <clr-icon shape="home" size="120"></clr-icon>
        </div>
        <div class="col-md-4">
            <h1>Household</h1>
            An application for managing household accounts.
        </div>
    </div>
  `
})
export class AboutComponent { 

}