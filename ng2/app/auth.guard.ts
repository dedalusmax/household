import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return Observable.of(true);
        }
        return this.authService.logIn();
    }
}
