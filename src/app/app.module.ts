import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { AuthenticationService } from './services/Accounts/Authentication/authentication.service';
import { HomeComponent } from './pages/home/home.component';
import { MyOfficeComponent } from './pages/my-office/my-office.component';
import { ClientsComponent } from './pages/sales/clients/clients.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalContentComponent } from './components/client-modal-content/client-modal-content.component';
import { SalesIndexComponent } from './pages/sales/sales-index/sales-index.component';
import { ProductsComponent } from './pages/sales/products/products.component';
import { LoadComponent } from './pages/purchases/Expenses/load/load.component';
import { ExpenseListComponent } from './pages/purchases/Expenses/expense-list/expense-list.component';
import { PurchasesIndexComponent } from './pages/purchases/purchases-index/purchases-index.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyOfficeComponent, 
    SalesIndexComponent,
    ProductsComponent,
    ClientsComponent, 
    RegisterComponent, 
    ClientModalContentComponent, 
    LoadComponent, 
    ExpenseListComponent, PurchasesIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    GoogleChartsModule
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
