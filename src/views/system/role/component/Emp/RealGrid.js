import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

const RealGrid = ({ org, setListDetail }) => {
  console.log(org);
  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "dpPath", dataType: "text" },
    { fieldName: "dpNm", dataType: "text" },
    { fieldName: "dpCd", dataType: "text" },
  ];

  var columns = [
    { fieldName: "dpPath", name: "dpPath", width: 300, header: { text: "dpPath" } },
    { fieldName: "dpNm", name: "dpNm", header: { text: "dpNm" } },
    { fieldName: "dpCd", name: "dpCd", width: 70, header: { text: "dpCd" } },
  ];

  var treeProvider, treeView;

  useEffect(() => {
    const container = realgridElement.current;

    treeProvider = new LocalTreeDataProvider(true);
    treeView = new TreeView(container);
    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);
    treeProvider.setRows(org, "dpPath", false, null, null);

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.footer.height = 40;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = true; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("dpPath").visible = false;
    treeView.columnByName("dpCd").visible = false;
    treeView.columnByName("dpNm").editable = false;
    //treeView.columnByName("menuCd").editable = false;

    treeView.treeOptions.iconImagesRoot = "/horizon-ui-chakra/img/";
    treeView.treeOptions.iconImages = [
      "cor2.png",
      "cor2.png",
      "dep2.png",
      "dep.png",
      "cor.png",
      "icon2.png",
      "is.png",
      "kr.png",
      "mx.png",
      "pt.png",
      "us.png",
      "ve.png",
    ];

    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        let cd = grid._dataProvider._rowMap[clickData.dataRow]._values[2];
        setListDetail(cd)
        // let depth = grid._dataProvider._rowMap[clickData.dataRow]._values[3];
        // if (depth !== "0") {
        //   let dpCdData =
        //     grid._dataProvider._rowMap[clickData.dataRow]._values[2];
        //   setMenuDetail(dpCdData);
        // } else if (depth === "0") {
        //   setMenuDetail(0);
        // }
      }
    };

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return (
    <div ref={realgridElement} style={{ height: "500px", width: "100%" }}></div>
  );
};

export default RealGrid;