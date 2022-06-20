import {Pipe, PipeTransform} from '@angular/core';
import {PostService} from "../../features/post/post.service";
import {Room} from "../../features/room";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../features/user";
import {SessionService} from "../../features/session";
import {Post} from "../../features/post/post.interface";

@Pipe({
    name: 'getReadsOfPost'
})
export class GetReadsOfPostPipe implements PipeTransform {

    constructor(private postService: PostService,
                private sessionService: SessionService) {
    }
    transform(post: Post, readPosts: {id: any,postId: number, userId: number}[]) {
        let count = readPosts.filter(read => read.postId == post.id).length;
        return count;
    }
}
