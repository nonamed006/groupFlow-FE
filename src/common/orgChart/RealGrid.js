import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

const RealGrid = ({ org, handelGrid}) => {
  const realgridElement = useRef(null);

  var fields = [
    { fieldName: "path", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "code", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
  ];

  var columns = [
    { fieldName: "name", name: "name", width: 220, header: { text: "명칭" } },
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "code", name: "code", header: { text: "code" } },
    { fieldName: "depth", name: "depth", header: { text: "depth" } },
  ];

  var treeProvider, treeView;
  
  useEffect(() => {   
    const  container = realgridElement.current;
    if (!container) {
      return; // 컨테이너가 아직 없으면 아무 작업도 수행하지 않음
    }
    
   treeView = new TreeView(container);
  
    treeProvider = new LocalTreeDataProvider();

    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);
    treeView.displayOptions.emptyMessage = "표시할 데이터가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.footer.height = 40;
    treeView.stateBar.width = 20;
    // treeView.displayOptions.useFocusClass = true;
    treeView.setStateBar({ visible: false }); // 상태바 표시X
    treeView.setCheckBar({ visible: false }); // 체크박스 표시X
    treeView.setRowIndicator({ visible: false }); // 인디케이터 표시X

    // 해당 컬럼 표시X
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

    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        let dpCdData =
          grid._dataProvider._rowMap[clickData.dataRow]._values[2];
        handelGrid(dpCdData);
      }
    };

    // props.value가 null인 경우 빈 배열로 대체하여 사용
    treeProvider.setRows(org || [], "path", true, null, "depth");

    // 모두 열기
    treeView.expandAll();

    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, []);

  return <Box ref={realgridElement} w={"100%"} h={"100%"} />;
};

export default RealGrid;
