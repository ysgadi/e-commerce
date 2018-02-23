import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/article';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  articles: Article[];
  message = '';
  isError = false;
  modalRef: NgbModalRef;

  constructor(private cartService: CartService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this
      .cartService
      .getArticles()
      .subscribe(articles => this.articles = articles);
  }

  open(content) {
    if (this.articles.length > 0) {
      this.modalRef = this.modalService.open(content);
    }
  }

  onRemove(articleId: number) {
    this
      .cartService
      .removeArticle(articleId)
      .subscribe((res) => {
        this.articles = this.articles.filter(p => p.id !== articleId);
      }, err => {
          this.message = err.error.message;
          console.error(err);
      });
  }

  onValid() {
    this
      .cartService
      .valid()
      .subscribe((res) => {
        this.showSuccess('You successfully purchased the articles');
        this.articles = [];
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
