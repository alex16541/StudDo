import {Pipe, PipeTransform} from '@angular/core';
import {PostService} from "../../features/post/post.service";
import {Room} from "../../features/room";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../features/user";
import {SessionService} from "../../features/session";
import {Post} from "../../features/post/post.interface";

@Pipe({
    name: 'isPostRead'
})
export class IsPostReadPipe implements PipeTransform {

    constructor(private postService: PostService,
                private sessionService: SessionService) {
    }
    transform(post: Post, readPosts: {id: any,postId: number, userId: number}[]) {
        let user = this.sessionService.getSession();
        return !!readPosts.find(read => read.postId == post.id && read.userId == user.id);
    }
}
