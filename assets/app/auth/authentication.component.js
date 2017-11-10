import { Component } from '@angular/core';
import { AuthService } from './auth.service';
var AuthenticationComponent = /** @class */ (function () {
    function AuthenticationComponent(authService) {
        this.authService = authService;
    }
    AuthenticationComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    return AuthenticationComponent;
}());
export { AuthenticationComponent };
