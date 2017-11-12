import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';

@Injectable()
export class PersonalDetailsService {
    submitData = new Subject();
    showSaved: boolean;

    private ls: Storage;
    private readonly lsKey = 'personal-details';
    private timer;

    constructor() {
        if (window.localStorage) {
            this.ls = window.localStorage;
        } else {
            console.error('Local Storage is not supported!');
        }
    }

    /**
     * Save personal details object to localStorage
     * @param {Object} data personal details object that will be saved
     */
    savePersonalDetails(data: Object) {
        if (data) {
            const savedData = this.loadPersonalData();
            const dataToSave = {};

            if (savedData) {
                Object.assign(dataToSave, savedData, data);
            } else {
                Object.assign(dataToSave, data);
            }

            this.ls.setItem(this.lsKey, JSON.stringify(dataToSave));

            this.showSaved = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.showSaved = false, 2000);
        }
    }

    /**
     * Load personal details object from localStorage
     * @return {Object|undefined} personal details object if exist or undefined
     */
    loadPersonalData(): Object|undefined {
        const data = this.ls.getItem(this.lsKey);

        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error('error >>', error);
            }
        }
    }

    /**
     * Restore given form with loaded from localStorage personal data object
     * @param {FormGroup} form form that will be reseted
     */
    restorePersonalData(form: FormGroup) {
        const data = this.loadPersonalData();
        if (data) {
            form.reset(data);
        }
    }
}
