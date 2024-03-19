import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser, IUpdateUser } from '../datatypes/user';
import { ApiResult } from '../datatypes/apiResult';
import { Observable } from 'rxjs';
import { ISetCourse } from '../datatypes/courses';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  originalPath = 'http://localhost:4000';
  constructor(private http: HttpClient) {}
  // Register
  Register(User: IRegisterUser) {
    return this.http.post<ApiResult<any>>(
      this.originalPath + '/user/register',
      User
    );
  }
  // Login
  Login(User: ILoginUser) {
    console.log(User);

    return this.http.post<ApiResult<any>>(
      this.originalPath + '/user/login',
      User
    );
  }

  // Get all users data
  GetAllUsers(page: number, pageSize: number) {
    return this.http.get<ApiResult<any>>(
      `${this.originalPath}/user?page=${page}&limit=${pageSize}`
    );
  }
  // Delete user
  DeleteUserById(id: string): Observable<any> {
    return this.http.delete(this.originalPath + '/user/delete/' + id);
  }
  // // Update user
  UpdateUserById(id: string, userData: IUpdateUser) {
    return this.http.patch<ApiResult<any>>(
      `${this.originalPath}/user/update/${id}`,
      userData
    );
  }

  // Get All Courses
  GetAllCourses(page: number, pageSize: number) {
    return this.http.get<ApiResult<any>>(
      `${this.originalPath}/course?page=${page}&limit=${pageSize}`
    );
  }
  // Delete course
  DeleteCourseById(id: string) {
    return this.http.delete(`${this.originalPath}/course/${id}`);
  }

  CourseGetCount() {
    return this.http.get<ApiResult<any>>(`${this.originalPath}/course/count`);
  }
  UserGetCount() {
    return this.http.get<ApiResult<any>>(`${this.originalPath}/user/count`);
  }
}
