import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserEdit } from 'src/app/model/user-edit';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {
  constructor(private UserService: UserService) { }
  email!: string;

  user: User | undefined;
  UserEdit: UserEdit | undefined;

  getUserByEmail(): void {
    this.UserService.getUserByEmail().subscribe(
      (data : {message: String, result: User}) =>{
        console.log(data.result);
        this.user = data.result;
      }
    );
  }

  updateUser(): void {
    if (this.UserEdit) {
      this.UserService.updateUser(this.UserEdit).subscribe(
        (data: {message: String, result: User}) => {
          console.log(data.result);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getUserByEmail();
  }
  
}
