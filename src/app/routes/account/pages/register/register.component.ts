import { Component, OnInit } from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../../../features/session";
import {AlertService} from "../../../../shared/alert/alert.service";
import {first} from "rxjs";
import {User} from "../../../../features/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
        private alertService: AlertService)
    {

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['',Validators.required],
            pass: ['', Validators.required],
            repeatPass: ['', Validators.required]
        });

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
        if(this.f['pass'].value != this.f['repeatPass'].value){
            this.f['repeatPass'].setErrors({'incorrect':true});
            return this.alertService.error('Пароли не совпадают');
        }

        let user = {
            id: 0,
            name: this.f['name'].value,
            email: this.f['email'].value,
            pass: this.f['pass'].value
        };
        this.loading = true;
        this.sessionService.register(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['/account/login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
