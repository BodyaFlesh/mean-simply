import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/RX';
import { Message } from './message.model';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';
var MessageService = /** @class */ (function () {
    function MessageService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
    }
    MessageService.prototype.addMessage = function (message) {
        var _this = this;
        this.messages.push(message);
        var body = JSON.stringify(message);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var token = localStorage.getItem('token') ? "?token=" + localStorage.getItem('token') : '';
        return this.http.post("http://localhost:3000/message" + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
            _this.messages.push(message);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        return this.http.get('http://localhost:3000/message')
            .map(function (response) {
            var messages = response.json().obj;
            var transformedMessages = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
            }
            _this.messages = transformedMessages;
            return transformedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.editMessage = function (message) {
        this.messageisEdit.emit(message);
    };
    MessageService.prototype.updateMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var token = localStorage.getItem('token') ? "?token=" + localStorage.getItem('token') : '';
        return this.http.put("http://localhost:3000/message/" + (message.messageId, token), body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var mesaage = new Message(result.obj.content, 'Dummy', result.obj._id, null);
            _this.messages.push(mesaage);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        this.messages.splice(this.messages.indexOf(message), 1);
        var token = localStorage.getItem('token') ? "?token=" + localStorage.getItem('token') : '';
        return this.http.delete("http://localhost:3000/message/" + message.messageId + token)
            .map(function (response) {
            var result = response.json();
            var mesaage = new Message(result.obj.content, 'Dummy', result.obj._id, null);
            _this.messages.push(mesaage);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return MessageService;
}());
export { MessageService };
