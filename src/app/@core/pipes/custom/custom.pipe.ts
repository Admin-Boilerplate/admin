import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "custom"
})
export class CustomPipe implements PipeTransform {

    transform<T = any>(value: any, fn?: (item: any) => any, config?: {wholeArrayToFn?: boolean, trigger?: any}): any {
        if (Array.isArray(value)) {
            if (config?.wholeArrayToFn) {
                return fn(value);
            }
            return value.map(item => fn ? fn(item) : item).filter(item => !!item);
        } else {
            return fn ? fn(value) : value;
        }
    }
}
