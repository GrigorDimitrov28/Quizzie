import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
    {
        path: 'landing',
        component: ForumHomeComponent
    },
    {
        path: 'create',
        component: CreatePostComponent
    },
    {
        path: 'details/:id',
        component: PostDetailsComponent
    }
];

export const ForumRoutingModule = RouterModule.forChild(routes);