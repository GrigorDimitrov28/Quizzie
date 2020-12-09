import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'HOME'
        }
      },
      {
        path: 'about',
        pathMatch: 'full',
        component: AboutComponent
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'quiz',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          title: '404'
        }
      }
    ]
  },

];

export const AppRoutingModule = RouterModule.forRoot(routes);
