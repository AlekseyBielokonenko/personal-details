import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { PersonalDetailsService } from '../../../services/personal-details.service';
import { PersonalDetailsTabController } from '../../../controllers/personal-details-tab.controller';
import { IpApiService, IpData } from '../../../services/ip-api.service';


@Component({
    selector: 'app-personal',
    templateUrl: './personal-tab.component.html',
    styleUrls: ['./personal-tab.component.less']
})
export class PersonalTabComponent extends PersonalDetailsTabController implements OnInit {
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
        const countryCode: AbstractControl = this.form.get('phone').get('countryCode');

        if (!countryCode.value) {
            this.ipApi.getIpData().subscribe(
                (res: IpData) => countryCode.reset(res.dialCode),
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
            'name': new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z\s]+$/),
                Validators.maxLength(32)
            ]),
            'email': new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            'dob': new FormControl('', [ Validators.required ])
        };

        formGroup.phone = this.formBuilder.group({
            'countryCode': new FormControl('', [ Validators.required ]),
            'number': new FormControl('', [
                Validators.required,
                Validators.pattern(/^[-0-9\s]+$/),
                Validators.maxLength(14)
            ])
        });

        return this.formBuilder.group(formGroup);
    }
}
