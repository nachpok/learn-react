import { action, computed, observable } from "mobx";
import { database } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import dayjs from "dayjs";

export interface Post {
  id: number;
  text: string;
  date: dayjs.Dayjs;
  creator: string; //create user interface
  likes: number;
  comments: string[]; //create comment interface
  tags: string[];
}

export class BlogStore {
  @observable list: Post[] = [];
  @observable isLoading = true;

  constructor() {
    const todosRef = ref(database, "posts");
    onValue(todosRef, (snapshot) => {
      this.setPosts(snapshot.val() || []);
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1);
  }
  @action
  setPosts(posts: Post[]) {
    this.list = posts;
  }
  @computed
  get posts() {
    if (this.isLoading) {
      throw new Promise((resolve) => setTimeout(resolve, 900)); // you can replace this with a relevant promise
    }
    return this.list;
  }
  @action
  removeList = () => {
    this.list = [];
    set(ref(database, "todos"), this.list);
  };
  @action
  addPost = (
    postText: string,
    tags: string[] = [],
    creator: string = "Nate"
  ) => {
    const currentDate = dayjs();
    const post = {
      id: Date.now(),
      text: postText,
      date: currentDate,
      creator: creator,
      likes: 0,
      comments: [],
      tags: tags,
    } as Post;
    this.list.push(post);
    set(ref(database, "todos"), this.list);
  };

  @action
  removePost = (postId: number) => {
    const index = this.list.findIndex((post) => post.id === postId);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    set(ref(database, "posts"), this.list);
  };

  @action
  addLike = (postId: number) => {
    const post = this.list.find((listPost) => listPost.id === postId);
    if (post) {
      post.likes += 1;
    }
  };

  @action
  addComment = (postId: number, comment: string) => {
    const post = this.list.find((listPost) => listPost.id === postId);
    if (post) {
      post.comments.push(comment);
    }
  };
}
