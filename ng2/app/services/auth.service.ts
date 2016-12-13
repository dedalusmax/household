import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Profile } from '../model/profile';
import { Observable } from 'rxjs/Observable';

/** This service uses base HTTP service to make calls to the Users Web API. */
@Injectable()
export class AuthService extends HttpService {

    profile: Profile; // a reference to the shared user info object retrieved from the Users web API

    /** The class is constructed with the specific URL to the web API and Angular HTTP service. */
    constructor(http: Http) { super('profile', http); }

    /** This method gets the user info. */
    getProfile(): Promise<Profile> {
        return this.getJson<Profile>();
    }

    //#region Auth guard 

    /** This method returns true if the user has been already authenticated. */
    isLoggedIn(): boolean {
        return this.profile != null;
    }

    /** This method get the user data and therefore marks the authentication successful. */
    logIn(): Observable<boolean> {
        return this.simpleGetJson()
            .map((res) => {
                this.profile = res.json();
                return (res.json()._Id !== undefined);
            });
    }

    //#endregion
}
