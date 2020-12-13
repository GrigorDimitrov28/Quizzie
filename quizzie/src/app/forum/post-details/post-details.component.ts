import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/core/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  id = '';
  uId = localStorage.getItem('uId');
  post = {
    title: '',
    content: '',
    comments: [],
  };

  content = '';

  ed: FormGroup;
  inEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.forumService.getOne(this.id).subscribe({
      next: (d) => {
        console.log(d);
        this.post.title = d.title;
        this.post.content = d.content;
        this.post.comments = d.comments;
        console.log(this.post);
      },
    });
  }

  del(): void {
    this.forumService.deleteOne({ uId: this.uId }, this.id).subscribe({
      next: (d) => {
        console.log(d);
        this.router.navigate(['/forum/landing']);
      },
    });
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: any): void {
    console.log(data);
    this.forumService.editOne(data, this.id).subscribe({
      next: (d) => {
        console.log(d);
        this.inEditMode = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  comment(data: any) {
    const obj = {
      content: data.content,
      creator: this.uId,
    };
    this.forumService.comment(obj, this.id).subscribe({
      next: () => {
        this.forumService.getOne(this.id).subscribe({
          next: (d) => {
            console.log(d);
            this.post.title = d.title;
            this.post.content = d.content;
            this.post.comments = d.comments;
            console.log(this.post);
          },
        });

        this.content = '';
      },
    });
  }
}
