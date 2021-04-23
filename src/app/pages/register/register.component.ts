import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpModels } from 'src/app/models/Register/SignupModels';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { SingupService } from 'src/app/services/Register/singup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router, private SignUpService: SingupService  ) { }
  processing : boolean =  false;
  errorLabel: string = null;

  registerViewLabels: any;
  newCompany: SignUpModels.NewCompanyOrganizationModel;
  selectedLanguage: string = "ES"

  ngOnInit(): void {
    this.newCompany = <SignUpModels.NewCompanyOrganizationModel>
    { fiscalIdentificationNumber: "XAXX010101000"};
    this.selectLanguage(this.selectedLanguage);
  }

  selectLanguage(language: string)
  {
    debugger;
    if (language == 'ES')
    {
      this.selectedLanguage = 'ES';
      this.registerViewLabels = {

        pageTitle : "Registro",
        userName : "Usuario",
        password: "Contraseña",
        companyName: "Nombre de la empresa",
        legalName: "Razón Social o nombre corporativo",
        email: "Correo electrónico",
        registerButton: "Registrarse",
        fiscalID: "Numero de identificación fiscal (RFC)",
        address : "Dirección",
        name: "Nombre completo titular de empresa",
        phone: "Teléfono"
    
      }
    }

    if (language == 'EN')
    {
      this.selectedLanguage = 'EN';
      this.registerViewLabels = {

        pageTitle : "Singup",
        userName : "User name",
        password: "Password",
        companyName: "Company Name",
        legalName: "Legal name or corporate office name",
        email: "E-mail",
        registerButton: "SingUp!",
        fiscalID: "Tax Id",
        address : "Address",
        name: "Company owner´s or account name",
        phone: "Phone"
    
      }
    }


  }

  register()
  {
    this.errorLabel = null;
    debugger;
    if (!this.newCompany.legalName || !this.newCompany.commercialName
      || !this.newCompany.fiscalIdentificationNumber || !this.newCompany.fiscalIdentificationNumber
      || !this.newCompany.userName ||  !this.newCompany.password 
      || !this.newCompany.email ||  !this.newCompany.contactName )
      {
        this.errorLabel = this.selectedLanguage == 'ES' ? "Llena todos los campos obligatorios":
        "Fill all mandatory fields"
        return;
      }

    this.processing = true;
    this.SignUpService.register(this.newCompany).subscribe((data: any) => {
      debugger;
      if (data.userToken)
        {
         this.login();
        }
        else
        {
          this.errorLabel = data.errorMessages[0];
          this.processing = false;
        }

    }, (errorEvent) => { 
        this.processing = false;
        this.errorLabel = errorEvent.error.errorMessages[0] + ". Error code: " + errorEvent.status;
    });
  }

  login() {
    debugger;
    this.authorizationService.login(this.newCompany.userName, this.newCompany.password).
    subscribe((data: any)=>{
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
}
