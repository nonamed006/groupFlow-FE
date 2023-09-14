import { useEffect, useRef, useState } from "react";
import {LocalTreeDataProvider,TreeView  } from "realgrid";
// import { rows } from "./realgrid-data";
import realgridjson from "../realgrid"

import "../css/realgrid-style.css"; // RealGrid CSS 추가
import {PORT} from "set";
import { useSelector } from "react-redux";



function RealGrid() {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const realgridElement = useRef(null);
  const [getOrg, setGetOrg] = useState([]);
  const org = useSelector((state) => state.solution.dataPk);
  console.log(org);

  var fields = [
    {fieldName:"dpPath", dataType:"text"},
    {fieldName:"dpNm", dataType:"text"},
    {fieldName:"iconField", dataType:"text"}
  ]
  
  var columns = [
    {fieldName:"dpNm", name:"dpNm", width: 150, header:{text:"명칭"}},
    {fieldName:"dpPath", name:"dpPath", header:{text:"dpPath"}},
    {fieldName:"iconField", name:"iconField"}
  ];
  const searchOrg = () => {
		let url = `${PORT}/dep?text=부&coNm=string`;
		fetch(url, {method : "GET" })	
			.then(res=>res.json())
			.then(res=>{
        console.log(res)
        
				treeProvider.setRows(res, 'dpPath', true, null, "iconField");
      })
  };

  var treeProvider, treeView;
  useEffect(() => {
  searchOrg();
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
   console.log(getOrg)
   
   treeView.onCurrentChanged = function (grid, clickData) {
    data = clickData.dataRow;
    console.log(data)
    
    console.log(realgridjson[data])
   
  }

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