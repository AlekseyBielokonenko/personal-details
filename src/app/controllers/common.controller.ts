import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';


/**
 * Controller with unsubscribeOnDestroy Observable for auto unsubscribe logic in RxJs chain calls
 */
export class CommonController implements OnDestroy {
    private _unsubscribeOnDestroy = new Subject();
    unsubscribeOnDestroy = this._unsubscribeOnDestroy.asObservable();

    ngOnDestroy() {
        this._unsubscribeOnDestroy.next(true);
        this._unsubscribeOnDestroy.complete();
        this._unsubscribeOnDestroy = null;
        this.unsubscribeOnDestroy = null;
    }
}
