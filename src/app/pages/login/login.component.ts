import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.nullValidator]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  // loginData = {
  //   username: '',
  //   password: '',
  // };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loginSubmit() {
    // if (
    //   this.loginData.username.trim() == '' ||
    //   this.loginData.username == null
    // ) {
    //   this.snack.open('Username is required', '', {
    //     duration: 3000,
    //   });
    //   return;
    // }
    // if (
    //   this.loginData.password.trim() == '' ||
    //   this.loginData.password == null
    // ) {
    //   this.snack.open('Password is required', '', {
    //     duration: 3000,
    //   });
    //   return;
    // }
    this.login.generateToken(this.loginForm.value).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect to ADMIN: admin-dashboard
          //redirect to ADMIN: normal-dashboard
          this.dashBoardRedirection(this.login.getUserRole());
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('Invalid Details', '', {
          duration: 3000,
        });
      }
    );
  }

  dashBoardRedirection(userRole: string) {
    //redirection method
    if (userRole == 'Admin') {
     this.router.navigate(['admin']);
     this.login.loginStatusSubject.next(true);

    } else if (userRole == 'Student') {
      this.router.navigate(['user-dashboard']);
      this.login.loginStatusSubject.next(true);
    } else {
      this.login.logout();
    }
  }

  get username()
  {
    return this.loginForm.get('username')
  }
  get password()
  {
    return this.loginForm.get('password')
  }
}
