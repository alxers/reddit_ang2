import { Injectable } from '@angular/core';
import { Http, Headers, Response, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

    login(login: string, password: string): Observable<boolean> {
      let headers = new Headers({ 'Content-Type': 'application/vnd.api+json', 'Accept': 'application/vnd.api+json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://localhost:3000/api/v1/tokens', { user: { login: login, password: password } }, options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().token;

          // set token property
          this.token = token;

          // store login and jwt token in local storage to keep user logged in between page refreshes
          window.localStorage.setItem('currentUser', JSON.stringify({ login: login, token: token }));

        }).catch(this.handleError);
    }

    logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      window.localStorage.removeItem('currentUser');
    }

    private handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        errMsg = 'Login or password incorrect';
      } else {
        errMsg = error.message ? error.message : error.toString();
      }

      return Observable.throw(errMsg);
    }
}
