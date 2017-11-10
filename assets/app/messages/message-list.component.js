import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent(messageService) {
        this.messageService = messageService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.getMessages().subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    return MessageListComponent;
}());
export { MessageListComponent };
