import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../../features/post/post.interface";
import * as moment from 'moment';


@Component({
  selector: 'app-post-event-constructor',
  templateUrl: './post-constructor.component.html',
  styleUrls: ['./post-constructor.component.scss']
})
export class PostConstructorComponent implements OnInit {
    title = 'Создание нового поста';
    post: Post;
    form: FormGroup;
    loading = false;
    userRoleInRoom = 'admin';
    constructor(
        public dialogRef: MatDialogRef<PostConstructorComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data?: { roomId: number, userId: number},

    ) {
        this.post = {
            id: null,
            roomId: 0,
            title: '',
            body: '',
            created: moment().format('DD-MM-YYYY hh:mm'),
        };

        if(data)
            this.post.roomId = data.roomId;

        this.setUserRole();

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            body: [''],
        });
    }
    ngOnInit(): void {
    }

    get f() { return this.form.controls; }

    onSubmit() {
        if (this.form.invalid) return;

        if (this.f['title'].value)
            this.post.title = this.f['title'].value;
        if (this.f['body'].value)
            this.post.body = this.f['body'].value;

        this.dialogRef.close(this.post);
    }

    setUserRole(){
        if(this.data?.userId) this.userRoleInRoom = "member";
        else this.userRoleInRoom = "admin";
    }
}
