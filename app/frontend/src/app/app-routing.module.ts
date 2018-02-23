import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import { AccountUpdateComponent } from './components/account/update/account-update.component';
import { AccountDetailsComponent } from './components/account/details/account-details.component';
import { UserDetailsComponent } from './components/user/user-details.component';
import { ArticleCreateComponent } from './components/article/create/article-create.component';
import { CartComponent } from './components/cart/cart.component';
import { ArticleDetailsComponent } from './components/article/details/article-details.component';
import { AccountDeleteComponent } from './components/account/delete/account-delete.component';
import { ArticleUpdateComponent } from './components/article/update/article-update.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account/update', component: AccountUpdateComponent, canActivate: [AuthGuard]},
  {path: 'account/details', component: AccountDetailsComponent, canActivate: [AuthGuard]},
  {path: 'account/delete', component: AccountDeleteComponent, canActivate: [AuthGuard]},
  {path: 'article/create', component: ArticleCreateComponent, canActivate: [AuthGuard]},
  {path: 'article/:id/update', component: ArticleUpdateComponent, canActivate: [AuthGuard]},
  {path: 'article/:id', component: ArticleDetailsComponent},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
