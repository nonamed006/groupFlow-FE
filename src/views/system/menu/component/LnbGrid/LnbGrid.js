import { Box } from "@chakra-ui/react";
import LnbGridBar from "./LnbGridBar";

const LnbGrid = ({title, listData}) => {
    return(
        <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
            {/* 목록 상단 */}
          <LnbGridBar title={title} count={listData&&listData.length}/>
            {/* 목록 테이블(카드형식) */}
          {/* <GnbCardList listData={listData} onClickCorp={onClickCorp}/> */}
        </Box>
    );
}

export default LnbGrid;