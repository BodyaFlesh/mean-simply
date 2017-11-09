import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent{
    @Input() message: Message;
    @Output() editClicked = new EventEmitter<String>();

    constructor(private messageService : MessageService){

    }

    onEdit(){
        console.log('click!');
        this.editClicked.emit('A new value');
    }

    onDelete(){
        this.messageService.deleteMessage(this.message);
    }
}