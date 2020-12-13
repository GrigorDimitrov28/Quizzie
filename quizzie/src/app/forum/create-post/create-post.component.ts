import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from 'src/app/core/forum.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  data = {};
  blog: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forumService: ForumService
  ) {
    this.blog = this.fb.group({
      title: [''],
      content: ['']
    })
   }

  ngOnInit(): void {
  }

  submit() {
    this.blog.value.author = localStorage.getItem('uId');
    this.forumService.create(this.blog.value).subscribe({
      next: (d) => {
        console.log(d);
      }
    })
    this.router.navigate(['/forum/landing']);
  }

}
