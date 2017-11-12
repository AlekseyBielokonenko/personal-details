import { Component } from '@angular/core';
import { PersonalDetailsService } from '../../../services/personal-details.service';

@Component({
    selector: 'app-personal-details-root',
    templateUrl: './personal-details-root.component.html',
    styleUrls: ['./personal-details-root.component.less']
})
export class PersonalDetailsRootComponent {
    get showSaved(): boolean {
        return this.personalDetails.showSaved;
    }

    constructor(
        private personalDetails: PersonalDetailsService
    ) { }

    /**
     * Next submitData Subject form PersonalDetailsService for notify active tab form about submitting
     */
    onSubmit() {
        this.personalDetails.submitData.next();
    }
}
