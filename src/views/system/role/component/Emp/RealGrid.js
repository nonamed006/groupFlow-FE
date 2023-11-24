import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";

import corpIcon from "assets/img/gridIcon/corporation.png";
import depIcon from "assets/img/gridIcon/department.png";
import empIcon from "assets/img/gridIcon/employee.png";

const RealGrid = ({ org, setListDetail }) => { //setListDetail=[]
  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "code", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "path", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "iconField", name: "iconField" },
  ];

  var columns = [
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "name", name: "name", width: 380, header: { text: " " } },
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
    //treeProvider.setRows(org, "dpPath", true, null, null);
    treeProvider.setObjectRows({ rows: org }, "rows", "", "iconField");

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 36;
    treeView.header.height = 40;
    treeView.footer.height = 40;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = true; // 클릭 시 색상
    //treeView.setDisplayOptions({vscrollBar: false});  // 수직 스크롤바 표시 여부

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: false }); //체크박스 표시X
    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("path").visible = false;
    treeView.columnByName("code").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("name").editable = false;
    treeView.columnByName("iconField").visible = false;

    treeView.treeOptions.iconImages = [corpIcon, depIcon, empIcon];

    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      var iconField = grid.getValue(item.index, "iconField");
      if (iconField === "0") {
        return "gnb-column";
      } else if (depth === "2") {
        return "bottom-gnb-column";
      }
    });
    treeView.onCellClicked = function (grid, clickData) {
      if (clickData.cellType !== "gridEmpty") {
        let cd = grid._dataProvider._rowMap[clickData.dataRow]._values[0];
        if (cd.indexOf('DG') > -1) {
          setListDetail(cd, '');
        } else {
          setListDetail('', cd);
        }
      }
    };

    // 헤더 정렬 불가
    treeView.sortingOptions.enabled = false;
    // 헤더 이동 불가
    treeView.displayOptions.columnMovable = false;

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  return (
    <div ref={realgridElement} style={{ height: "100%", width: "100%" }}></div>
  );
};

export default RealGrid;
