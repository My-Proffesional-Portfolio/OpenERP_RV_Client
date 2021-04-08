import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyOfficeComponent } from './pages/my-office/my-office.component';
import { AuthenticationService } from './services/authentication.service';
debugger;
const routes: Routes = [
  // {
  // path: 'home',
  // component: HomeComponent,
  // canActivate: [
  //   AuthGuard
  //  ]
  // },
  // {
  //   path: 'clients',
  //   component: ClientsComponent,
  //   canActivate: [
  //     AuthGuard
  //    ]
  //   },
  //   {
  //     path: 'profile',
  //     component: MyOfficeComponent,
  //     canActivate: [
  //       AuthGuard
  //      ]
  //     },
      {
        path: 'login',
        component: LoginComponent,
        
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
    AuthGuard
  ]
})
export class AppRoutingModule { }
