import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Post} from "./post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {
    private postUrl = 'api/posts';  // URL to web api
    private postSubject: BehaviorSubject<Post>;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) {
        //@ts-ignore
        this.postSubject = new BehaviorSubject<Post>(JSON.parse(localStorage.getItem('post')));
    }

    /** GET posts from the server */
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl)
            .pipe(
                tap(_ => PostService.log('fetched posts')),
                catchError(this.handleError<Post[]>('getPosts', []))
            );
    }

    public getPost(): Post {
        return this.postSubject.value;
    }

    /** GET post by id. Return `undefined` when id not found */
    getNo404<Data>(id: number): Observable<Post> {
        const url = `${this.postUrl}/?id=${id}`;
        return this.http.get<Post[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? 'fetched' : 'did not find';
                    PostService.log(`${outcome} post id=${id}`);
                }),
                catchError(this.handleError<Post>(`getPost id=${id}`))
            );
    }

    /** GET room by id. Will 404 if id not found */
    get(id: number): Observable<Post> {
        const url = `${this.postUrl}/${id}`;
        return this.http.get<Post>(url).pipe(
            tap(_ => PostService.log(`fetched post id=${id}`)),
            catchError(this.handleError<Post>(`getPost id=${id}`))
        );
    }


    /** GET Posts whose name contains search term */
    search(term: string): Observable<Post[]> {
        if (!term.trim()) {
            // if not search term, return empty post array.
            return of([]);
        }
        return this.http.get<Post[]>(`${this.postUrl}/?name=${term}`).pipe(
            tap(x => x.length ?
                PostService.log(`found posts matching "${term}"`) :
                PostService.log(`no posts matching "${term}"`)),
            catchError(this.handleError<Post[]>('searchPosts', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new post to the server */
    add(post: Post): Observable<Post> {
        return this.http.post<Post>(this.postUrl, post, this.httpOptions).pipe(
            tap((newPost: Post) => {
                PostService.log(`added post w/ id=${post.id}`)
            }),
            catchError(this.handleError<Post>('addPost'))
        );
    }

    /** DELETE: delete the post from the server */
    delete(id: number): Observable<Post> {
        const url = `${this.postUrl}/${id}`;

        return this.http.delete<Post>(url, this.httpOptions).pipe(
            tap(_ => PostService.log(`deleted post id=${id}`)),
            catchError(this.handleError<Post>('deletePost'))
        );
    }

    /** PUT: update the post on the server */
    update(post: Post): Observable<any> {
        return this.http.put(this.postUrl, post, this.httpOptions).pipe(
            tap(_ => PostService.log(`updated post id=${post.id}`)),
            catchError(this.handleError<any>('updatePost'))
        );
    }

    getReadPosts(): Observable<{id: any,postId: number, userId: number}[]> {
        return this.http.get<{id: any,postId: number, userId: number}[]>('api/readPosts')
            .pipe(
                tap(_ => PostService.log('fetched rade posts')),
                catchError(this.handleError<any[]>('getRadePosts', []))
            );
    }

    /** POST: add a new post to the server */
    read(post: {id: any,postId: number, userId: number}): Observable<{id: any,postId: number, userId: number}> {
        return this.http.post<{id: number,postId: number, userId: number}>('api/readPosts', post, this.httpOptions).pipe(
            tap((newPost) => {
                PostService.log(`added post w/ id=${newPost.id}`)
            }),
            catchError(this.handleError<any>('addPost'))
        );
    }

    /** DELETE: delete the post from the server */
    unread(post: {id: any,postId: number, userId: number}): Observable<{id: any,postId: number, userId: number}> {
        const url = `api/readPosts/${post.id}`;
        return this.http.delete<{id: number,postId: number, userId: number}>(url, this.httpOptions).pipe(
            tap(_ => PostService.log(`deleted read post id=${post.id}`)),
            catchError(this.handleError<any>('deleteReadPost'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for post consumption
            PostService.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a PostService message with the Log */
    private static log(message: string) {
        console.log(`PostService: ${message}`);
    }

    // private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    // }


}
