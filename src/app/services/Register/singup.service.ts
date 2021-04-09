import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModels } from 'src/app/models/Register/SignupModels';
import { ServerEnvironment } from '../serverEnvironments';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private http: HttpClient) { }

  register (newSignUp : SignUpModels.NewCompanyOrganizationModel)
  {
    var body =  newSignUp;
    return this.http.post(ServerEnvironment.baseURL + "CompanyOrganization", body);

  }

}
