import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';
var MessageInpuntComponent = /** @class */ (function () {
    function MessageInpuntComponent(messageService) {
        this.messageService = messageService;
    }
    MessageInpuntComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageisEdit.subscribe(function (message) { return _this.message = message; });
    };
    MessageInpuntComponent.prototype.onSubmit = function (form) {
        if (this.message) {
            //edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(function (result) { return console.log(result); });
            this.message = null;
        }
        else {
            //create
            var message = new Message(form.value.content, 'Bohdan');
            this.messageService.addMessage(message)
                .subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.error(error);
            });
        }
        form.resetForm();
    };
    MessageInpuntComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    return MessageInpuntComponent;
}());
export { MessageInpuntComponent };
