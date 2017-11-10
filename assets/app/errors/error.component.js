import { Component, OnInit } from "@angular/core";
import { Error } from "./error.modul";
import { ErrorService } from "./error.service";
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService) {
        this.errorService = errorService;
    }
    ErrorComponent.prototype.onErrorHandled = function () {
        this.display = 'none';
    };
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccurred
            .subscribe(function (error) {
            _this.error = error;
            _this.display = 'block';
        });
    };
    return ErrorComponent;
}());
export { ErrorComponent };
