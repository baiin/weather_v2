import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class AuthService {
    constructor(private af: AngularFireAuth, private db: AngularFireDatabase, private http: HttpClient, private cookieService: CookieService) { }

    // determine if user is authenticated and logged in through firebase
    checkAuth()
    {
        return this.af.authState;
    }

    // login user using firebase authentication
    login(email, password)
    {
        return this.af.auth.signInWithEmailAndPassword(email, password);
    }

    register(email, password)
    {
        return this.af.auth.createUserWithEmailAndPassword(email, password);
    }

    logout()
    {
        return this.af.auth.signOut();
    }

    setCookie(uid){
        var d = new Date();
        var t = d.getTime() + 3600000;
        var expireTime = new Date(t);
  
        this.cookieService.set(uid, "true", expireTime);
    }

    getCookie(uid){
        this.cookieService.get(uid);
    }

    deleteCookie(){
        this.cookieService.deleteAll();
    }
}
