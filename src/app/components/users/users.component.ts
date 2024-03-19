import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { error } from 'console';
import { IGetAllUsers, IUpdateUser } from '../../datatypes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users: IGetAllUsers[] = [];

  /* =========== pagination=================== */
  currentPage: number = 1;
  pageSize: number = 5; // Number of items per page
  totalItems: number = 0;
  totalPagesArray: number[] = [];

  /*   ============ search box start===========     */
  searchText: any;
  /*   ============ search box end ===========     */

  /**Edit user Start */
  updatedUser: IUpdateUser;
  form: FormGroup;
  /**Edit user End */

  constructor(private _apiService: ApiService, private builder: FormBuilder) {
    this.getAllUsers();
    this.updatedUser = {
      _id: '',
      fullName: '',
      Email: '',
      phone: '',
      
    };
    this.form = this.builder.group({
      fullName: this.builder.control('', [
        Validators.required,
        Validators.minLength(7),
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

  // Get all
  getAllUsers(page: number = 1) {
    // this._apiService.GetAllUsers().subscribe(
    //   (res)=> {
    //     this.users = res.data;
    //   },
    //   err => console.error("Error in fetching users", err)
    // );
    this._apiService.GetAllUsers(page, this.pageSize).subscribe((res) => {
      this.users = res.data.Users;
      this.totalItems = res.data.page;
      console.log(res);
    });
  }

  confirmDeleteUser(id: string) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(id);
    }
  }
  // Delete
  deleteUser(id: string) {
    this._apiService.DeleteUserById(id).subscribe({
      next: (res) => {
        console.log('user Deleted successfully');
        this.getAllUsers();
      },
      error: (error) => {
        console.log('Error in deleting user: ', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllUsers(page);
  }
  update(id: string) {
    this._apiService
      .UpdateUserById(id, this.form.value as IUpdateUser)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.getAllUsers();
          } else {
            alert(res.message);
          }
        },
      });
  }
  edit(user: IUpdateUser) {
    this.updatedUser = user;
    console.log(this.updatedUser);
    this.form = this.builder.group({
      fullName: this.builder.control(this.updatedUser.fullName, [
        Validators.required,
        Validators.minLength(7),
      ]),
      Email: this.builder.control(this.updatedUser.Email, [
        Validators.required,
        Validators.pattern(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
        ),
      ]),
      phone: this.builder.control(this.updatedUser.phone, [Validators.min(11)]),
    });
  }
}
