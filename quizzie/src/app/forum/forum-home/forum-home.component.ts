import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/core/forum.service';

@Component({
  selector: 'app-forum-home',
  templateUrl: './forum-home.component.html',
  styleUrls: ['./forum-home.component.css']
})
export class ForumHomeComponent implements OnInit {
  postArray = [];

  constructor(
    private forumService: ForumService
    ) { }

  ngOnInit(): void {
    this.forumService.getAll().subscribe({
      next: (d) => {
        this.postArray = d;
        console.log(d);
      }
    })
  }

}
