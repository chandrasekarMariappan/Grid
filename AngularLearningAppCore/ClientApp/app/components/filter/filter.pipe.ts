import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    public transform(value: any[], term: string): any[] {

        debugger;

        if (!term) return value;

        var allRowValues: any[] = [];
      


        this.processAllRows(value, allRowValues);





        console.log(allRowValues);

       
        var result = (value || []).filter(function (item, index, array) {
            debugger; 
           
            return JSON.stringify(allRowValues[index]).indexOf(term) > 0;


        });

        return result;

    }



    private processAllRows(value: any, allRowValues: any): void {
     
        for (var i = 0; i < value.length; i++) {
            var rowItem = value[i];
            var keys = Object.keys(rowItem);
            var rowArray: any[] = [];
            this.processChildRows(rowArray, [rowItem]);
            allRowValues.push(rowArray);
        }
    }

    private processChildRows( rowArray: any[], rowItem: any) {
      
        for (var k = 0; k < rowItem.length; k++) {
           
            var row = rowItem[k];
            var keys = Object.keys(row);
            for (var i = 0; i < keys.length; i++) {
                if (typeof row[keys[i]] == "object") {
                    this.processChildRows(rowArray, row[keys[i]]);
                }
                else {
                    rowArray.push(row[keys[i]]);
                }
            }
        }






    }
}





