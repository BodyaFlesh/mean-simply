import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LogoutComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    };
    return LogoutComponent;
}());
export { LogoutComponent };
