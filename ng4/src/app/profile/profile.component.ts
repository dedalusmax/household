import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile';
import { Currency } from '../shared/models/currency';
import { Language } from '../shared/models/language';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  model = new Profile();
  updated = false;
  error: string = null;

  //password = '';
  //confirmPassword = '';

  // choosers:
  currencies: Array<Currency> = [];
  currency: Currency;
  languages: Array<Language> = [];
  language: Language;

  constructor (private authService: AuthService) {}

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

    this.authService.getProfile(this.authService.profile.value.id).then((data) => {
      this.model = data;

      let currency = this.currencies.find((c) => c.code === data.baseCurrency);
      if (currency) {
          this.currency = currency;
      }

      let language = this.languages.find((l) => l.code === data.language);
      if (language) {
          this.language = language;
      }
    });
  }

  change() {
    this.error = null;
    this.updated = false;

    this.model.baseCurrency = this.currency.code;
    this.model.language = this.language.code;

    this.authService.changeProfile(this.model).subscribe((nothing) => {
      this.authService.profile.next(this.model); // inject profile data for subscribers
      this.updated = true;
    },
      error => {
        this.error = 'Profile cannot be updated: ' + error.message;
      });
  }
}
