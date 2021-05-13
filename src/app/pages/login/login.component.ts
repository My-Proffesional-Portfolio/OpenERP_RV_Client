import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Accounts/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router) { }
  userName: string;
  password: string;
  processing: boolean =  false;
  errorLabel: string = null;

  loginViewLabels:any;

  ngOnInit(): void {
    this.selectLanguage("ES");
  }

  login ()
  {

    if (!this.userName || !this.password)
      return;

    this.errorLabel = null;
    this.processing =  true;
    this.authorizationService.login(this.userName, this.password).
    subscribe((data: any)=> {
      debugger;
      if (data.token == null)
      {
        this.errorLabel = data.errorMessages[0];
      }
      else{
        //this.authorizationService.currentUser = data;
        localStorage.setItem("userData", JSON.stringify(data));
        
        this.router.navigate(['/']);
      }
      this.processing = false;

    },(errorEvent) => {
        debugger;
        this.errorLabel = errorEvent.error.errorMessages[0] + ". Error code: " + errorEvent.status;
        this.processing = false;
      });

  }

  selectLanguage(language: string)
  {
    debugger;
    if (language == 'ES')
    {

      this.loginViewLabels = {

        userName : "Usuario",
        password: "Contraseña",
        loginTitle : "Ingresar",
        hasAccount: "¿No tienes cuenta?",
        loginButton: "Entrar",
        register : "Regístrate",
    
      }
    }

    if (language == 'EN')
    {
      this.loginViewLabels = {

        userName : "User name",
        password: "Password",
        loginTitle : "Login",
        hasAccount: "Havn´t an account?",
        loginButton: "Get in!",
        register : "Sing Up"
      }
    }
  }

  goToSingUp()
  {
    this.router.navigate(['singup']);
  }
 

}
