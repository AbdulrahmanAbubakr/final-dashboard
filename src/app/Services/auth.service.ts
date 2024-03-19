import { Injectable } from '@angular/core';
import { IStoredUser } from '../datatypes/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: BehaviorSubject<IStoredUser | null>;
  constructor(private router: Router) {
    this.userSubject = new BehaviorSubject<IStoredUser | null>(
      this.getFromStorage()
    );
  }
  setToStorage(data: IStoredUser) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  getFromStorage(): IStoredUser | null {
    let storage = localStorage.getItem('user');
    if (storage == null || storage == '') {
      return null;
    } else {
      return JSON.parse(storage) as IStoredUser;
    }
  }
  logOut(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/user/login');
  }
}
