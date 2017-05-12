import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ImportSchema } from './import-schema';

@Injectable()
export class ImportService {

    public itemImported = new BehaviorSubject(null);

    import(data: Array<any>, schema: ImportSchema) {

        this.itemImported.next(null);

        this.itemImported.complete();
    }
}
