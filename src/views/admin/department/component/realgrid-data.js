import { ValueType } from "realgrid";

export const fields = [
    {fieldName:"area1code", dataType:"text"},
    {fieldName:"area1name", dataType:"text"},
    {fieldName:"area2code", dataType:"text"},
    {fieldName:"area2name", dataType:"text"},
    {fieldName:"area3code", dataType:"text"},
    {fieldName:"area3name", dataType:"text"},
    {fieldName:"treeId", dataType:"text"},
    {fieldName:"treeName", dataType:"text"},
    {fieldName:"iconField", dataType:"text"}
  ];

export const columns = [
    {fieldName:"treeName", name:"treeName", width: 150, header:{text:"지역명"}},
    {fieldName:"treeId", name:"treeId", header:{text:"TreeID"}},
    {fieldName:"area1code", name:"area1code", header:{text:"시도코드"}},
    {fieldName:"area1name", name:"area1name", header:{text:"시도명"}},
    {fieldName:"area2code", name:"area2code", header:{text:"시군구코드"}},
    {fieldName:"area2name", name:"area2name", header:{text:"시군구명"}},
    {fieldName:"area3code", name:"area3code", header:{text:"읍면동코드"}},
    {fieldName:"area3name", name:"area3name", header:{text:"읍면동명"}},
    {fieldName:"iconField", name:"iconField"}
  ];

export const rows = [
  {
    "treeId": "11",
    "treeName": "서울특별시",
    "area1code": "11",
    "area1name": "서울특별시",
    "iconField": 4
  },
  {
    "treeId": "11.010",
    "treeName": "종로구",
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "iconField": 4
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101053",
    "area3name": "사직동",
    "date1": "20160416",
    "treeId": "11.010.53",
    "treeName": "사직동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101054",
    "area3name": "삼청동",
    "treeId": "11.010.54",
    "treeName": "삼청동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101055",
    "area3name": "부암동",
    "treeId": "11.010.55",
    "treeName": "부암동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101056",
    "area3name": "평창동",
    "treeId": "11.010.56",
    "treeName": "평창동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101057",
    "area3name": "무악동",
    "treeId": "11.010.57",
    "treeName": "무악동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101058",
    "area3name": "교남동",
    "treeId": "11.010.58",
    "treeName": "교남동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101060",
    "area3name": "가회동",
    "treeId": "11.010.60",
    "treeName": "가회동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101061",
    "area3name": "\"종로1.2.3.4가동\"",
    "treeId": "11.010.61",
    "treeName": "\"종로1.2.3.4가동\""
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101063",
    "area3name": "종로5.6가동",
    "treeId": "11.010.63",
    "treeName": "종로5.6가동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101064",
    "area3name": "이화동",
    "treeId": "11.010.64",
    "treeName": "이화동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101067",
    "area3name": "창신제1동",
    "treeId": "11.010.67",
    "treeName": "창신제1동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101068",
    "area3name": "창신제2동",
    "treeId": "11.010.68",
    "treeName": "창신제2동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101069",
    "area3name": "창신제3동",
    "treeId": "11.010.69",
    "treeName": "창신제3동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101070",
    "area3name": "숭인제1동",
    "treeId": "11.010.70",
    "treeName": "숭인제1동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101071",
    "area3name": "숭인제2동",
    "treeId": "11.010.71",
    "treeName": "숭인제2동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101072",
    "area3name": "청운효자동",
    "treeId": "11.010.72",
    "treeName": "청운효자동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11010",
    "area2name": "종로구",
    "area3code": "1101073",
    "area3name": "혜화동",
    "treeId": "11.010.73",
    "treeName": "혜화동"
  },
  {
    "treeId": "11.020",
    "treeName": "중구",
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "iconField": 2
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102052",
    "area3name": "소공동",
    "treeId": "11.020.52",
    "treeName": "소공동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102054",
    "area3name": "회현동",
    "treeId": "11.020.54",
    "treeName": "회현동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102055",
    "area3name": "명동",
    "treeId": "11.020.55",
    "treeName": "명동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102057",
    "area3name": "필동",
    "treeId": "11.020.57",
    "treeName": "필동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102058",
    "area3name": "장충동",
    "treeId": "11.020.58",
    "treeName": "장충동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102059",
    "area3name": "광희동",
    "treeId": "11.020.59",
    "treeName": "광희동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102060",
    "area3name": "을지로동",
    "treeId": "11.020.60",
    "treeName": "을지로동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102065",
    "area3name": "신당제5동",
    "treeId": "11.020.65",
    "treeName": "신당제5동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102067",
    "area3name": "황학동",
    "treeId": "11.020.67",
    "treeName": "황학동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102068",
    "area3name": "중림동",
    "treeId": "11.020.68",
    "treeName": "중림동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102069",
    "area3name": "신당동",
    "treeId": "11.020.69",
    "treeName": "신당동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102070",
    "area3name": "다산동",
    "treeId": "11.020.70",
    "treeName": "다산동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102071",
    "area3name": "약수동",
    "treeId": "11.020.71",
    "treeName": "약수동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102072",
    "area3name": "청구동",
    "treeId": "11.020.72",
    "treeName": "청구동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11020",
    "area2name": "중구",
    "area3code": "1102073",
    "area3name": "동화동",
    "treeId": "11.020.73",
    "treeName": "동화동"
  },
  {
    "treeId": "11.030",
    "treeName": "용산구",
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "iconField": 3
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103051",
    "area3name": "후암동",
    "treeId": "11.030.51",
    "treeName": "후암동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103052",
    "area3name": "용산2가동",
    "treeId": "11.030.52",
    "treeName": "용산2가동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103053",
    "area3name": "남영동",
    "treeId": "11.030.53",
    "treeName": "남영동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103057",
    "area3name": "원효로2동",
    "treeId": "11.030.57",
    "treeName": "원효로2동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103058",
    "area3name": "효창동",
    "treeId": "11.030.58",
    "treeName": "효창동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103059",
    "area3name": "용문동",
    "treeId": "11.030.59",
    "treeName": "용문동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103063",
    "area3name": "이촌1동",
    "treeId": "11.030.63",
    "treeName": "이촌1동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103064",
    "area3name": "이촌2동",
    "treeId": "11.030.64",
    "treeName": "이촌2동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103065",
    "area3name": "이태원1동",
    "treeId": "11.030.65",
    "treeName": "이태원1동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103066",
    "area3name": "이태원2동",
    "treeId": "11.030.66",
    "treeName": "이태원2동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103069",
    "area3name": "서빙고동",
    "treeId": "11.030.69",
    "treeName": "서빙고동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103070",
    "area3name": "보광동",
    "treeId": "11.030.70",
    "treeName": "보광동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103071",
    "area3name": "청파동",
    "treeId": "11.030.71",
    "treeName": "청파동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103072",
    "area3name": "원효로1동",
    "treeId": "11.030.72",
    "treeName": "원효로1동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103073",
    "area3name": "한강로동",
    "treeId": "11.030.73",
    "treeName": "한강로동"
  },
  {
    "area1code": "11",
    "area1name": "서울특별시",
    "area2code": "11030",
    "area2name": "용산구",
    "area3code": "1103074",
    "area3name": "한남동",
    "treeId": "11.030.74",
    "treeName": "한남동"
  }
]
