import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import { Box } from "@chakra-ui/react";

//import "assets/css/depRealGrid.css"; // RealGrid CSS 추가
import corpIcon from "assets/img/gridIcon/corporation.png";
import depIcon from "assets/img/gridIcon/department.png";

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
    { fieldName: "name", name: "name", width: 380, header: { text: " " } },
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "code", name: "code", header: { text: "code" } },
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
    treeView.stateBar.width = 30;

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
    treeView.treeOptions.iconImages = [corpIcon, depIcon];

    //treeView.orderBy("path", "depth");
    treeView.onCellClicked = function (grid, clickData) {
      let value = grid._dataProvider._rowMap[clickData.dataRow];
      if (clickData.cellType !== "gridEmpty" && value !== undefined) {
        let depth = value._values[3];
        if (depth !== "0") {
          let dpCdData = value._values[2];
          setDpCd(dpCdData);
          setTabStatus(1);
          setEditState("read");
        } else if (depth === "0") {
          setTabStatus(1);
          setEditState("read");
          setDpCd(0);
        }
      }
    };
    // 더블 클릭 시, 수정 불가 설정
    treeView.editOptions.editable = false;
    // 헤더 정렬 불가
    treeView.sortingOptions.enabled = false;
    // 헤더 이동 불가
    treeView.displayOptions.columnMovable = false;
    // row별 색상 추가
    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      if (depth === "0") {
        return "gnb-column";
      } else if (depth === "2") {
        return "bottom-gnb-column";
      }
    });
    // 모두 열기
    treeView.expandAll();

    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return <Box ref={realgridElement} w="100%" h="500px"></Box>;
};

export default RealGrid;
