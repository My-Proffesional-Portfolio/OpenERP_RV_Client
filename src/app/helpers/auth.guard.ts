import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

import {AuthenticationService } from '../services/Accounts/Authentication/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{

    constructor(private router: Router, private authenticationService: AuthenticationService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const currentUser = this.authenticationService.getUserData();
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    
}