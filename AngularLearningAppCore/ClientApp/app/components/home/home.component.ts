import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    addSampleRows(rows: number): any {

        for (var i = 0; i < rows; i++) {
            this.treeObject.push({
                name: 'John98' + i, score: 130 + i, city: 'New York', birthday: '1980/2/5', children: [
                    { name: 'John2' + i, score: 82 + i, city: 'San Fran1', birthday: '1990/1/21' },
                    {
                        name: 'John2' + i, score: 81 + i, city: 'San Fran2', birthday: '1990/1/22', children:
                        [{
                            name: 'John3' + 1, score: 89 + i, city: 'San Francisco' + i, birthday: '1990/1/21', children: [
                                { name: 'Tom1', score: 77 + i, city: 'San Francisco' + i, birthday: '1990/1/21' },
                                { name: 'Tom2', score: 85 + i, city: 'San Francisco' + i, birthday: '1990/1/21' },
                                { name: 'Tom3', score: 83 + i, city: 'San Francisco' + i, birthday: '1990/1/21' }
                            ]
                        }]
                    }
                ]
            });
        }


    }
    treeObject: any = [
        {
            name: 'JohnFirstname_Root', score: 130, city: 'New York', birthday: '1980/2/5', children: [
                { name: 'John2_root1', score: 82, city: 'San Fran1', birthday: '1990/1/21' },
                {
                    name: 'John3_root2', score: 81, city: 'San Fran2', birthday: '1990/1/22', children:
                    [{
                        name: 'John4_root3', score: 89, city: 'San Francisco', birthday: '1990/1/21', children: [
                            { name: 'Tom1_child1', score: 77, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom2Kumari_child2', score: 85, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom3_child3', score: 83, city: 'San Francisco', birthday: '1990/1/21' }
                        ]
                    }]
                }
            ]

        },
        {
            name: 'John98_Root', score: 130, city: 'New York', birthday: '1980/2/5', children: [
                { name: 'John2_Root1', score: 82, city: 'San Fran1', birthday: '1990/1/21' },
                {
                    name: 'John2_Root2', score: 81, city: 'San Fran2', birthday: '1990/1/22', children:
                    [{
                        name: 'John3_Root3', score: 89, city: 'San Francisco', birthday: '1990/1/21', children: [
                            { name: 'Tom1_Child1', score: 77, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom2_child2', score: 85, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom3_child3', score: 83, city: 'San Francisco', birthday: '1990/1/21' }
                        ]
                    }]
                }
            ]
        }

    ];

    fTreeObject: any = [];
    fTreeObjectHeader: any = [
        {
            name: "Id",
            sort: { name: "Id", order: "asc" }
        },
        {
            name: "Name",
            sort: { name: "name", order: "asc" }
        }, {
            name: "Score",
            sort: { name: 'score', order: "asc" }
        },
        {
            name: "City",
            sort: { name: 'score', order: "asc" }
        },
        {
            name: "Birthday",
            sort: { name: 'score', order: "asc" }
        }
    ];
    fTreeObjectFull: any = {};



    newObj: any = [];
    level: number = 0;
    classDetails: any = "";

    constructor() {

        // this.addSampleRows(100);
        //Sort the object based on the given column name (this.treeObject is send for sort and object itself changed )
        this.constructFilteredObject(this.treeObject, this.fTreeObjectHeader[1].sort);
        //Construct the tree based object 
        this.fTreeObject = this.constructTreeObject(this.treeObject);
        //Set the tree object into table data object
        this.fTreeObjectFull.data = this.fTreeObject;
        //Set table header object
        this.fTreeObjectFull.header = this.fTreeObjectHeader;
        //Set parent child hierarchy
        this.setParentDetails(this.fTreeObjectFull.data);

    }

    getDetails(level: any): string {

        return (level * 30) + "px";
    }

    sort_by(obj: any): any {
        var fields = [].slice.call(arguments),
            n_fields = fields.length;

        return function (A: any, B: any): any {

            var a, b, field, key, primer, reverse, result;
            for (var i = 0, l = n_fields; i < l; i++) {
                result = 0;
                field = fields[i];

                key = typeof field === 'string' ? field : field.name;

                a = A[key];
                b = B[key];
                if (a != undefined && typeof a == "string")
                    a = a.toLocaleLowerCase();
                if (b != undefined && typeof a == "string")
                    b = b.toLocaleLowerCase();
                if (typeof field.primer !== 'undefined') {
                    a = field.primer(a);
                    b = field.primer(b);
                }

                reverse = (field.reverse == true) ? -1 : 1;

                if (a < b) result = reverse * -1;
                if (a > b) result = reverse * 1;
                if (result !== 0) break;
            }
            return result;
        }
    }



    constructTreeObjectAfterSort(data: any, newObj: any): void {

        for (var i = 0; i < data.length; i++) {
            var o = data[i];
            newObj.push(o);
            if (o.children && o.children.length != 0) {
                this.constructTreeObjectAfterSort(o.children, newObj);
            }
        }


    }

    recursive_sort(data: any, name: string, reverse: any): any {
        for (var i = 0; i < data.length; i++) {
            if (data[i].children != undefined && data[i].children.length > 0) {
                data[i].children.sort(this.sort_by({ name: name, reverse: reverse }));
                this.recursive_sort(data[i].children, name, reverse);
            }
        }
    }


    constructFilteredObject(data: any, sortObj: any): any {
        var reverse = false;
        var name = sortObj.name;
        reverse = sortObj.order == "asc" ? false : true;

        var result = data.sort(this.sort_by({ name: name, reverse: reverse }));

        this.recursive_sort(result, name, reverse);
    }





    sort(sortObj: any): any {

        debugger;

        if (sortObj.order == "asc")
            sortObj.order = "desc";
        else
            sortObj.order = "asc";
        this.constructFilteredObject(this.treeObject, sortObj);
        let newObj: any = [];
        this.constructTreeObjectAfterSort(this.treeObject, newObj);
        this.setParentDetails(newObj);
        this.fTreeObjectFull.data = newObj;


    }




    //filter(object: Array<any>, key: any): Array<any> {

    //    return object.filter(x => {
    //        x.includes(key);
    //    })

    //}







    itemCheckClick(id: number, item: any): void {
        debugger;
        let checkCount: any = { count: 0 };
        item.selected = !item.selected;
        if (item.selected) {
            item.class = item.class + " checked";
            checkCount.count++;
        }
        else {
            item.class = item.class.replace(/checked/g, " ");
            checkCount.count--;

        }

        if (item.children != undefined)
            this.checkItem(item, checkCount);
        var totalCount = { count: 0 };
        var checkedCount = { count: 0 };

        this.checkParentChildCheckBox(item, this.fTreeObjectFull.data, checkCount);

        //  $timeout(scope.checkHideRows, 50);



    }
    checkExpand(item: any, isExpend: boolean): void {


        for (var i = 0; i < item.children.length; i++) {

            var o = item.children[i];
            if (!isExpend)
                o.class = o.class + " hide";
            else
                o.class = o.class.replace(/hide/g, " ");

            if (o.children && !isExpend || o.children && o.expend)
                this.checkExpand(o, isExpend);
        }



    }







    constructTreeObject(tree: Array<any>): Array<any> {

        debugger;
        for (var i = 0; i < tree.length; i++) {
            this.classDetails = "";

            this.setLevelDetails(tree[i], this.newObj, this.level, this.classDetails);
        }

        return this.newObj;
    }
    constructChildTreeObject(obj: Array<any>, newObj: Array<any>, level: number): void {
        for (var i = 0; i < obj.length; i++) {
            this.classDetails = "hide";
            this.setLevelDetails(obj[i], newObj, level, this.classDetails);
        }
    }

    itemClick(id: any, item: any) {
        debugger;

        if (item.expend)
            item.expend = false;
        else
            item.expend = true;
        this.checkExpand(item, item.expend);

    };



    setLevelDetails(item: any, newObj: Array<any>, level: number, classDetails: string): void {
        if (item.isLast == undefined)
            item.isLast = false;
        item.$$treeLevel = level;
        if (item.selected == undefined) {
            item.selected = false;

        }
        if (item.children && item.children.length != 0) {
            item.leaf = false;
            item.class = classDetails;
            newObj.push(item);
            this.constructChildTreeObject(item.children, newObj, item.$$treeLevel + 1);

        } else {
            item.leaf = true;
            item.class = classDetails;
            newObj.push(item);
        }
    }
    getSelectedSlugAndPsids(selectedItems: Array<any>): any {
        let slugs: string[] = [];
        let psIds: string[] = [];
        var filteredArray = selectedItems.forEach(function (item) {
            if (item.slug != undefined)
                slugs.push(item.slug);
            else if (item.psid != undefined)
                psIds.push(item.psid);
        });
        return { selectedSlugs: slugs, selectedPsids: psIds };
    }
    filterSelectedSlug(data: Array<any>): Array<any> {


        return data.filter(x => x.selected == true);

        //return $filter('filter')(data, { selected: true }); code conversion done above

    }
    setParentDetails(newObj: Array<any>): void {
        for (var i = 0; i < newObj.length; i++) {
            if (newObj[i].children == undefined || newObj[i].children.length == 0)
                continue;
            for (var j = 0; j < newObj[i].children.length; j++) {
                newObj[i].children[j].parent = i;
            }
        }
    }

    getSelectedRowsCount(item: any, selectedRow: any): any {
        for (var i = 0; i < length; i++) {
            if (item[i].selected) {
                selectedRow.count++;
            }
            if (item[i].children != undefined) {
                this.getSelectedRowsCount(item[i].children, selectedRow);
            }
        }
    }


    checkParentChildCheckBox(item: any, data: Array<any>, checkCount: any): void {



        let totalCount: any = { count: 0 };
        let checkedCount: any = { count: 0 };
        let flag: boolean = true;
        while (flag) {
            let index: number = item.parent;
            if (index == -1 || index == undefined) {
                flag = false;
                continue;
            }
            checkedCount.count = 0;
            let filterLength: number = 0;
            if (data[index].children != undefined) {


                this.getSelectedRowsCount(data[index], checkedCount);



            }

            totalCount.count = data[index].children.length;
            this.getTotalCount(data[index], totalCount);
           // this.getChildCheckedCount(data[index], checkedCount);
            let chkIndex: number = index + 1;
            if (totalCount.count <= (checkedCount.count)) {
                data[index].indeterminate = false;
                data[index].selected = true;
                checkCount.count++;
            }
            else if ((checkCount.count + checkedCount.count) == 0) {
                data[index].selected = false;
                data[index].indeterminate = false;

            }
            else {
                data[index].selected = false;
                data[index].indeterminate = true;
            }
            if (item.parent != -1) {
                item = data[item.parent];
                if (item.parent == -1)
                    flag = false;
            }
        }


    }
    checkItem(item: any, checkCount: any): void {
        debugger;

        if (item.children == undefined) {
            return;
        }

        for (var i = 0; i < item.children.length; i++) {
            item.children[i].selected = item.selected;
            checkCount.Count++;

            if (item.children[i].children != undefined && item.children[i].children.length > 0)
                this.checkItem(item.children[i], checkCount);
        }
    }
    getTotalCount(data: any, totalCount: any): void {
        debugger;
        for (var j = 0; j < data.children.length; j++) {
            let item: any = data.children[j];
            if (item.children == undefined) {
                return;
            }
            if (item.children.length) {
                totalCount.count = totalCount.count + item.children.length;
                this.getTotalCount(item, totalCount);
            }
        }

    }
    getChildCheckedCount(data: any, checkedCount: any): void {
        for (var j = 0; j < data.children.length; j++) {
            var item = data.children[j];

            if (item.children == undefined) {
                return;
            }

            if (item.children.length) {
                // checkedCount.count = checkedCount.count + $filter('filter')(item.children, { selected: true }).length;
                this.getChildCheckedCount(item, checkedCount);
            }
        }
    }
}

















