import { Component, OnInit } from "@angular/core";
import { Error } from "./error.modul";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit{
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService){}

    onErrorHandled(){
        this.display = 'none';
    }

    ngOnInit(){
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}