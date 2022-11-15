import { Component, OnInit } from '@angular/core';
import { IPostRequest, IPostResponse } from 'src/app/shared/interfaces/posts/post.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  public blogData!: IPostResponse[];
  public title!: string;
  public text!: string;
  public author!: string;

  public editID!: number;
  public editStatus = false;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.blogData = data;
    })
  }

  addPost(): void {
    const newPost = {
      title: this.title,
      text: this.text,
      author: this.author
    };
    console.log(newPost);
    console.log(this.blogData);
    this.blogService.create(newPost).subscribe(() => {
      this.getPosts();
      this.resetForm();
    })
  }

  editPost(post: IPostResponse): void {
    this.title = post.title;
    this.text = post.text;
    this.author = post.author;
    this.editID = post.id;
    this.editStatus = true;
  }

  saveEdit(): void {
    const updatePost = {
      title: this.title,
      text: this.text,
      author: this.author
    };
    this.blogService.update(updatePost, this.editID).subscribe(() => {
      this.getPosts();
      this.resetForm();
    })
  }

  deletePost(post: IPostResponse): void {
    this.blogService.delete(post.id).subscribe(() => {
      this.getPosts();
    })
  }

  private resetForm(): void {
    this.title = '';
    this.text = '';
    this.author = '';
    this.editStatus = false;
  }
}