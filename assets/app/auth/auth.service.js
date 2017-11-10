import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/RX';
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
var AuthService = /** @class */ (function () {
    function AuthService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
    }
    AuthService.prototype.signup = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AuthService.prototype.signin = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.clear();
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('token') !== null;
    };
    return AuthService;
}());
export { AuthService };
