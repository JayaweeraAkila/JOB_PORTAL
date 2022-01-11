import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name : 'textSearchFilter'
})
export class TextSearchFilter implements PipeTransform{
    transform(dataset: any[], key:string, value: string) {

        if(!dataset || !value){
            return dataset;
        }

        return dataset.filter(data => 
            data[key].toLowerCase().indexOf(value.toLowerCase()) !== -1 );


    }
    
}