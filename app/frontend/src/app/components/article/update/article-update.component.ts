import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Article, ArticleCategory} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  message = '';
  isError = false;
  article: Article = null;

  constructor(private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.articleService
    .getArticle(this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(res => {
      this.article = res;
    });
  }

  get allCategories(): string[] {
    return Object.keys(ArticleCategory);
  }

  onUpdate() {
    this.articleService
      .update(this.article)
      .subscribe((res) => {
        this.showSuccess('Your Article has been updated!');
        setTimeout(() => this.router.navigate(['/article/' + this.article.id]), 1000);
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

