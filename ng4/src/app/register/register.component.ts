import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile';
import { Currency } from '../shared/models/currency';
import { Language } from '../shared/models/language';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  model = new Profile();
  showError: boolean;
  error: string;

  // choosers:
  currencies: Array<Currency> = [];
  currency: Currency;
  languages: Array<Language> = [];
  language: Language;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // filling up the lists:

    this.currencies.push(new Currency('HRK', 'Hrvatska kuna (Kn)'));
    this.currencies.push(new Currency('EUR', 'Euro (€)'));
    this.currencies.push(new Currency('USD', 'US Dollar ($)'));
    this.currency = this.currencies[0];

    this.languages.push(new Language('HR', 'Hrvatski'));
    this.languages.push(new Language('EN', 'English'));
    this.languages.push(new Language('DE', 'Deutsch'));
    this.language = this.languages[0];
  }

  register() {
    //first check whether the profile with that username and password exists
    this.authService.checkProfile(this.model).subscribe((data) => {
      if (data && data.id) {
        this.error = 'Username with this password already registered!';
        this.showError = true;
      } else {

        this.model.createdDate = new Date(Date.now());
        this.model.baseCurrency = this.currency.code;
        this.model.language = this.language.code;

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
