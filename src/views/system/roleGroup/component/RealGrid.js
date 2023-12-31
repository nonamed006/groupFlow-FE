import { useEffect, useRef } from "react";
import { LocalTreeDataProvider, TreeView } from "realgrid";
import "assets/css//roleMenuRealgrid.css"; // RealGrid CSS 추가
import { Box } from "@chakra-ui/react";

import depIcon from "assets/img/gridIcon/department.png";

const RealGrid = ({ org, type, setCheckedMenuCd }) => {
  const realgridElement = useRef(null);
  var fields = [
    { fieldName: "menuPath", dataType: "text" },
    { fieldName: "menuNm", dataType: "text" },
    { fieldName: "menuCd", dataType: "text" },
    { fieldName: "depth", dataType: "text" },
    { fieldName: "state", dataType: "boolean" },
    { fieldName: "useYn", name: "useYn" },
    { fieldName: "type", dataType: "text" },
    { fieldName: "iconField", dataType: "text" },
  ];

  var columns = [
    {
      fieldName: "menuNm",
      name: "menuNm",
      width: type === "modify" ? 310 : 400,
      header: { text: "메뉴" },
    },
    { fieldName: "menuPath", name: "menuPath" },
    { fieldName: "menuCd", name: "menuCd" },
    { fieldName: "depth", name: "depth" },
    { fieldName: "state", name: "state" },
    { fieldName: "useYn", name: "useYn", header: { text: "사용여부" } },
    { fieldName: "type", name: "type", header: { text: "메뉴타입" } },
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
    treeProvider.setRows(org, "menuPath", false, null, 'iconField');

    treeView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    treeView.displayOptions.rowHeight = 42;
    treeView.stateBar.width = 30;

    treeView.displayOptions.useFocusClass = false; //클릭 시 색상

    treeView.setStateBar({ visible: false }); //상태바 표시X
    treeView.setCheckBar({ visible: type === "modify" ? true : false }); //체크박스 표시

    treeView.setRowIndicator({ visible: false }); //인디케이터 표시X

    //해당 컬럼 표시X
    treeView.columnByName("menuPath").visible = false;
    treeView.columnByName("depth").visible = false;
    treeView.columnByName("menuCd").visible = false;
    treeView.columnByName("state").visible = false;
    treeView.columnByName("iconField").visible = false;
    // treeView.columnByName("type").visible = type === "modify" ;

    treeView.treeOptions.iconImages = [depIcon];

    // //옵션설정
    treeView.checkBar.fieldName = "state"; //state 필드와 체크박스 체크 여부 연결

    treeView.setRowStyleCallback(function (grid, item, fixed) {
      var depth = grid.getValue(item.index, "depth");
      var useYn = grid.getValue(item.index, "useYn");
      if (useYn === "미사용") {
        return "not-useMenu-column";
      }
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

    //자식노드들이 모두 체크되었을때 부모노드도 체크되게
    treeView.onItemChecked = function (grid, itemIndex, checked) {
      var dataRow = grid.getDataRow(itemIndex);
      checkNode(grid, dataRow, checked);
      let checkedMenuCd = [];
      // 체크된 행의 인덱스 배열
      treeView.getCheckedRows().forEach((i) => {
        // 중복없이 체크된 menuCd를 checkedMenuCd에 추가
        let menuCd = grid._dataProvider.getValue(i, 2);
        if (!checkedMenuCd.includes(menuCd)) {
          checkedMenuCd.push(menuCd);
        }
      });
      setCheckedMenuCd(checkedMenuCd); // setCheckedMenuCd
    };

    treeView.expandAll();
    return () => {
      treeProvider.clearRows();
      treeView.destroy();
    };
  }, [org]);

  function checkNode(grid, dataRow, checked) {
    var provider = grid.getDataSource();

    // 형제 노드 체크 후 부모 노드 체크
    checkSiblingNode(grid, dataRow, checked);

    // 자식 노드 체크
    var desRows = provider.getDescendants(dataRow);
    if (desRows) {
      grid.checkRows(desRows, checked, false);
    }
  }

  function checkSiblingNode(grid, dataRow, checked) {
    var provider = grid.getDataSource();
    // 부모 노드
    var parent = provider.getParent(dataRow);
    // 형제 노드
    var sibling =
      parent == -1 ? provider.getChildren() : provider.getChildren(parent);
    // 하나 이상의 자식 노드가 체크되었는지 확인하기 위한 변수
    var atLeastOneChecked = false;
    for (var i in sibling) {
      var value = grid.isCheckedRow(sibling[i]);
      if (value) {
        atLeastOneChecked = true;
        break;
      }
    }

    if (atLeastOneChecked) {
      checked = true;
    } else {
      checked = false;
    }

    if (parent > -1) {
      grid.checkRow(parent, checked, false, false);
    }
    // checkBar.head 영역의 V표시 제어
    if (parent == -1) grid.setAllCheck(checked, false);
    if (parent > -1) checkSiblingNode(grid, parent, checked);
  }

  return <Box ref={realgridElement} ml={type === "modify" ? 0 : 2} w="100%" h={"550px"} />
};

export default RealGrid;
