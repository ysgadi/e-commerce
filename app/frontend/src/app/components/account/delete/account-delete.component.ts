import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Account} from '../../../models/account';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  account: Account = null;
  message = '';
  private modalRef: NgbModalRef;

  constructor(private router: Router,
    private authService: AuthService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.account = this.authService.getAccount();
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  onDelete() {
    this
      .authService
      .delete()
      .subscribe((res) => {
        this.authService.logout();
        setTimeout(() => this.router.navigate(['/home']), 500);
      }, err => {
          this.message = err.error.message;
          console.error(err);
      });
  }
}

