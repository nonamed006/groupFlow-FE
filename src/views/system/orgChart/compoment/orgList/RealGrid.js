import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import { Box } from "@chakra-ui/react";

import corpIcon from "assets/img/gridIcon/corporation.png";
import depIcon from "assets/img/gridIcon/department.png";

const RealGrid = ({ org, handleGrid }) => {
  const realgridElement = useRef(null);

  var fields = [
    { fieldName: "code", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "path", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "iconField", dataType: "text" },
  ];

  var columns = [
    { fieldName: "path", name: "path", width: 50, header: { text: "path" } },
    { fieldName: "name", name: "name", width: 300, header: { text: " " } },
    { fieldName: "code", name: "code", width: 70, header: { text: "code" } },
    { fieldName: "depth", name: "depth", width: 70, header: { text: "depth" } },
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

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = false; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("iconField").visible = false;
    treeView.columnByName("name").editable = false;

    // 아이콘
    treeView.treeOptions.iconImages = [corpIcon, depIcon];

    // row별 색상 변경
    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      if (depth === "0") {
        return "gnb-column";
      } else if (depth === "2") {
        return "bottom-gnb-column";
      }
    });
    // 더블 클릭 시, 수정 불가 설정
    treeView.editOptions.editable = false;
    // 헤더 정렬 불가
    treeView.sortingOptions.enabled = false;
    // 헤더 이동 불가
    treeView.displayOptions.columnMovable = false;

    // 클릭 이벤트
    treeView.onCellClicked = function (grid, clickData) {
      let value = grid._dataProvider._rowMap[clickData.dataRow];
      if (clickData.cellType !== "gridEmpty" && value !== undefined) {
        handleGrid({
          code: value._values[0],
          name: value._values[1],
        });
      }
    };

    // 모두 열기
    treeView.expandAll();

    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return <Box ref={realgridElement} w={"100%"} h={"100%"} />;
};

export default RealGrid;
