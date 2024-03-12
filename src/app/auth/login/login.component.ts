import { Component } from '@angular/core';
import { LoginService } from '../../service/auth/login.service';
import { UserLogin } from './UserLogin';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userlogin: UserLogin = new UserLogin();

  showError(): void {
    Swal.fire({
      title: 'Error!',
      text: 'Email or password is incorrect',
      icon: 'error',
      showConfirmButton: false, // Remove the confirm button
      timer: 2000 // Set the timer to 1 second (1000 milliseconds)
    });
  }


  showSuccess(text: string): void {
    Swal.fire({
      title: 'Success!', // Change title to 'Success!'
      text: text, // Change text to indicate success
      icon: 'success', // Change icon to 'success'
      showConfirmButton: false, // Remove the confirm button
      timer: 1000 // Set the timer to 1 second (1000 milliseconds)
    });
  }

  constructor(private loginService: LoginService, private router: Router, private AuthorizedGuardService: AuthorizedGuardService) { }

  login(): void {
    this.loginService.login(this.userlogin).subscribe(
      (data: { message: string }) => {
        // Call showError method
        this.showSuccess(data.message);
        this.router.navigate(['dashboard']);
        console.log(data); // Handle successful login response
      },
      (error: { message: string }) => {
        console.error(error.message); // Handle error
        this.showError();
      }
    );
  }

}
