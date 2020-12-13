import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLogged$ = this.authService.isLogged$;
  currentUser$ = this.authService.currentUser$;
  forumPosts = [];
  quizzes = [];
  qCount = 0;
  uCount = 0;
  fCount = 0;
  leaderboard = [];

  url: string;

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {
    authService.authenticate();
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.url = e.url;
      });
  }

  ngOnInit() {
    this.authService.getHomeInfo().subscribe({
      next: (d) => {
        this.forumPosts = d.featuredForum;
        this.qCount = d.qCount;
        this.uCount = d.uCount;
        this.fCount = d.fCount;
        this.quizzes = d.featuredQuizzes;
        this.leaderboard = d.leaderboard;
        for(let item of this.leaderboard){
          if(item.imgUrl == '') item.imgUrl = 'https://i.stack.imgur.com/l60Hf.png';
        }

        for(let item of this.quizzes){
          item.imgUrl = 'https://kids.nationalgeographic.com/content/dam/kidsea/kids-core-objects/backgrounds/1900x1068_herolead_quiz.adapt.1900.1.jpg';
        }
        console.log(d);
      },
    });
  }

}
