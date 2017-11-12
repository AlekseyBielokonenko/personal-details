import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PersonalDetailsService } from '../../services/personal-details.service';
import { debuglog } from 'util';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.less']
})
export class HelloComponent implements OnInit {
    personalData: Object;

    constructor(
        private personalDetails: PersonalDetailsService,
        private router: Router
    ) { }

    ngOnInit() {
        const data = this.personalDetails.loadPersonalData();
        if (data) {
            this.personalData = data;
        }
    }

    /**
     * Check and get property from personalData object
     * @param   {object} prop checked property
     * @param   {object} toCheck object to check property if function called recursively
     * @return  {string} property from personalData object or property string with % sign
     */
    getProp(prop: string, toCheck: Object = null): string {
        const parts = prop.split('.');
        const personalData = toCheck || this.personalData;

        if (parts.length === 1) {
            if (personalData && personalData[prop]) {
                return personalData[prop];
            } else {
                return `%${prop}%`;
            }
        } else {
            const key = parts.shift();
            if (personalData && personalData[key]) {
                return this.getProp(parts.length === 1 ? parts[0] : parts.join('.'), personalData[key]);
            } else {
                return `%${parts[parts.length - 1]}%`;
            }
        }
    }

    toPersonalDetails() {
        this.router.navigate(['./personal-details']);
    }
}
