import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import {RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ArticleComponent } from './components/article/article.component';
import {ArticleService} from './services/article.service';
import { AccountUpdateComponent } from './components/account/update/account-update.component';
import { AccountDetailsComponent } from './components/account/details/account-details.component';
import { UserDetailsComponent } from './components/user/user-details.component';
import { UserService } from './services/user.service';
import { ArticleCreateComponent } from './components/article/create/article-create.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { ArticleDetailsComponent } from './components/article/details/article-details.component';
import { AccountDeleteComponent } from './components/account/delete/account-delete.component';
import { ArticleUpdateComponent } from './components/article/update/article-update.component';
import { ReviewService } from './services/review.service';
import { ReviewReceivedComponent } from './components/review/received/review-received.component';

export function getTokenFromLocalStorage() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ArticleComponent,
    AccountUpdateComponent,
    AccountDetailsComponent,
    UserDetailsComponent,
    ArticleCreateComponent,
    ArticleDetailsComponent,
    CartComponent,
    AccountDeleteComponent,
    ArticleUpdateComponent,
    ReviewReceivedComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getTokenFromLocalStorage
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ArticleService,
    CartService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
