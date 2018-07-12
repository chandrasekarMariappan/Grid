import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, ResponseContentType } from '@angular/http';
import { ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class PosRepService {
    public session = new ReplaySubject<IPosRep>();

    constructor(private http: Http) { }

    public login() {
        const request = new Request({
            // login end point need to be updated
            url: `/login`,
            method: RequestMethod.Post,
            withCredentials: false,
            responseType: ResponseContentType.Json,
            headers: new Headers()
        });

        // this.http.request(request)
        //     .toPromise()
        //     .then(() => console.log('success call back'))
        //     .catch(() => console.log('error call back'));

        setTimeout(() => {
            this.session.next({
                name: 'test',
                userId: 'test123'
            });
        }, 3000);
    }
}

export interface IPosRep {
    name: string;
    userId: string;
}
