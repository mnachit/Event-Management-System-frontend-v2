import { Component } from '@angular/core';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { User } from 'src/app/model/user';
import { UserEdit } from 'src/app/model/user-edit';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {
  constructor(private UserService: UserService,
    private authorizedGuardService: AuthorizedGuardService) { }
  email!: string;

  user: User | undefined;
  UserEdit: UserEdit | undefined;

  getUserByEmail(): void {
    this.UserService.getUserByEmail().subscribe(
      (data: { message: String, result: User }) => {
        console.log(data.result);
        this.user = data.result;
      }
    );
  }

  updateUser(): void {
    if (this.user) {
      this.UserService.updateUser(this.user!, this.authorizedGuardService.getIdFromToken()).subscribe(
        (data: { message: String, result: User, errors: string, errorMap: string[] }) => {
          console.log(data.result);
        },
        (error: { errors: string; errorMap: string }) => {
          console.log(error.errors);
        }
      );
    }
    
  }

  ngOnInit(): void {
    this.getUserByEmail();
  }

}
