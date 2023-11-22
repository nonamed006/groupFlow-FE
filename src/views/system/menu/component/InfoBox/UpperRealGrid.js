import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
//import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

const RealGrid = ({ org, getValue }) => {
  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "menuPath", dataType: "text" },
    { fieldName: "menuNm", dataType: "text" },
    { fieldName: "menuCd", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
  ];

  var columns = [
    {
      fieldName: "menuNm",
      name: "menuNm",
      width: 380,
      header: { text: "menuNm" },
    },
    { fieldName: "menuPath", name: "menuPath", header: { text: "menuPath" } },
    {
      fieldName: "menuCd",
      name: "menuCd",
      header: { text: "menuCd" },
    },
    { fieldName: "depth", name: "depth", header: { text: "depth" } },
  ];

  var treeProvider, treeView;

  useEffect(() => {
    const container = realgridElement.current;

    treeProvider = new LocalTreeDataProvider(true);
    treeView = new TreeView(container);
    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);
    //treeProvider.setRows(org, "menuPath", false, null, "depth");
    treeProvider.setObjectRows({ rows: org }, "rows", "", "");

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
    treeView.columnByName("menuPath").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("menuCd").visible = false;
    treeView.columnByName("menuNm").editable = false;
    //treeView.columnByName("menuCd").editable = false;

    treeView.treeOptions.iconImagesRoot = "/img/";
    treeView.treeOptions.iconImages = [
      "department.png",
    ];
    treeView.treeOptions.defaultIcon = 0;

    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        let menuCd = grid._dataProvider._rowMap[clickData.dataRow];
        getValue(menuCd);
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

    // depth에 따른 색상 추가 - 안은비...
    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      if (depth === "1") {
        return "gnb-column";
      } else if (depth === "2") {
        return "bottom-gnb-column";
      }
    });

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
