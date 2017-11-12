import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const countries: Array<IpData> = require('./../json/countries.json');

export interface IpInfoResponse {
    country: string;
}

export interface IpData {
    dialCode: string;
    country: string;
    code: string;
}

@Injectable()
export class IpApiService {
    private countries: Object;
    private ipData: IpData;
    private readonly apiUrl = 'http://ipinfo.io/json';

    constructor(private http: Http) { }

    /**
     * Load and cache ip data from http://ipinfo.io/json for current ip
     * @return {Observable<IpData>} Observable that will be populated after data will be received
     */
    getIpData(): Observable<IpData> {
        if (this.ipData) {
            return Observable.of(this.ipData);
        }

        return this.http.get(this.apiUrl)
            // Map received country code with full country name and phone code.
            // Local JSON approach was used because all found API's with phone codes
            // were available only by paid subscription.
            .map(res => {
                const json = res.json() as IpInfoResponse;
                countries.every((item: IpData) => {
                    if (item.code === json.country) {
                        this.ipData = item;
                        return false;
                    }

                    return true;
                });

                return this.ipData;
            });
    }
}
