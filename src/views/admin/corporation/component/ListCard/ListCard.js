import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import ListCardBar from "./ListCardBar";
import { useEffect } from "react";
const ListCard = ({ title, setCoCd, listData, changeYn, initCorpList}) => {
  const headerGroups = ["회사코드", "회사명", "대표자", "구분"];
  
  useEffect(() => { // 처음 설정
      initCorpList();
  }, []);

  useEffect(() => { // 저장, 삭제, 수정 등의 이벤트가 있을 때 다시 값 가져오기
    if(changeYn){
      initCorpList();
    }
  }, [changeYn]);

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      {/* 목록 상단 */}
      <ListCardBar handelOnClik={setCoCd} title={title} count={listData !== undefined ? listData.length : 0} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"}  >
        <ListCardTable headerGroups={headerGroups} listData={listData} setCoCd={setCoCd} />
      </Box>

    </Box>
  );
};

export default ListCard;
