import {User} from './user';

export interface Review extends User {
  Review: ReviewResponse;
}

interface ReviewResponse {
  comment: string;
  reviewerId: number;
  reviewedId: number;
}
