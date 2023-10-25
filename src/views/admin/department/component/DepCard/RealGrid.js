import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "../../../roleGroup/component/roleMenuRealgrid.css"; // RealGrid CSS 추가

const RealGrid = ({ org, setDpCd, setEditState, setTabStatus }) => {

  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "path", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "code", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "iconField", dataType: "text" },
  ];

  var columns = [
    { fieldName: "name", name: "name", width: 300, header: { text: "명칭" } },
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "code", name: "code", width: 150, header: { text: "code" } },
    { fieldName: "depth", name: "depth", header: { text: "depth" } },
    { fieldName: "iconField", name: "iconField" },
  ];

  var treeProvider, treeView;

  useEffect(() => {
    const container = realgridElement.current;

    treeProvider = new LocalTreeDataProvider(true);
    treeView = new TreeView(container);
    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);
    treeProvider.setObjectRows({ rows: org }, "rows", "", "iconField");
    //treeProvider.setObjectRows(org, "path", false, null, "depth");

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;

    treeView.displayOptions.useFocusClass = true; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("iconField").visible = false;
    treeView.columnByName("name").editable = false;
    treeView.treeOptions.iconImagesRoot = "/img/";
    treeView.treeOptions.iconImages = ["corporation.png", "department.png"];

    //treeView.orderBy("path", "depth");
    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        let depth = grid._dataProvider._rowMap[clickData.dataRow]._values[3];
        if (depth !== "0") {
          let dpCdData =
            grid._dataProvider._rowMap[clickData.dataRow]._values[2];
          setDpCd(dpCdData);
          setTabStatus(1);
          setEditState("read");
        } else if (depth === "0") {
          setDpCd(0);
        }
      }
    };

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return (
    <div ref={realgridElement} style={{ height: "500px", width: "80%" }}></div>
  );
};

export default RealGrid;
