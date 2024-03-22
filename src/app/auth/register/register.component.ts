import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { LoginService } from 'src/app/service/auth/login.service';
import { AllertService } from 'src/app/service/dash/allert.service';
import { UserRegister } from './UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userRegister: UserRegister = new UserRegister();

  constructor(private loginService: LoginService, private router: Router, private AuthorizedGuardService: AuthorizedGuardService,
    private allert: AllertService) { }

  register(): void {
    this.loginService.register(this.userRegister).subscribe(
      (data: { message: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.router.navigate(['dashboard']);
      },
      (error: { message: string }) => {
        console.error(error.message);
        this.allert.showError("Registration was not successful", 2000);
      }
    );
  }

}
