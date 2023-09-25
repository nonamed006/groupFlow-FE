import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import { useEffect } from "react";
import CardMenuBar from "common/cardMenuBar/CardMenuBar";
const ListCard = ({ title, setCoCd, listData, changeYn, initCorpList}) => {
  
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
      <CardMenuBar  handelOnClik={setCoCd} title={title} count={listData !== undefined ? listData.length : 0} buttonType={true}/>
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"}  >
        <ListCardTable listData={listData} setCoCd={setCoCd} />
      </Box>

    </Box>
  );
};

export default ListCard;
