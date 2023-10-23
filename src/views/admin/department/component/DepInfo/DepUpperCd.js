import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "assets/css/realgrid-style.css"; // RealGrid CSS 추가

function DepUpperCd(props) {
  const realgridElement = useRef(null);

  var fields = [
    { fieldName: "path", dataType: "text" },
    { fieldName: "name", dataType: "text" },
    { fieldName: "code", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
  ];

  var columns = [
    { fieldName: "name", name: "name", width: 150, header: { text: "명칭" } },
    { fieldName: "path", name: "path", header: { text: "path" } },
    { fieldName: "code", name: "code", width: 150, header: { text: "code" } },
    { fieldName: "depth", name: "depth", header: { text: "depth" } },
  ];

  var treeProvider, treeView;

  useEffect(() => {
    const container = realgridElement.current;
    if (!container) {
      return; // 컨테이너가 아직 없으면 아무 작업도 수행하지 않음
    }
    treeProvider = new LocalTreeDataProvider();
    treeView = new TreeView(container);
    treeView.setDataSource(treeProvider);
    treeProvider.setFields(fields);
    treeView.setColumns(columns);

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

    //해당컬럼 tn
    treeView.columnByName("name").editable = false;
    treeView.columnByName("code").editable = false;

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
      let dpData = grid._dataProvider._rowMap[clickData.dataRow];

      let dataArray = dpData._values[0].split("/");
      if (props.data.depDto.dpCd == "") {
      } else {
        if (dataArray.includes(props.data.depDto.dpCd)) {
          alert("하위부서는 선택할 수 없습니다.");
          return 0;
        }
      }
      props.getValue(dpData);
    };

    treeProvider.setObjectRows({ rows: props.value }, "rows", "", "");
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
