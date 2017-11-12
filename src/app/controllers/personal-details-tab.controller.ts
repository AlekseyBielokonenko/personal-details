import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PersonalDetailsService } from '../services/personal-details.service';
import { CommonController } from '../controllers/common.controller';


/**
 * Base controller for tabs components for keeping them DRY
 */
export class PersonalDetailsTabController extends CommonController {
    form: FormGroup;

    constructor(
        private _personalDetails: PersonalDetailsService
    ) {
        super();
    }

    /**
     * Base controller for tabs components for keeping them DRY
     */
    prepareForm() {
        this._personalDetails.restorePersonalData(this.form);

        this._personalDetails.submitData
            .takeUntil(this.unsubscribeOnDestroy)
            .subscribe(
                res => {
                    this.markFormAsTouched(this.form);
                    if (this.form.valid) {
                        this._personalDetails.savePersonalDetails(this.form.value);
                    }
                },
                err => console.error('err >>', err)
            );
    }

    /**
     * Mark all form controls as touched for showing errors without actual submitting
     * @param {FormGroup} form form that will be touched
     */
    markFormAsTouched(form: FormGroup) {
        if (!form) {
            return;
        }

        Object.keys(form.controls).forEach(key => {
            if (form.get(key)['controls']) {
                this.markFormAsTouched(form.controls[key] as FormGroup);
            } else {
                form.controls[key].markAsTouched();
            }
        });
    }
}
