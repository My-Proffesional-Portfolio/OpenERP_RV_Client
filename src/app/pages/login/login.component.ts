import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router) { }
  userName: string;
  password: string;

  loginViewLabels: any = {

    userName : "Usuario",
    password: "Contraseña",
    loginTitle : "Ingresar",
    hasAccount: "¿No tienes cuenta?",
    loginButton: "Entrar"

  }

  ngOnInit(): void {
  }

  login ()
  {

    this.authorizationService.login(this.userName, this.password).
    subscribe((data: any)=> {
      debugger;
     
      if (data.token == null)
      {

      }
      else{
        this.authorizationService.currentUser = data;
        localStorage.setItem("userData", JSON.stringify(data));

        this.router.navigate(['/']);
      }

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
        register : "Regístrate"
    
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

 

}
