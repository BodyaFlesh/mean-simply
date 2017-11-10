import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
var SigninComponent = /** @class */ (function () {
    function SigninComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/');
        }, function (error) {
            console.error(error);
        });
        this.myForm.reset();
    };
    SigninComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    return SigninComponent;
}());
export { SigninComponent };
