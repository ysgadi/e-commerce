import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Router, ActivatedRoute} from '@angular/router';
import { UserService } from './../../services/user.service';
import { ReviewService } from './../../services/review.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User = null;
  comment= '';
  message = '';
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.userService
      .getUser(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.user = res;
      });
  }

  onSubmitReview() {
    this.reviewService
      .addReviewToUser(this.user.id, this.comment)
      .subscribe((res) => {
        this.message = 'review submitted';
        this.comment = '';
        setTimeout(() => this.message = '', 1000);
      }, err => {
          this.message = err.error.message;
          console.error(err);
      });
  }
}
