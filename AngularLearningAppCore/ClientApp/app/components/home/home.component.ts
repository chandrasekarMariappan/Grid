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
                name: 'John98'+i, score: 130+i, city: 'New York', birthday: '1980/2/5', children: [
                    { name: 'John2'+i, score: 82+i, city: 'San Fran1', birthday: '1990/1/21' },
                    {
                        name: 'John2'+i, score: 81+i, city: 'San Fran2', birthday: '1990/1/22', children:
                        [{
                            name: 'John3'+1, score: 89+i, city: 'San Francisco'+i, birthday: '1990/1/21', children: [
                                { name: 'Tom1', score: 77+i, city: 'San Francisco'+i, birthday: '1990/1/21' },
                                { name: 'Tom2', score: 85+i, city: 'San Francisco'+i, birthday: '1990/1/21' },
                                { name: 'Tom3', score: 83+i, city: 'San Francisco'+i, birthday: '1990/1/21' }
                            ]
                        }]
                    }
                ]
            });
        }


    }
    treeObject: any = [
        {
            name: 'JohnFirstname', score: 130, city: 'New York', birthday: '1980/2/5', children: [
                { name: 'John2', score: 82, city: 'San Fran1', birthday: '1990/1/21' },
                {
                    name: 'John3', score: 81, city: 'San Fran2', birthday: '1990/1/22', children:
                    [{
                        name: 'John4', score: 89, city: 'San Francisco', birthday: '1990/1/21', children: [
                            { name: 'Tom1', score: 77, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom2Kumari', score: 85, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom3', score: 83, city: 'San Francisco', birthday: '1990/1/21' }
                        ]
                    }]
                }
            ]
        
        },
        {
            name: 'John98', score: 130, city: 'New York', birthday: '1980/2/5', children: [
                { name: 'John2', score: 82, city: 'San Fran1', birthday: '1990/1/21' },
                {
                    name: 'John2', score: 81, city: 'San Fran2', birthday: '1990/1/22', children:
                    [{
                        name: 'John3', score: 89, city: 'San Francisco', birthday: '1990/1/21', children: [
                            { name: 'Tom1', score: 77, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom2', score: 85, city: 'San Francisco', birthday: '1990/1/21' },
                            { name: 'Tom3', score: 83, city: 'San Francisco', birthday: '1990/1/21' }
                        ]
                    }]
                }
            ]
        }

    ];

    fTreeObject: any = [];


    newObj: any = [];
    level: number = 0;
    classDetails: any = "";

    constructor() {
        debugger;

        this.addSampleRows(1000);



        this.fTreeObject = this.constructTreeObject(this.treeObject);
        this.setParentDetails(this.fTreeObject);
        debugger;
    }

    getDetails(level: any): string {

        return (level * 30) + "px";
    }






    filter(object: Array<any>, key: any): Array<any> {

        return object.filter(x => {
            x.includes(key);
        })

    }



    itemCheckClick(id: number, item: any): void {
        debugger;
        var checkCount = { count: 0 };
        if (item.checked) {
            item.class = item.class + " checked";
            //checkCount.count++;
        }
        else {
            item.class = item.class.replace(/checked/g, " ");
            //checkCount.count--;

        }


        this.checkItem(item);
        var totalCount = { count: 0 };
        var checkedCount = { count: 0 };

        this.checkParentChildCheckBox(item, this.fTreeObject);

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
        //return $filter('filter')(data, { selected: true });
        return [];
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
    checkParentChildCheckBox(item: any, data: Array<any>): void {
        let checkCount: any = { count: 0 };
        //filteredItem: any = $filter('filter')(data, { slug: item.slug, name: item.name, $$hashKey: item.$$hashKey });
        //checkItem(filteredItem[0], checkCount);
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
                // let filterResult: Array<any> = $filter('filter')(data[index].children, { selected: true });
                //let filterLength = (filterResult == undefined) ? 0 : filterResult.length;
            }
            checkedCount.count = checkedCount.count + filterLength;
            totalCount.count = data[index].children.length;
            this.getTotalCount(data[index], totalCount);
            this.getChildCheckedCount(data[index], checkedCount);
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
    checkItem(item: any): void {
        debugger;
        for (var i = 0; i < item.children; i++) {
            item.children[i].selected = item.selected;
            if (item.children[i].children.length > 0)
                this.checkItem(item.children[i]);
        }
    }
    getTotalCount(data: any, totalCount: any): void {
        debugger;
        for (var j = 0; j < data.children.length; j++) {
            let item: any = data.children[j];
            if (item.children.length) {
                totalCount.count = totalCount.count + item.children.length;
                this.getTotalCount(item, totalCount);
            }
        }

    }
    getChildCheckedCount(data: any, checkedCount: any): void {
        for (var j = 0; j < data.children.length; j++) {
            var item = data.children[j];
            if (item.children.length) {
                // checkedCount.count = checkedCount.count + $filter('filter')(item.children, { selected: true }).length;
                this.getChildCheckedCount(item, checkedCount);
            }
        }
    }
}

















