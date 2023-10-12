import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import { useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
const ListCard = ({ title, setCoCd, listData, changeYn, initCorpList, coCd }) => {

  useEffect(() => { // 저장, 삭제, 수정 등의 이벤트가 있을 때 다시 값 가져오기
    if (changeYn) {
      initCorpList();
    }
  }, [changeYn]);

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      {/* 목록 상단 */}
      <CardMenuBar
        handelOnClik={setCoCd}
        title={title}
        count={listData !== undefined ? listData.length : 0}
        buttonType={true}
        btnText={'추가'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'90%'} >
        <ListCardTable listData={listData} setCoCd={setCoCd} coCd={coCd}/>
      </Box>

    </Box>
  );
};

export default ListCard;
