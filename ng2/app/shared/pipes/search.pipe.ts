import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(value, [term]) {
        console.log(term);
        if (!term || term.trim() == '') {
            return value;
        } else {
            return value.filter((item) => item.costCenter.indexOf(term) >= 0);
        }
    }
}