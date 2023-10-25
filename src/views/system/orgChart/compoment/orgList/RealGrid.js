import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "assets/css/realgrid-style.css"; // RealGrid CSS 추가
import { Box } from "@chakra-ui/react";

const RealGrid = ({ org, handleGrid }) => {

  const realgridElement = useRef(null);

  var fields = [
    { fieldName: "code", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "path", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
  ];

  var columns = [
    { fieldName: "path", name: "path", width: 50, header: { text: "path" } },
    { fieldName: "name", name: "name", width: 300, header: { text: "name" } },
    { fieldName: "code", name: "code", width: 70, header: { text: "code" } },
    { fieldName: "depth", name: "depth", width: 70, header: { text: "depth" } },
  ];

  var treeProvider, treeView;

  useEffect(() => {
    const container = realgridElement.current;

    treeProvider = new LocalTreeDataProvider(true);
    treeView = new TreeView(container);
    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);

    treeProvider.setObjectRows({rows: org}, 'rows', '', '');

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.footer.height = 40;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = false; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("name").editable = false;

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
    
    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      if (depth === "0") {
        return "gnb-column";
      } else if (depth === "2") {
        return "bottom-gnb-column";
      }
    });
    
    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        // let dpCdData = grid._dataProvider._rowMap[clickData.dataRow]._values[0];
        handleGrid({
            code: grid._dataProvider._rowMap[clickData.dataRow]._values[0],
            name: grid._dataProvider._rowMap[clickData.dataRow]._values[1]
        });
      }
    };

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return <Box ref={realgridElement} w={"100%"} h={"100%"} />;
};

export default RealGrid;
