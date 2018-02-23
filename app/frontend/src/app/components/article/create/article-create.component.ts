import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Article, ArticleCategory} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent  implements OnInit {
  message = '';
  isError = false;
  article: Article = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: ArticleCategory.AUTRE,
    quantity: 1,
    ownerId: 0,
    Cart: null,
  };

  constructor(private router: Router,
    private articleService: ArticleService) {
  }

  ngOnInit() {
  }

  get allCategories(): string[] {
    return Object.keys(ArticleCategory);
  }

  isCategory(cat) {
    console.log(cat);
  }

  onCreate() {
    this.articleService
      .create(this.article)
      .subscribe((res) => {
        this.showSuccess('Your Article has been created!');
        setTimeout(() => this.router.navigate(['/']), 1000);
      }, err => {
          this.showError(err.error.message);
          console.error(err);
      });
  }

  private showError(message: string): void {
    this.message = message;
    this.isError = true;
  }

  private showSuccess(message: string): void {
    this.message = message;
    this.isError = false;
  }
}
