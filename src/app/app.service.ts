import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppHttpService {
    public title = '365Days4U';

    constructor(private http: HttpClient) {
        // this.getBanner('');
    }

    public getTitle() {
        let title = this.title;
        title = title + ' kamal';
        return title;
    }

    public getBanner(appTitle) {
        return this.http.get('http://365days4u.com/365api/banner.php?appname=' + appTitle);
    }
}

export class AppHttpService2 {
    private title = 'Swiggy';

    constructor() { }

    public getTitle() {
        let title = this.title;
        title = title + ' kamal';
        return title;
    }
}
