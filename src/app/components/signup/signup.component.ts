import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { Router } from '@angular/router';
import { IRegisterUser } from '../../datatypes/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user: IRegisterUser;
  form: FormGroup;
  constructor(
    private _apiService: ApiService,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.user = {
      fullName: '',
      Password: '',
      Email: '',
      phone: '',
    };
    this.form = this.builder.group({
      fullName: this.builder.control('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      Password: this.builder.control('', [
        Validators.required,
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ]),
    Email: this.builder.control('', [
        Validators.required,
        Validators.pattern(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
        ),
      ]),
      phone: this.builder.control('', [Validators.min(11)]),
    });
  }
  signUp() {
    this._apiService.Register(this.form.value as IRegisterUser).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('registration done');
          this.router.navigateByUrl('/login');
        }else{
          alert(res.message)
        }
      },
    });
  }
}
