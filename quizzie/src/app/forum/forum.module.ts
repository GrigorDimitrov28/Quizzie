import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumRoutingModule } from './forum-routing.module';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumService } from '../core/forum.service';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [ForumHomeComponent, CreatePostComponent, PostDetailsComponent],
  imports: [CommonModule, ForumRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [ForumService],
})
export class ForumModule {}
