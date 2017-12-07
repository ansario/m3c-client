import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http) {

  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      var body = {
        username:  credentials.username,
        password: credentials.password
      }

      let bodyString = JSON.stringify(body); // Stringify payload

      return this.http.post("http://api.ansario.com/v1/account/login", body, null);
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
      observer.complete();
    });
    }
  }



  public logout() {
    return Observable.create(observer => {
    observer.next(true);
    observer.complete();
  });
  }
}
