import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Profile } from '../models/profile';
import { BehaviorSubject } from 'rxjs/Rx';
import { AppSettings } from '../models/app-settings';

/** This service uses base HTTP service to make calls to the Users Web API. */
@Injectable()
export class AuthService extends HttpService {

    profile = new BehaviorSubject<Profile>(null); // a reference to the profile retrieved from the web API

    /** The class is constructed with the specific URL to the web API and Angular HTTP service. */
    constructor(private appSetting: AppSettings, http: Http) {
        super(appSetting.apiEndpoint + 'profile', http);
        this.profile.next(new Profile()); // clear profile
    }

    //#region Auth guard

    /** This method returns true if the user has been already authenticated. */
    isLoggedIn(): boolean {
        return this.profile.value.id != null;
    }

    /** This method get the user data and therefore marks the authentication successful. */
    logIn(credentials: Profile) {
        return this.postJson<Profile>(credentials, null, 'login');
    }

    logout() {
        // remove user from the cache to log user out
        this.profile.next(new Profile()); // clear profile
    }

    //#endregion

    //#region registration

    checkProfile(credentials: Profile) {
        return this.postJson<Profile>(credentials, null, 'login');
    }

    register(suggestion: Profile) {
        return this.postJson<Profile>(suggestion, null, 'register');
    }

    //#endregion

    //#region profile management

    getProfile(id: string) {
        return this.getJson<Profile>(['id=' + id], null, 'get');
    }

    changeProfile(profile: Profile) {
        return this.postJson<Profile>(profile, null, 'change');
    }

    //#endregion
}
