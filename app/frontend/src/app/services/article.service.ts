import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article, ArticleCategory} from '../models/article';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {
  }

  getArticle(id: string): Observable<Article> {
    return this
      .http
      .get<Article>(`/api/articles/` + id);
  }

  getArticles(): Observable<Article[]> {
    return this
      .http
      .get<Article[]>(`/api/articles`);
  }

  getAmazonArticles(search: string): Observable<AmazonResponse[]> {
    return this
    .http
    .post<AmazonResponse[]>('/api/articles/amazon', {keywords: search});
  }

  create(article: Article): Observable<Object> {
    return this
      .http
      .post<Object>('/api/articles', {
        name: article.name,
        description: article.description,
        price: article.price,
        category: ArticleCategory[article.category],
        quantity: article.quantity
      });
  }

  update(article: Article): Observable<Object> {
    return this
      .http
      .put<Object>('/api/articles/' + article.id, {
        name: article.name,
        description: article.description,
        price: article.price,
        category: ArticleCategory[article.category],
        quantity: article.quantity
      });
  }

  delete(idArticle: number): Observable<Object> {
    return this
      .http
      .delete<Object>('/api/articles/' + idArticle);
  }
}

export interface AmazonResponse {
  assinCode: string;
  url: string;
}
