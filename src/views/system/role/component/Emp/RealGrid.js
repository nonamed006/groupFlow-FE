import { useEffect, useRef, useState } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
//import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

const RealGrid = ({ org, setListDetail }) => { //setListDetail=[]
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
    //treeProvider.setRows(org, "dpPath", true, null, null);
    treeProvider.setObjectRows({ rows: org }, "rows", "", "");

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
        let cd = grid._dataProvider._rowMap[clickData.dataRow]._values[0];
        if(cd.indexOf('DG') > -1) {
          setListDetail(cd);
        } else {
          setListDetail('');
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
    <div ref={realgridElement} style={{ height: "100%", width: "100%" }}></div>
  );
};

export default RealGrid;
