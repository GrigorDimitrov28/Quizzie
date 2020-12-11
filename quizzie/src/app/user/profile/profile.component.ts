import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  qPlayed = 0;
  success = 0;
  qCreated = 0;
  bCreated = 0;
  points = 0;
  username = '';
  imgUrl = 'https://i.stack.imgur.com/l60Hf.png';
  constructor(
    private userService: AuthService
  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem('uId');
    this.userService.getInfo(id).subscribe({
      next: (d) => {
        console.log(d);
        this.qPlayed = d.qPlayed || 0;
        this.success = (d.answers.w / d.answers.a) * 100 || 0;
        this.qCreated = d.qCreated || 0;
        this.username = d.username || '';
        d.imgUrl ? this.imgUrl = d.imgUrl : this.imgUrl = 'https://i.stack.imgur.com/l60Hf.png';
        this.bCreated = d.bCreated || 0;
        this.points = d.points || 0;
      }
    })
  }

}
