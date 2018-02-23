import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Account} from '../../../models/account';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  account: Account = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.account = this.authService.getAccount();
  }
}
