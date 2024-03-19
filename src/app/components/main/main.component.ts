import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  CourseCount: number = 0;
  UserCount: number = 0;
  userdata: any = null;
  coursedata: any = null;
  constructor(private apiSrev: ApiService) {
    this.apiSrev.UserGetCount().subscribe((res) => {
      this.UserCount = res.data;
      this.userdata = [
        {
          name: 'Current Users',
          value: this.UserCount,
        },
        {
          name: 'Rest Of Users',
          value: 100 - this.UserCount,
        },
      ];
      
    });
    this.apiSrev.CourseGetCount().subscribe((res) => {
      this.CourseCount = res.data;
      this.coursedata = [
        {
          name: 'Current Courses',
          value: this.CourseCount,
        },
        {
          name: 'Rest Of Courses',
          value: 100 - this.CourseCount,
        },
      ];
    });
  }
}
