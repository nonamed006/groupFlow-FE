import {
  Button,
  Text,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import ModalLayout from "common/modal/ModalLayout";
import React, { useState } from "react";
import ChangeMenuBar from "./ChangeMenuBar";
import ChangeTable from "./ChangeTable";
import { PORT } from "set";

const InfoBoxBar = ({ title, onOpen, handleSaveBtn, isEditing, handleCancle, handleModify }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [isOpen, setIsOpen] = React.useState(false);
  const [chSearch, setChSearch] = React.useState([]); //변경이력 구분 [추가, 수정, 삭제
  const [chHistory, setChHistory] = useState([]);

  //변경이력 조회
  const handelChangeHistoryBtn = (page) => {
    //현재 날짜 및 1달전 날짜 구하기
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    today.setMonth(today.getMonth());
    today.setDate(today.getDate() + 1);

    console.log(page);
    if (page === undefined) {
      page = 1;
    }
    if (chSearch.length === 0) {
      chSearch.startCdt = monthAgo.toISOString().split("T")[0];
      chSearch.endCdt = today.toISOString().split("T")[0];
      chSearch.chDiv = "";
      chSearch.cid = "";
    }
    let url = `${PORT}/corp/ch?startCdt=${chSearch.startCdt}&endCdt=${chSearch.endCdt}&chDiv=${chSearch.chDiv}&cid=${chSearch.cid}&pageNum=${page}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.pageInfo);
        setChHistory(res.pageInfo);
      });
  };

  return (
    <Flex
      align={{ sm: "flex-start", lg: "center" }}
      justify="space-between"
      w="100%"
      px="22px"
      pb="20px"
      mb="10px"
    >
      <Text
        color={textColor}
        fontSize="22px"
        fontWeight="700"
        lineHeight="100%"
      >
        {title}
      </Text>

      <Flex>
        {
          !isEditing ?
          <>
              <Button variant="brand" onClick={handleModify}>
                수정
              </Button>
              <Button variant="action" onClick={onOpen}>
                삭제
              </Button>
          </>
            :
          <>
            <Button variant="brand" onClick={handleSaveBtn}>
              저장
            </Button>
            <Button variant="action" onClick={handleCancle}>
              취소
            </Button>
          </>
        }

        <Button
          variant="action"
          onClick={() => {
            setIsOpen(true);
            handelChangeHistoryBtn();
          }}
        >
          변경이력
        </Button>
        {isOpen && (
          <ModalLayout
            title={"변경이력"}
            onClose={() => {
              setIsOpen(false);
              setChSearch([]);
            }}
            buttonYn={false}
            size={"6xl"}
          >
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeMenuBar
                chSearch={chSearch}
                setChSearch={setChSearch}
                handelChangeHistoryBtn={handelChangeHistoryBtn}
              />
            </Box>
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeTable
                chHistory={chHistory}
                handelChangeHistoryBtn={handelChangeHistoryBtn}
              />
            </Box>
          </ModalLayout>
        )}
      </Flex>
    </Flex>
  );
};

export default InfoBoxBar;
