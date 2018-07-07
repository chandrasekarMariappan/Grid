angular
    .module('pocModule', ['treeTable'])
    //.factory('', [])
    .controller('pocCtrl', function ($scope, $timeout) {
        var data = [
            {
                name: 'Mac', partNumber: '30001MQD32LL/A', children: [{
                name: 'MacBook', partNumber: '30001MQD31LL/A', children: []
            },
                {name: 'MacBook Air', partNumber: '30001MQD31LL/A', children: []},
                {name: 'MacBook Pro', partNumber: '30001MQD31LL/A', children: []},
                {name: 'iMac', partNumber: '30001MQD31LL/A', children: []},
                {name: 'iMac Pro', partNumber: '30001MQD31LL/A', children: []}
            ]
            }
            ,
            {
                name: 'iPad', partNumber: '30001MQD31LL/A', children: [{
                name: 'iPad Pro', partNumber: '30001MQD31LL/A', children: []
            },
                {name: 'iPad mini 4', partNumber: '30001MQD31LL/A', children: []}
            ]
            }
            ,
            {
                name: 'iPhone', partNumber: '30001MQD32LL/A', children: [
                {name: 'iPhone6', partNumber: '30001MQD33LL/A', children: []},
                {name: 'iPhone5', partNumber: '30001MQD34LL/A', children: []},
                {name: 'iPhone7', partNumber: '30001MQD35LL/A', children: []}
            ]
            },
            {
                name: 'Watch', partNumber: '30001MQD36LL/A', children: [
                {
                    name: 'Apple Watch Series 3', partNumber: '30001MQD33LL/A', children: [{
                    name: 'Apple Watch Series4' +
                    ' 31', partNumber: '30001MQD33LL/A', children: []
                }, {
                    name: 'Apple Watch Series5' +
                    ' 31', partNumber: '30001MQD33LL/A', children: []
                }, {
                    name: 'Apple Watch Series6' +
                    ' 31', partNumber: '30001MQD3398LL/A', children: []
                }]
                },
                {name: 'Apple Watch Nike+', partNumber: '30001MQD33LL/A', children: []},
                {name: 'Apple Watch Hermès', partNumber: '30001MQD33LL/A', children: []},
                {name: 'Apple Watch Edition', partNumber: '30001MQD33LL/A', children: []},
                {name: 'Apple Watch Series 1', partNumber: '30001MQD33LL/A', children: []}
            ]
            },
            {
                name: 'TV', partNumber: '30001MQD37LL/A', children: [
                {name: 'Apple TV 4K', partNumber: '30001MQD13LL/A', children: []},
                {name: 'Apple TV', partNumber: '30001MQD12LL/A', children: []}
            ]
            },
            {
                name: 'Accessories', partNumber: '30001MQD39LL/A', children: []
            }
        ];
        var adminData = [
            {
                firstName: 'jhon',
                lastName: 'jhon',
                emailAddress: 'sample@bridge2solutions.com',
                status: 'Active',
                action: 'Edit',
                permissionDetails: {
                    employerDetails: false,
                    appleProductCatlog: false,
                    employeeRequests: false
                }
            },
            {
                firstName: 'jhon1',
                lastName: 'jhon1',
                emailAddress: 'sample2@bridge2solutions.com',
                status: 'Active',
                action: 'Edit',
                permissionDetails: {
                    employerDetails: true,
                    appleProductCatlog: true,
                    employeeRequests: true
                }
            }
        ];

        $scope.productDetails = {};
        $scope.productDetails.header = [{
            name: "Family - SubFamily - Product Name",
            sort: {name: "name", order: "asc"}
        }, {
            name: "Part Number",
            sort: {name: 'partNumber', order: "asc"}
        }];
        $scope.productDetails.data = data;


        $scope.adminDetails = {};
        $scope.adminDetails.header = [{name: ""},
            {name: "First Name", sort: {name: "firstName", order: "asc"}},
            {name: "Last Name", sort: {name: "lastName", order: "asc"}},
            {name: "Email Address", sort: {name: "emailAddress", order: "asc"}},
            {name: "Status", sort: {name: "status", order: "asc"}},
            {name: "Action"}];
        $scope.adminDetails.permissionLabels = {
            employerDetails: "Employer Details", appleProductCatlog: "Apple" +
            " Product Catalog", employeeRequests: "Employee Details"
        };
        $scope.adminDetails.data = addExtraProperties(adminData, $scope.adminDetails.permissionLabels);

        var requestData = [
            {
                requestDate: 'Monday,June 5th 2017',
                requestor: 'Andy Smith',
                emailAddress: 'sample@bridge2solutions.com',
                itemCount: '1',
                employeeSpecifiedAddress: true,
                actions: {reject: "Reject", approve: "Approve"},
                children: [{
                    requestDate: 'Monday,June 5th 2017',
                    requestor: 'Andy Smith1',
                    emailAddress: 'sample1@bridge2solutions.com',
                    itemCount: '1',
                    employeeSpecifiedAddress: true,
                    actions: {reject: "Reject", approve: "Approve"},
                    children: []
                },
                    {
                        requestDate: 'Monday,June 5th 2017',
                        requestor: 'Andy Smith2',
                        emailAddress: 'sample2@bridge2solutions.com',
                        itemCount: '1',
                        employeeSpecifiedAddress: true,
                        actions: {reject: "Reject", approve: "Approve"},
                        children: []
                    },
                    {
                        requestDate: 'Monday,June 5th 2017',
                        requestor: 'Andy Smith3',
                        emailAddress: 'sample3@bridge2solutions.com',
                        itemCount: '1',
                        employeeSpecifiedAddress: true,
                        actions: {reject: "Reject", approve: "Approve"},
                        children: []
                    },
                    {
                        requestDate: 'Monday,June 5th 2017',
                        requestor: 'Andy Smith4',
                        emailAddress: 'sample4@bridge2solutions.com',
                        itemCount: '1',
                        employeeSpecifiedAddress: true,
                        actions: {reject: "Reject", approve: "Approve"},
                        children: []
                    }
                ]
            }];

        $scope.requestDetails = {};


        $scope.requestDetails.header = [
            {name: "Request Date", sort: {name: "requestDate", order: 'asc'}},
            {name: "Requestor", sort: {name: "requestor", order: 'asc'}},
            {name: "Email Address", sort: {name: "emailAddress", order: 'asc'}},
            {name: "Item Count", sort: {name: "itemCount", order: 'asc'}},
            {name: "Employee specified Address", sort: {name: "employeeSpecifiedAddress", order: 'asc'}},
            {name: "Actions"}
        ];
        $scope.requestDetails.data = requestData;
    });



