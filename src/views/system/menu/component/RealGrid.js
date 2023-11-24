import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
//import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

import depIcon from "assets/img/gridIcon/department.png";

const setUseName = (items) => {
  items.forEach((item) => {
    item.menuNm = item.useYn === 0 ? item.menuNm + ' (미사용)' : item.menuNm;

    if (item.rows != null) {
      setUseName(item.rows);
    }
  });
}

const RealGrid = ({ org, setMenuDetail }) => {
  setUseName(org);
  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "menuPath", dataType: "text" },
    { fieldName: "menuNm", dataType: "text" },
    { fieldName: "menuCd", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "iconField", name: "iconField" },
  ];

  var columns = [
    {
      fieldName: "menuNm",
      name: "menuNm",
      width: 300,
      header: { text: "menuNm" },
    },
    { fieldName: "menuPath", name: "menuPath", header: { text: "menuPath" } },
    {
      fieldName: "menuCd",
      name: "menuCd",
      width: 70,
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
    //treeProvider.setRows(org, "menuPath", false, null, null);
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

    treeView.treeOptions.iconImages = [depIcon];
    treeView.treeOptions.defaultIcon = 0;

    treeView.onCellClicked = function (grid, clickData) {
      let value = grid._dataProvider._rowMap[clickData.dataRow];
      if (clickData.cellType !== "gridEmpty" && value !== undefined) {
        let menuCd = value._values[2];
        setMenuDetail(menuCd);
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

    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      if (depth === "1") {
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
