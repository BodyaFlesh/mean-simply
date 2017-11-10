import { EventEmitter } from '@angular/core';
import { Error } from './error.modul';
var ErrorService = /** @class */ (function () {
    function ErrorService() {
    }
    ErrorService.prototype.handleError = function (error) {
        var errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    };
    return ErrorService;
}());
export { ErrorService };
