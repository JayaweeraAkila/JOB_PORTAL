import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name : 'textSearchFilterMultiple'
})
export class TextSearchFilterMultiple implements PipeTransform{
    transform(dataset: any[], searchKeys:string[], searchValue: string) {

        if(!dataset || !searchValue || !searchKeys){
            return dataset;
        }

        return dataset.filter(data => {
            let index = false;
            searchKeys.forEach((key)=>{
                let currentVlue;
                if(key.indexOf('.') > -1){
                    let keyParts = key.split('.');
                    switch(keyParts.length){
                        case 2:
                        currentVlue = data[keyParts[0]][keyParts[1]];
                        break;
                    }
                }else{
                    currentVlue = data[key];
                }
                let hasSearch = currentVlue.toLowerCase().indexOf(searchValue.toLowerCase());
                if(hasSearch !== -1){
                    index = true;
                }
            });
            return index;

        });
    }
    
}