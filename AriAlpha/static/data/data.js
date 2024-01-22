const theme_data = [
  {
    type: 'image',
    background: '/assets/img/bg-1.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-2.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-3.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-4.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-5.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-6.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-7.jpg',
    class: 'primary-green',
  },{
    type: 'image',
    background: '/assets/img/bg-8.jpg',
    class: 'primary-green',
  },{
    type: 'color',
    background: '',
    class: 'primary-navy',
  },{
    type: 'color',
    background: '',
    class: 'primary-yellow',
  },{
    type: 'color',
    background: '',
    class: 'primary-purple',
  }
]

// Grid Options: Contains all of the grid configurations

const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [
    { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
    { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
    { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
  ],
  // Column Definitions: Defines & controls grid columns.
  columnDefs: [
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" }
  ]
};

const gridData = {
  gridOptions: gridOptions
}