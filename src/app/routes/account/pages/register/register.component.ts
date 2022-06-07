import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../../../features/session";
import {AlertService} from "../../../../shared/alert/alert.service";
import {firstValueFrom} from "rxjs";

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
            login: ['', Validators.required, Validators.min(6), Validators.max(50)],
            email: ['',Validators.required],
            pass: ['', Validators.required, Validators.min(6), Validators.max(50)],
            repeatPass: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnInit() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    async onSubmit() {
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
            login: this.f['login'].value,
            email: this.f['email'].value,
            password: this.f['pass'].value,
            confirmPassword: this.f['pass'].value
        };
        this.loading = true;
        let response = await firstValueFrom(this.sessionService.register(user))
        console.log(response);
        if (response && response['success']){
            this.alertService.success('Регистрация прошла успешно', { keepAfterRouteChange: true });
            this.router.navigate(['/account/login'], { relativeTo: this.route });
        }
        else {
            this.alertService.error('Произошла ошибка при регистрации', { keepAfterRouteChange: false });
            this.loading = false;
        }
    }
}
