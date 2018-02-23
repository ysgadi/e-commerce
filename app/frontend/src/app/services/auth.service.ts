import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {Observable} from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  authenticate(jwtToken: string): void {
    localStorage.setItem('access_token', jwtToken);
  }

  getAccount(): Account {
    const token = localStorage.getItem('access_token');
    return ((token !== null) ? (jwt_decode(token)['data'] as Account) : null);
  }

  update(account: Account): Observable<ILoginResponse> {
    return this
      .http
      .put<ILoginResponse>(`/api/accounts/`, {
        email: account.email,
        pseudo: account.pseudo,
        firstname: account.firstName,
        lastname: account.lastName,
        address: account.address,
        IBAN: account.IBAN
      });
  }

  delete(): Observable<Object> {
    return this
      .http
      .delete<Object>('/api/accounts');
  }

  register(email: string, password: string, pseudo: string,
    firstname: string, lastname: string, address: string, IBAN: string)
    : Observable<Account> {
      return this
        .http
        .post<Account>('/api/register', {
          email: email,
          password: password,
          pseudo: pseudo,
          firstname: firstname,
          lastname: lastname,
          address: address,
          IBAN: IBAN
        });
  }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this
      .http
      .post<ILoginResponse>('/api/login', {email: email, password: password});
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}

interface ILoginResponse {
  token: string;
}
