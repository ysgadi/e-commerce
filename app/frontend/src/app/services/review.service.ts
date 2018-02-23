import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Review } from '../models/review';

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) {
  }

  getReceived(idUser: string): Observable<Review[]> {
    return this
    .http
    .get<Review[]>('/api/reviews/' + idUser + '/received');
  }

  addReviewToUser(idUser: number, comment: string): Observable<Object> {
    return this
      .http
      .post<Object>('/api/reviews/' + idUser, {
        comment: comment
      });
  }
}
