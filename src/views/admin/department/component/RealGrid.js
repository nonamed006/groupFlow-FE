import { useEffect, useRef, useState } from "react";
import {LocalTreeDataProvider,TreeView  } from "realgrid";
// import { rows } from "./realgrid-data";
import realgridjson from "../realgrid"
import "../css/realgrid-style.css"; // RealGrid CSS 추가



function RealGrid() {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);

  var fields = [
    {fieldName:"area1code", dataType:"text"},
    {fieldName:"area1name", dataType:"text"},
    {fieldName:"area2code", dataType:"text"},
    {fieldName:"area2name", dataType:"text"},
    {fieldName:"area3code", dataType:"text"},
    {fieldName:"area3name", dataType:"text"},
    {fieldName:"treeId", dataType:"text"},
    {fieldName:"treeName", dataType:"text"},
    {fieldName:"iconField", dataType:"text"}
  ]
  
  var columns = [
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
 


  var treeProvider, treeView;
  useEffect(() => {
  const container = realgridElement.current;
  treeProvider = new LocalTreeDataProvider();
  treeView = new TreeView(container);

  treeView.setDataSource(treeProvider);
  treeProvider.setFields(fields);
  treeView.setColumns(columns);

  treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
  treeView.displayOptions.rowHeight = 36;
  treeView.header.height = 40;
  treeView.footer.height = 40;
  treeView.stateBar.width = 16;
  treeView.treeOptions.iconImagesRoot = "/horizon-ui-chakra/img/";
  treeView.treeOptions.iconImages = [
       "kr.png", "de.png", "es.png", "fr.png", "cor.png", "icon2.png", "is.png",
       "kr.png", "mx.png", "pt.png", "us.png", "ve.png"
   ]
   
   let data;
   console.log(realgridjson)
   treeView.onCurrentChanged = function (grid, clickData) {
    data = clickData.dataRow;
    console.log(data)
    
    console.log(realgridjson[data])
  }

  treeProvider.setRows(realgridjson, 'treeId', true, null, "iconField");
  return () => {

      treeProvider.clearRows();
      treeView.destroy();
      treeProvider.destroy();
    };
  }, []);

  return <div ref={realgridElement} style={{ height: "500px", width: "80%" }}>
   
  </div>;
}

export default RealGrid;