import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ClientService } from 'src/app/services/Clients/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientService, private router : Router, private authService: AuthenticationService) { }

  clientsData: any;

  ngOnInit(): void {

    this.clientService.getClients().
    subscribe((data: any)=> {
      debugger;
      this.clientsData = data;

    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        if (errorEvent.status == 401)
        {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });

  }

}
