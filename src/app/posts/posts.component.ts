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
      });
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value}
    input.value = "";
    this.postservice.createPost(post)
    .subscribe(res => {
      post['id'] = res['id'];
      this.posts.splice(0, 0, post)
    })
  }

  updatePost(post) {
    this.postservice.updatePost(post)
      .subscribe(result => {
        console.log(result);
      })
  }

  deletePost(post) {
    this.postservice.deletePost(post)
      .subscribe(result => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }

}
