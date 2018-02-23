import { Component, OnInit, Input} from '@angular/core';
import {Article} from '../../models/article';
import {ArticleService} from '../../services/article.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Article[];
  model: any;
  articlesEcommerce= [];
  articlesAmazon= [];
  searchAmazon: string;
  rowList = [];
  colCount = 2;
  articleNotFound= false;
  SearchArticle= false;

  constructor(private articleService: ArticleService,
  private http: HttpClient) {}

  ngOnInit() {
    this
      .articleService
      .getArticles()
      .subscribe(articles => {this.articles = articles;
        articles.forEach(article => {
        this.articlesEcommerce.push(article);
       });
       for (let i = 0; i < this.articlesEcommerce.length; i = i + 2) {
        const element = this.articlesEcommerce[i];
        const row = [];
        while (row.length < this.colCount) {
            const value = this.articlesEcommerce[i + row.length];
            if (!value) {
                break;
            }
            row.push(value);
           }
        this.rowList.push(row);
     }
      });
  }
  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term === '' ? [] : this.articlesEcommerce.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    formatter = (x: {name: string}) => x.name;
      onSearch() {
        if (typeof this.model === 'string') {
          this.articleNotFound = true;
          this
          .http
          .post<AmazonResponse[]>(`/api/articles/amazon`, {keywords: this.model}).subscribe(
            data => {
            this.articlesAmazon = data;
            this.searchAmazon = this.model;
            }
          );
        } else {
          this.articleNotFound = false;
          this.articlesEcommerce.forEach(article => {
            if (article.id === this.model.id) {
              this.SearchArticle = true;
            }
          });
        }
      }
      onKey(event: any) {
       if (this.model === '') {
        this.articleNotFound = false;
       }
      }
    }
    export interface AmazonResponse {
      assinCode: string;
      url: string;
    }


