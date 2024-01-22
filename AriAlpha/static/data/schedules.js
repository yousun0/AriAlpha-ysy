const statusType = [
  {
    id: "todo",
    title:"진행전"
  }, {
    id: "progress",
    title: "진행중"
  }, {
    id: "success",
    title:"완료"
  }
]

const scheduleType = [
  {
    id: "red",
    color: "red",
    title: "작업일정"
  },
  {
    id: "yellow",
    color: "yellow",
    title: "작업일정"
  },
  {
    id: "green",
    color: "green",
    title: "작업일정"
  },
  {
    id: "sky",
    color: "sky",
    title: "작업일정"
  },
  {
    id: "blue",
    color: "blue",
    title: "단지일정"
  },
  {
    id: "purple",
    color: "purple",
    title: "단지일정"
  },
  {
    id: "gray",
    color: "gray",
    title: "단지일정"
  },
]

// null, todo, progress, success

const schedules = [
  { 
    title: "회의", 
    startDate: new Date(2023, 11, 10), 
    endDate: new Date(2023, 11, 12),
    type: "red",
    status: "todo",
    category: 'mypage',
    importance: 2,
  },
  { 
    title: "프로젝트 마감", 
    startDate: new Date(2023, 11, 15),
    endDate: new Date(2023, 11, 21) ,
    type: "blue",
    status: "progress",
    category: 'mypage',
    importance: 0,
  },
  { 
    title: "프로젝트 마감2", 
    startDate: new Date(2023, 11, 25, 11, 0, 0),
    endDate: new Date(2023, 11, 25, 12, 0, 0) ,
    type: "blue",
    status: "progress",
    category: 'mypage',
    importance: 0,
  },
  { 
    title: "프로젝트 마감3", 
    startDate: new Date(2023, 11, 28, 11, 0, 0),
    endDate: new Date(2023, 11, 28, 12, 0, 0) ,
    type: "blue",
    status: "todo",
    category: 'mypage',
    importance: 0,
  },
  { 
    title: "프로젝트 마감0", 
    startDate: new Date(2023, 11, 24, 11, 0, 0),
    endDate: new Date(2023, 11, 28, 12, 0, 0) ,
    type: "blue",
    status: "progress",
    category: 'mypage',
    importance: 0,
  },
  // ... 기타 일정 ...
];

