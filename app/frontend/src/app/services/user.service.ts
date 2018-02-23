import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this
      .http
      .get<User>(`/api/users/` + id);
  }
}
