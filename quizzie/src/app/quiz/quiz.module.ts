import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../core/quiz.service';
import { RandomQuizComponent } from './random-quiz/random-quiz.component';
import { CustomQuizComponent } from './custom-quiz/custom-quiz.component';

@NgModule({
  declarations: [
    QuizDetailsComponent,
    QuizCreateComponent,
    RandomQuizComponent,
    CustomQuizComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, ReactiveFormsModule],
  providers: [QuizService],
})
export class QuizModule {}
