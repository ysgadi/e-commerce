import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Review } from '../../../models/review';
import { UserService } from './../../../services/user.service';
import { ReviewService } from './../../../services/review.service';

@Component({
  selector: 'app-review-received',
  templateUrl: './review-received.component.html',
  styleUrls: ['./review-received.component.scss']
})
export class ReviewReceivedComponent implements OnInit {
  receivedReviews: Review[];

  constructor(private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.reviewService
      .getReceived(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.receivedReviews = res;
      });
  }

}
