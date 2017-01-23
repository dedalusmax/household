import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Profile } from '../model/profile';

@Component({
  selector: 'profile',
  templateUrl: 'app/templates/profile.component.html'
})
export class ProfileComponent implements OnInit { 
  model = new Profile();

  constructor (private authService: AuthService) {}

  ngOnInit() {
    
  }
}
