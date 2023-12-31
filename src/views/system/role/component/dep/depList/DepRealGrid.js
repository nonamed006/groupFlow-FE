import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import { Box } from "@chakra-ui/react";

import corpIcon from "assets/img/gridIcon/corporation.png";
import depIcon from "assets/img/gridIcon/department.png";

const DepRealGrid = ({ org, handleClick }) => {

  const realgridElement = useRef(null);

  var fields = [
    { fieldName: "code", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "path", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "type", dataType: "text" },
    { fieldName: "iconField", name: "iconField" },
  ];

  var columns = [
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "name", name: "name", width: 376, header: { text: " " } },
    { fieldName: "code", name: "code", header: { text: "code" } },
    { fieldName: "depth", name: "depth", header: { text: "depth" } },
    { fieldName: "type", name: "type", header: { text: "type" } },
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
    treeView.displayOptions.rowHeight = 42;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = true; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시

    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("type").visible = false;
    treeView.columnByName("iconField").visible = false;
    treeView.columnByName("name").editable = false;

    // //옵션설정
    treeView.checkBar.fieldName = "state"; //state 필드와 체크박스 체크 여부 연결

    treeView.treeOptions.iconImages = [corpIcon, depIcon];

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

    treeView.onCellClicked = function (grid, clickData) {
      let value = grid._dataProvider._rowMap[clickData.dataRow];
      if (clickData.cellType !== "gridEmpty" && value !== undefined) {
        var provider = grid.getDataSource();
        let coCd = value._values[2].split("/")[0];
        if (value._values[3] !== '0') {
           let dpCd = value._values[0];
          // let arr = [];

          // var dataRow = grid.getDataRow(clickData.itemIndex);
          // var desRows = provider.getDescendants(dataRow);
          // if (desRows != null) {
          //   desRows.push(dataRow);
          //   arr = desRows;
          // } else {
          //   arr.push(dataRow);
          // }
          // const dpCdArr = arr.map((item) => {
          //   return provider.getValues(item)[0]
          // });
          handleClick(dpCd, coCd);
        } else {

          handleClick(undefined, coCd);
        }
      }
    };
    treeView.expandAll();

    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return <Box ref={realgridElement} w="100%" h="500px" />;
};

export default DepRealGrid;