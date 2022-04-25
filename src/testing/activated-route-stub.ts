import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {

    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `queryParamMap` observable
    private subject = new ReplaySubject<ParamMap>();

    /** The mock paramMap observable */
    readonly queryParamMap = this.subject.asObservable();

    constructor(initialQueryParams?: Params) {
        this.setQueryParamMap(initialQueryParams);
    }

    /** Set the paramMap observable's next value */
    setQueryParamMap(params: Params = {}) {
        this.subject.next(convertToParamMap(params));
    }

}
