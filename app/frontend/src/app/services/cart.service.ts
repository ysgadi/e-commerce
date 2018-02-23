import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/article';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this
      .http
      .get<Article[]>(`/api/carts`);
  }

  addArticleToCart(idArticle: number, quantity: number): Observable<Object> {
    return this
      .http
      .post<Object>('/api/carts/' + idArticle, {
        quantity: quantity
      });
  }

  removeArticle(idArticle: number) {
    return this
      .http
      .delete<Object>('/api/carts/' + idArticle);
  }

  valid(): Observable<Object> {
    return this
      .http
      .get<Object>(`/api/carts/valid`);
  }
}
