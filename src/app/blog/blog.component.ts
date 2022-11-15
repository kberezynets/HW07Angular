import { Component, OnInit } from '@angular/core';
import { IPostResponse } from 'src/app/shared/interfaces/posts/post.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  public userBlogData!: IPostResponse[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlogData = data;
    })
  }
}