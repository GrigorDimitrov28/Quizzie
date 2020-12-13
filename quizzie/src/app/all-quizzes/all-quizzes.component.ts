import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { QuizService } from '../core/quiz.service';

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) { }

  isLogged$ = this.authService.isLogged$;
  quizzes = [];

  ngOnInit(): void {
    this.quizService.getAll().subscribe({
      next: (d) => {
        this.quizzes = d;
        console.log(d);
      }
    })
  }

}
