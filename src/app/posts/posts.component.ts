import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private Http: HttpClient) {}

  posts: any;
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  ngOnInit() {
    this.Http.get(this.url)
      .subscribe(response => {
        this.posts = response;
      });
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value}
    input.value = "";
    this.Http.post(this.url, post)
    .subscribe(res => {
      post['id'] = res['id'];
      this.posts.splice(0, 0, post)
    })
  }

  updatePost(post) {
    this.Http.patch(this.url + '/' + post.id, post)
      .subscribe(result => {
        console.log(result);
      })
  }

}
