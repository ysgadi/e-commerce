import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  message = '';
  isError = false;
  account: Account = null;

  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.account = this.authService.getAccount();
  }

  onUpdate() {
    this.authService
      .update(this.account)
      .subscribe((res) => {
        this.showSuccess('Your Account has been updated!');
        this.authService.authenticate(res.token);
        setTimeout(() => this.router.navigate([`/account/details`]), 1000);
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

interface ILoginResponse {
  token: string;
}
