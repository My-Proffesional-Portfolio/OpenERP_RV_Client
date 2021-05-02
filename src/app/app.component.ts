import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { ClientsComponent } from './pages/sales/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { MyOfficeComponent } from './pages/my-office/my-office.component';
import { AuthenticationService } from './services/Authentication/authentication.service';
import { SalesIndexComponent } from './pages/sales/sales-index/sales-index.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openERP';
    isExpanded = false;
    links: Array<{ text: string, path: string }> = [];

  constructor(private router: Router, public authService: AuthenticationService){}


  ngOnInit()
  {

    this.router.config.push(
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SalesIndexComponent, canActivate: [AuthGuard] },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: MyOfficeComponent, canActivate: [AuthGuard] })
  
    this.links.push(
      { text: "Principal", path: "" },
      { text: "Ventas", path: "sales" },
      { text: "Perfil de empresa", path: "profile" },
      )
      
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  loguot ()
  {

    this.authService.logout();
    this.router.navigate(['/login']);

  }

 

}
