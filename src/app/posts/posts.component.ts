import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postservice: PostService) {}

  posts: any;


  ngOnInit() {
    this.postservice.getPost()
      .subscribe(response => {
        this.posts = response;
      }, 
      error => {
        alert('An error has occured!')
        console.log(error);
      });
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value}
    input.value = "";
    this.postservice.createPost(post)
    .subscribe(
    res => {
      post['id'] = res['id'];
      this.posts.splice(0, 0, post)
    }, 
    error => {
      alert('An error has occured!')
    })
  }

  updatePost(post) {
    this.postservice.updatePost(post)
      .subscribe(
      result => {
        console.log(result);
      }, 
      error => {
        alert('An error has occured!')
      })
  }

  deletePost(post) {
    this.postservice.deletePost(post)
      .subscribe(
      result => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, 
      (error: Response) => {
        if (error.status === 404) {
          alert('This post has alraedy been deleted!')
        } else {
          alert('An error has occured!')
          console.log(error)
        }
      })
  }

}
