import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { PersonalDetailsService } from '../../../services/personal-details.service';
import { IpApiService, IpData } from '../../../services/ip-api.service';
import { PersonalDetailsTabController } from '../../../controllers/personal-details-tab.controller';


@Component({
    selector: 'app-location',
    templateUrl: './location-tab.component.html',
    styleUrls: ['./location-tab.component.less']
})
export class LocationTabComponent extends PersonalDetailsTabController implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private personalDetails: PersonalDetailsService,
        private ipApi: IpApiService
    ) {
        super(personalDetails);
    }

    ngOnInit() {
        this.form = this.createForm();
        this.prepareForm();
        const country = this.form.get('country');

        if (!country.value) {
            this.ipApi.getIpData().subscribe(
                (res: IpData) =>  country.reset(res.country),
                err => console.error('getIpData err >>', err)
            );
        }
    }

    /**
     * Create form for location tab
     * @return  {FormGroup} created form
     */
    createForm(): FormGroup {
        const formGroup: any = {
            'country': new FormControl(null, [ Validators.required ]),
            'city': new FormControl(null, [
                Validators.pattern(/^[-0-9a-zA-Z\s]+$/),
                Validators.maxLength(64)
            ]),
            'state': new FormControl(null, [
                Validators.pattern(/^[-0-9a-zA-Z\s]+$/),
                Validators.maxLength(64)
            ])
        };

        return this.formBuilder.group(formGroup);
    }
}