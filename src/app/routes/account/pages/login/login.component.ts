import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first, firstValueFrom} from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';
import {SessionService} from "../../../../features/session";
import {UserService} from "../../../../features/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private userService: UserService,
        private alertService: AlertService)
    {

        this.form = this.formBuilder.group({
            email: ['',Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.sessionService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                async data => {
                    await firstValueFrom(this.userService.loadUser());
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    forgotPassword() {

    }
}
