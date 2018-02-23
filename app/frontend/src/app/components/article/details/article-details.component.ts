import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Article} from '../../../models/article';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article = null;
  quantity = 1;
  isOwner = false;
  message = '';
  constructor(private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.articleService
      .getArticle(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.article = res;
        if (this.authService.getAccount() != null
          && this.authService.getAccount().id === this.article.ownerId) {
          this.isOwner = true;
        }
      });
  }

  onAddToCart() {
    this.cartService
      .addArticleToCart(this.article.id, this.quantity)
      .subscribe((res) => {
        setTimeout(() => this.router.navigate(['/cart']), 1000);
      }, err => {
          this.message = err.error.message;
          console.error(err);
      });
  }

  onDelete() {
    this.articleService
      .delete(this.article.id)
      .subscribe((res) => {
        setTimeout(() => this.router.navigate(['/home']), 1000);
      }, err => {
          this.message = err.error.message;
          console.error(err);
      });
  }
}
