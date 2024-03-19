import { Component, OnInit } from '@angular/core';
import { ISetCourse } from '../../datatypes/courses';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-course-List',
  templateUrl: './course-List.component.html',
  styleUrls: ['./course-List.component.css'],
})
export class CourseListComponent {
  courses: ISetCourse[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of items per page
  totalItems: number = 0;
  totalPagesArray: number[] = [];


  
/*   ============ search box start===========     */
searchText:any
/*   ============ search box end ===========     */
  constructor(private _apiService: ApiService) {
    this.getAllCourses();
  }
  // Get Course List
  getAllCourses(page: number = 1) {
    this._apiService.GetAllCourses(page, this.pageSize).subscribe({
      next: (res) => {
        this.courses = res.data.Course;
        this.totalItems = res.data.Total;
        console.log(res.data);
      },
      error: (error) => {
        console.log('Cannot get Courses', error);
      },
    });
  }
  deleteCourse(id: string) {
    this._apiService.DeleteCourseById(id).subscribe({
      next: (res) => {
        console.log('Course Deleted successfully');
        this.getAllCourses();
      },
      error: (error) => {
        console.log('Cannot delete course', error);
      },
    });
  }
  confirmDeleting(id: string) {
    if (window.confirm('Are you sure you want to delete this course?')) {
      this.deleteCourse(id);
    }
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllCourses(page);
  }
}
