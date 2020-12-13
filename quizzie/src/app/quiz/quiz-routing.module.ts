import { RouterModule, Routes } from '@angular/router';
import { CustomQuizComponent } from './custom-quiz/custom-quiz.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: QuizDetailsComponent,
  },
  {
    path: 'create',
    component: QuizCreateComponent,
  },
  {
    path: 'random',
    component: RandomQuizComponent,
  },
  {
    path: 'play/:id',
    component: CustomQuizComponent,
  },
];

export const QuizRoutingModule = RouterModule.forChild(routes);
