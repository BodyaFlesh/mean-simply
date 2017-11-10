import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/RX';

import { Message } from './message.model';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService{
    private messages: Message[] = [];
    messageisEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService){}

    addMessage(message: Message){
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
        return this.http.post(`http://localhost:3000/message${token}`, body, { headers })
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id,
                )
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                }
            )

    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for(let message of messages){
                    transformedMessages.push(
                        new Message(
                            message.content, 
                            message.user.firstName, 
                            message._id,  
                            message.user._id
                        )
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                }
            )
    }

    editMessage(message: Message){
        this.messageisEdit.emit(message);
    }

    updateMessage(message : Message){
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
        return this.http.put(`http://localhost:3000/message/${message.messageId,token}`, body, { headers })
            .map((response: Response) => {
                const result = response.json();
                const mesaage = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(mesaage);
                return message;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                }
            )
    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token') ? `?token=${localStorage.getItem('token')}` : '';
        return this.http.delete(`http://localhost:3000/message/${message.messageId}${token}`)
            .map((response: Response) => {
                const result = response.json();
                const mesaage = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(mesaage);
                return message;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                }
            )
    }


}