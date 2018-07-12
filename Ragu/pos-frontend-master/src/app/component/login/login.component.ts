import { Component, OnInit } from '@angular/core';

import { PosRepService } from '../../service/posRep.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public pin: string;

    constructor(private posRepService: PosRepService) { }

    ngOnInit() {
    }


    public onLogin() {
        // code logic here
    }

    public onNumberClick(value) {
        if (!this.pin) {
            this.pin = value;
        } else if (this.pin.length <= 4) {
            this.pin = this.pin + value;
        }
    }

    public onClear(value) {
        this.pin = null;
    }

    public onBackSpace() {
        this.pin = this.pin.slice(0, -1);
    }

    public onExit() {
        window.open('', '_self', '');
        window.close();
    }
}
