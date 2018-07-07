/**
 * Created by cmariappan on 10/19/2017.
 */
var sort_by = function () {
    var fields = [].slice.call(arguments),
        n_fields = fields.length;

    return function (A, B) {

        var a, b, field, key, primer, reverse, result;
        for (var i = 0, l = n_fields; i < l; i++) {
            result = 0;
            field = fields[i];

            key = typeof field === 'string' ? field : field.name;

            a = A[key];
            b = B[key];
            if (a != undefined)
                a = a.toLocaleLowerCase();
            if (b != undefined)
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

function constructFilteredObject(data, sortObj) {
    var reverse = false;
    var name = sortObj.name;
    reverse = sortObj.order == "asc" ? false : true;

    var result = data.sort(sort_by({name: name, reverse: reverse}));

    recursive_sort(result, name, reverse);
}

function recursive_sort(data, name, reverse) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].children != undefined && data[i].children.length > 0) {
            data[i].children.sort(sort_by({name: name, reverse: reverse}));
            recursive_sort(data[i].children, name, reverse);
        }
    }
}

function addExtraProperties(items, label) {
    $.each(items, function (ind, o) {
        o.expend = false;
        o.permissionLabels = label;
    });
    return items;
}

function constructTreeObject(tree, tableId) {
    var newObj = [];
    var level = 0;
    var index = 0;
    var isExpend = false;
    var classDetails = "";
    for (var i = 0; i < tree.length; i++) {
        index = newObj.length;
        var parentDetails = [];
        var parentIndex = [];
        var childrenCount = 0;
        var o = tree[i];
        classDetails = tableId;
        o.parent = [];
        o.parentIndex = [];


        o.checked = false;
        if (o.children && o.children.length != 0) {
            o.level = level;
            o.leaf = false;
            o.parentId = i;
            classDetails = "hide";
            o.indeterminate = false;
            newObj.push(o);

            //if (o.children) {
            o.expend = isExpend;
            classDetails = classDetails + " " + "row" + index + tableId;
            parentDetails.push(index);
            parentIndex.push(i);
            index++;
            recursive_Child(o.children, newObj, o.level + 1, isExpend, classDetails, index, parentDetails, tableId, parentIndex);
            // }
        } else {
            o.level = level;
            o.class = classDetails;
            o.leaf = true;
            o.parent = Object.assign([], parentDetails);
            newObj.push(o);
            index++;

        }
    }
    return newObj;
}

function checkItem(item, checkCount) {

    $.each(item.children, function (ind, o) {
        if (!o.checked) {
            o.class = o.class + " checked";

        }
        else {
            o.class = o.class.replace(/checked/g, " ");

        }
        o.checked = item.checked;

        if (o.children.length > 0) {
            checkItem(o, checkCount);
        }
    });

}

function recursive_Child(obj, newObj, level, isExpend, classDetails, index, parentDetails, tableId, parentIndex) {
    angular.forEach(obj, function (o, ind) {
        o.parent = Object.assign([], parentDetails);
        if (o.children && o.children.length != 0) {
            o.level = level;
            o.leaf = false;
            o.parentId = ind;
            newObj.push(o);
            if (o.children) {
                o.expend = isExpend;
                o.class = classDetails;
                classDetails = classDetails + " " + "row" + index + tableId;
                parentDetails.push(index);
                parentIndex.push(ind);
                index++;
                recursive_Child(o.children, newObj, o.level + 1, isExpend, classDetails, index, parentDetails, tableId, parentIndex);
            }
        } else {
            o.level = level;
            o.class = classDetails;
            o.parent = Object.assign([], parentDetails);
            o.parentIndex = Object.assign([], parentIndex);
            o.leaf = true;
            newObj.push(o);
            index++;
            return false;
        }
    });
}

function checkExpand(item, isExpend, filteredObj) {
    $.each(item.children, function (ind, o) {
        if (!isExpend)
            o.class = o.class + " hide";
        else
            o.class = o.class.replace(/hide/g, " ");
        filteredObj.class = o.class;

        if (o.children && !isExpend || o.children && o.expend)
            checkExpand(o, isExpend, filteredObj);
    });
}

angular.module('treeTable', ['ngSanitize']).directive('treeview', function ($timeout, $filter) {
    return {
        //template:'<div ng-include="tmpUrl"></div>',
        templateUrl: function (elem, attrs) {

            return attrs.tmpUrl;
        },
        link: function (scope, element, attrs) {

            var dt;
            //Right now check first column sort object if no object find use first column (need to pass dynamic param)
            var sortObj = scope.options.header[0].sort == undefined ? scope.options.header[1].sort : scope.options.header[0].sort;
            constructFilteredObject(scope.options.data, sortObj);
            scope.updateOptions = constructTreeObject(scope.options.data, element[0].id);
            scope.sort = function (sortObj) {
                scope.isSort = true;
                if (sortObj.order == "asc")
                    sortObj.order = "desc";
                else
                    sortObj.order = "asc";
                constructFilteredObject(scope.options.data, sortObj);
                var newObj = [];
                var parentDetails = [];
                var index = 0;
                constructTreeObjectAfterSort(scope.options.data, newObj);
                setParentDetails(newObj);
                scope.updateOptions = newObj;
            }
            function constructTreeObjectAfterSort(data, newObj) {
                angular.forEach(data, function (o, ind) {
                    newObj.push(o);
                    if (o.children && o.children.length != 0) {
                        constructTreeObjectAfterSort(o.children, newObj);
                    }
                });
            }

            function setParentDetails(newObj) {
                var parentDetails = [];
                var preLevel = "";
                var levelParentDetails = {};
                for (var i = 0; i < newObj.length; i++) {
                    var level = newObj[i].level;
                    if (level == 0) {
                        parentDetails = [];
                        levelParentDetails = {};
                        preLevel = level;
                        newObj[i].parent = Object.assign({}, parentDetails);
                        parentDetails.push(i);

                    }
                    else if (level != 0) {
                        if (preLevel != level && !newObj[i].leaf) {
                            preLevel = level;
                            if (levelParentDetails[level] == undefined) {
                                levelParentDetails[level] = Object.assign([], parentDetails);
                            }
                            parentDetails.push(i);
                        }
                        else {
                            if (levelParentDetails[level] == undefined) {
                                levelParentDetails[level] = Object.assign([], parentDetails);
                            }
                        }
                        newObj[i].parent = levelParentDetails[level];

                    }


                }
            }

            scope.export = function () {

                var table = $(element[0]).find('table');
                scope.exportToCsv(table);

            }
            scope.exportTable = function (id) {
                var table = $('#'+id);
                scope.exportToCsv(table);

            }
            scope.exportToCsv = function (table) {

                $(table).tableToCSV({fileName:"SamplePOC"});
            }

            scope.itemCheckClick = function (id, item) {

                var checkCount = {count: 0};
                if (item.checked) {
                    item.class = item.class + " checked";
                    //checkCount.count++;
                }
                else {
                    item.class = item.class.replace(/checked/g, " ");
                    //checkCount.count--;

                }


                checkItem(item, checkCount);
                var totalCount = {count: 0};
                var checkedCount = {count: 0};


                for (var i = item.parent.length - 1; i >= 0; i--) {
                    var index = item.parent[i];
                    var rowClass = ' .row' + index + element[0].id;
                    if (item.parent.length > 0 && i == 0)
                        checkedCount.count = 0;
                    var filterResult = $filter('filter')(scope.updateOptions[index].children, {checked: true});
                    var filterLength = (filterResult == undefined) ? 0 : filterResult.length;
                    checkedCount.count = checkedCount.count + filterLength;
                    totalCount.count = scope.updateOptions[index].children.length;
                    getTotalCount(scope.updateOptions[index], totalCount);

                    //checkedCount.count = checkedCount.count +
                    // $filter('filter')(scope.updateOptions[index].children, {checked: true}).length;

                    getChildCheckedCount(scope.updateOptions[index], checkedCount);


                    //  var checkedCount = $('#' + element[0].id + rowClass + '.checked').length;
                    var chkIndex = index + 1;
                    if (totalCount.count <= ( checkedCount.count)) {
                        // $('#' + element[0].id + ' #chkBox' + chkIndex).prop('checked', 'checked');
                        scope.updateOptions[index].indeterminate = false;
                        scope.updateOptions[index].checked = true;
                        scope.updateOptions[index].class = scope.updateOptions[index].class + " checked";
                        checkCount.count++;
                    }
                    else if ((checkCount.count + checkedCount.count) == 0) {
                        //$('#chkBox' + chkIndex).data('checked',0);
                        // $('#' + element[0].id + ' #chkBox' + chkIndex).prop('checked', false);
                        scope.updateOptions[index].checked = false;
                        scope.updateOptions[index].indeterminate = false;
                    }
                    else {
                        scope.updateOptions[index].checked = false;
                        scope.updateOptions[index].indeterminate = true;
                        if (scope.updateOptions[index].class)
                            scope.updateOptions[index].class = scope.updateOptions[index].class.replace(/checked/g, " ");
                    }

                }

                //  $timeout(scope.checkHideRows, 50);

            }


            function getTotalCount(data, totalCount) {

                for (var j = 0; j < data.children.length; j++) {
                    var item = data.children[j];
                    if (item.children.length) {
                        totalCount.count = totalCount.count + item.children.length;
                        getTotalCount(item, totalCount);
                    }
                }

            }

            function getChildCheckedCount(data, checkedCount) {
                for (var j = 0; j < data.children.length; j++) {
                    var item = data.children[j];
                    if (item.children.length) {
                        checkedCount.count = checkedCount.count + $filter('filter')(item.children, {checked: true}).length;
                        getChildCheckedCount(item, checkedCount);
                    }
                }
            }


            scope.checkHideRows = function () {
                var items = dt.rows({filter: 'applied'}).nodes();
                if ($('#' + element[0].id + '_filter input').val().length > 0)
                    for (var i = 0; i < items.length; i++) {
                        if ($(items[i]).hasClass('hide'))
                            $(items[i]).removeClass('hide').addClass('showRow');
                    }
            }
            scope.itemClick = function (id, item, name) {

                if (item.expend)
                    item.expend = false;
                else
                    item.expend = true;

                var filteredObj = $filter('filter')(scope.options.data, name);
                filteredObj.expend = item.expend;
                checkExpand(item, item.expend, filteredObj);


            };
        },
        scope: {
            options: "=",
            tmpUrl: "="
        }
    }
}).directive('indeterminate', function () {
    return {
        restrict: 'A',
        link(scope, elem, attr) {
            var watcher = scope.$watch(attr.indeterminate, function (value) {

                elem[0].indeterminate = value;
            });
            scope.$on('$destroy', function () {
                watcher();
            });
        }
    };
}).directive('addRow', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            item: '=',
            index: "=",
            itemClick: '&'
        },
        link: function (scope) {

            scope.itemClick = function (value, c) {


            }
        }
    }
}).directive('arrowHead', function ($compile, $interpolate) {
    return {
        restrict: "E",
        templateUrl: "partials/arrowHead.html",
        link: function (scope) {
            scope.itemClick = function (index, item) {
                var template = '<tr id="child{{$index}}">' +
                    '<td colspan="6" style="background-color: #f9f9f9 !important;">' +
                    '<div class="border">' +
                    '<div id="work-place" class="pull-left">' +
                    '{{item.emailAddress}} Workplace Permissions' +
                    '</div>' +
                    '<div class="pull-left">' +
                    'These are the workplaces {{item.emailAddress}} can access. Click the Edit button in the Actions column to changes these permissions' +
                    '</div>' +
                    '<div class="pull-left"><input type="checkbox"' +
                    'ng-model="item.permissionDetails.employerDetails"' +
                    'ng-checked="item.permissionDetails.employerDetails">' +
                    '{{item.permissionLabels.employerDetails}}</div>' +
                    '<div class="pull-left"><input type="checkbox"' +
                    'ng-model="item.permissionDetails.appleProductCatlog"' +
                    'ng-checked="item.permissionDetails.appleProductCatlog">' +
                    '{{item.permissionLabels.appleProductCatlog}}</div>' +
                    '<div class="pull-left"><input type="checkbox" ng-model="item.permissionDetails.employeeRequests"' +
                    ' ng-checked="item.permissionDetails.employeeRequests"> {{item.permissionLabels.employeeRequests}}</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';
                if (item.expend) {
                    item.expend = false;
                    $('#child' + index).remove();
                }
                else {
                    item.expend = true;
                    var $this = $('#row' + index),
                        $parentTR = $this.closest('tr');
                    $child = $compile(template)(scope);
                    $child.insertAfter($parentTR);
                }
            }
        }
    }
});


