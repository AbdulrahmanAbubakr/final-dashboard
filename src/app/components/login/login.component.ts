import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ILoginUser, IStoredUser } from '../../datatypes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: ILoginUser;
  form: FormGroup;
  constructor(
    private userApiService: ApiService,
    private builder: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.user = { Email: '', Password: '' };
    this.form = this.builder.group({
      Email: this.builder.control('', [
        Validators.required,
        Validators.pattern(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
        ),
      ]),
      Password: this.builder.control('', [
        Validators.required,
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ]),
    });
  }
  login() {
    // console.log(this.form.value);
    this.userApiService.Login(this.form.value).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res)
          let user: IStoredUser = {
            token: res.data.token,
            Email: res.data.Email,
            name: res.data.name,
            phone: res.data.phoneNumber,
          };
          this._authService.setToStorage(user);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(res.message);
        }
      },
    });
  }
}
