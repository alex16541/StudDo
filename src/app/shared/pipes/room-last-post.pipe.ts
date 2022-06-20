import {Pipe, PipeTransform} from '@angular/core';
import {PostService} from "../../features/post/post.service";
import {Room} from "../../features/room";
import {firstValueFrom} from "rxjs";

@Pipe({
    name: 'roomLastPost'
})
export class RoomLastPostPipe implements PipeTransform {

    constructor(private postService: PostService) {
    }
    async transform(room: Room) {
        return await firstValueFrom(this.postService.get(room.lastPost));
    }
}
