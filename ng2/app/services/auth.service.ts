import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Profile } from '../model/profile';
import { Observable } from 'rxjs/Observable';

/** This service uses base HTTP service to make calls to the Users Web API. */
@Injectable()
export class AuthService extends HttpService {

    profile: Profile; // a reference to the profile retrieved from the web API

    /** The class is constructed with the specific URL to the web API and Angular HTTP service. */
    constructor(http: Http) { super('profile', http); }

    //#region Auth guard 

    /** This method returns true if the user has been already authenticated. */
    isLoggedIn(): boolean {
        return this.profile != null;
    }

    /** This method get the user data and therefore marks the authentication successful. */
    logIn(credentials: Profile) {
        return this.postJson<Profile>(credentials, null, 'login');
    }

    logout() {
        // remove user from the cache to log user out
        this.profile = null;
    }

    //#endregion
}
