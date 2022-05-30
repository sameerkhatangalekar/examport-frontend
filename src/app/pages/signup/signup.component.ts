import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
  private userService : UserService,private snack : MatSnackBar ) { }

  public user =
  {
    username: '',
    firstName:'',
    lastName:'',
    password:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }

  registerSubmit()
  {
    if(this.user.username=='' ||this.user.username== null)
    {
      this.snack.open("Username is required",'',
      {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'center'
      });
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data : any)=>{
        console.log(data);
        Swal.fire('Good job!',
        'User Registered Successfully with ID: '+ data.id,
        'success')
      },
      (error)=>{
        console.log(error);
        this.snack.open(error.error.text,'',
      {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'center'
      });

      }


    )
  }

}
