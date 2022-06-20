import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {Session, SessionService} from "../../../features/session";
import {AlertService} from "../../../shared/alert/alert.service";
import {UserService} from "../../../features/user";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-modal-change-password',
    templateUrl: './modal-change-password.component.html',
    styleUrls: ['./modal-change-password.component.scss']
})
export class ModalChangePasswordComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    session = this.sessionService.getSession();

    constructor(
        public dialogRef: MatDialogRef<ModalChangePasswordComponent>,
        public formBuilder: FormBuilder,
        public sessionService: SessionService,
        private alertService: AlertService,

    ) {
        this.form = this.formBuilder.group({
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required],
        });
    }

    ngOnInit(): void {

    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        if (this.f['password'].value != this.f['repeatPassword'].value) {
            this.f['repeatPassword'].setErrors({'incorrect': true});
            return this.alertService.error('Пароли не совпадают');
        }

        let user = {
            id: this.session.id,
            name: this.session.name,
            email: this.session.email,
            password: this.f['password'].value
        };
        this.loading = true;
        this.sessionService.changePassword(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Пароль успешно изменён');
                    this.dialogRef.close();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
