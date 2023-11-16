import { useEffect, useRef } from "react";
import {} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { LocalTreeDataProvider, TreeView } from "realgrid";

import corImage from "assets/img/realgrid/corporation.png";
import depImage from "assets/img/realgrid/department.png";
function DepUpperCd(props) {
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

    treeProvider.setObjectRows({ rows: props.value }, "rows", "", "iconField");

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.footer.height = 40;
    treeView.stateBar.width = 16;

    treeView.displayOptions.useFocusClass = true; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("iconField").visible = false;

    //해당컬럼 tn
    treeView.columnByName("name").editable = false;

    //public
    //treeView.treeOptions.iconImagesRoot = `${process.env.PUBLIC_URL}/img/`;
    //treeView.treeOptions.iconImages = ["corporation.png", "department.png"];

    //src
    treeView.treeOptions.iconImages = [corImage, depImage];

    treeView.onCellClicked = function (grid, clickData) {
      let dpData = grid._dataProvider._rowMap[clickData.dataRow];
      props.getValue(dpData);
    };

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [props]);

  return (
    <div ref={realgridElement} style={{ height: "500px", width: "80%" }}></div>
  );
}

export default DepUpperCd;
