import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { io } from 'socket.io-client';

// const socket: any = io('http://localhost:4000', {
//   path: '/notification/',
// });

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent {
  // notification: Number = 0;
  // notifications :any[]= [];
  // constructor(readonly authService: AuthService) {
  //   socket.on('connection', () => {

  //   });
  //   const params = {
  //     sender: sessionStorage.getItem('user_id')
  //   }
  //   socket.emit('joinNotifications', params, () => {
  //   });

  //   socket.on('receiveNotifications', (request: any) => {
  //     this.notifications.push(request);
  //     this.notification = this.notifications.length;
  //   })
  // }
}

// light(){}
// dark(){}
