import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuizDetailsComponent,
    QuizCreateComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuizModule { }
