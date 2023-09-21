import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import ListCardBar from "./ListCardBar";
import { useEffect } from "react";

  const ListCard = ({title, listData, setCoCd, changeYn, setChangeYn, fetchCorpList }) => {  
    const headerGroups = ["회사코드", "회사명", "대표자", "구분"];
    useEffect(() => {
      changeYn ? setChangeYn(false) : fetchCorpList();
    }, [changeYn]);

    return (
        <Box borderRadius="lg" bg="white" h="700px"  p="6">
            {/* 목록 상단 */}
          <ListCardBar  setCoCd={setCoCd} title={title} count={listData!==undefined?listData.length:0} />
            {/* 목록 테이블 */}
            <Box  w={'100%'} display={'inline-block'} >
              <ListCardTable headerGroups={headerGroups} listData={listData} setCoCd={setCoCd} />
            </Box>
         
        </Box>
    );
  };
  
  export default ListCard;
  