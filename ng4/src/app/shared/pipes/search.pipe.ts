import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(value: any, [term]: any) {
        console.log(term);
        if (!term || term.trim() == '') {
            return value;
        } else {
            return value.filter((item: any) => item.costCenter.indexOf(term) >= 0);
        }
    }
}
