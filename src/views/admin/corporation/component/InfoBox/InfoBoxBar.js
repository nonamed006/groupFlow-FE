import {
  Button,
  Text,
  Flex,
  Box,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import ModalLayout from "common/modal/ModalLayout";
import React, { useState } from "react";
import ChangeMenuBar from "./ChangeMenuBar";
import ChangeTable from "./ChangeTable";
import { useInView } from "react-intersection-observer";
import { PORT } from "set";
import Loading from "common/Loading";

const InfoBoxBar = ({
  title,
  onOpen,
  handleSaveBtn,
  isEditing,
  handleCancle,
  handleModify,
  setAlertInfo,
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [isOpen, setIsOpen] = React.useState(false);
  const [chSearch, setChSearch] = React.useState([]); //변경이력 구분 [추가, 수정, 삭제
  const [chHistory, setChHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [infiniteScrollRef, inView] = useInView();
  //변경이력 조회
  const handelChangeHistoryBtn = async (page) => {
    setIsLoading(true);
    //현재 날짜 및 1달전 날짜 구하기
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    today.setMonth(today.getMonth());
    today.setDate(today.getDate());

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
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setChHistory(res.pageInfo);
      });
    setIsLoading(false);
  };

  return (
    <Flex
      align={{ sm: "flex-start", lg: "center" }}
      justify="space-between"
      w="100%"
      px="20px"
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
        {!isEditing ? (
          <>
            <Button
              variant="brand"
              borderRadius={"10px"}
              fontWeight={"600"}
              m={1}
              onClick={handleModify}
            >
              수정
            </Button>
            <Button
              variant="action"
              borderRadius={"10px"}
              fontWeight={"600"}
              m={1}
              onClick={onOpen}
            >
              삭제
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="brand"
              borderRadius={"10px"}
              fontWeight={"600"}
              m={1}
              onClick={handleSaveBtn}
            >
              저장
            </Button>
            <Button
              variant="action"
              borderRadius={"10px"}
              fontWeight={"600"}
              m={1}
              onClick={handleCancle}
            >
              취소
            </Button>
          </>
        )}

        <Button
          variant="action"
          borderRadius={"10px"}
          fontWeight={"600"}
          m={1}
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
                setAlertInfo={setAlertInfo}
              />
            </Box>
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeTable
                chHistory={chHistory}
                handelChangeHistoryBtn={handelChangeHistoryBtn}
              />
            </Box>
            {isLoading ? (
              <Loading />
            ) : (
              <Box ref={infiniteScrollRef} h={"1px"} />
            )}
          </ModalLayout>
        )}
      </Flex>
    </Flex>
  );
};

export default InfoBoxBar;
