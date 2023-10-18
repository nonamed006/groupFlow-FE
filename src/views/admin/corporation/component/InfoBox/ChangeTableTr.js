import {
  Td,
  Text,
  Tr,
  Box,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";
import ModalLayout from "common/modal/ModalLayout";
import ChangeInsertTable from "./ChangeHistoryDetail/ChangeHistoryInsert/ChangeInsertTable";
import ChangeModifyTable from "./ChangeHistoryDetail/ChangeHistoryModify/ChangeModifyTable";
import ChangeDeleteTable from "./ChangeHistoryDetail/ChangeHistoryDelete/ChangeDeleteTable";
import { PORT } from "set";
const ListCardTableTr = ({ data, index }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [isOpen, setIsOpen] = React.useState(false);
  const [chDiv, setChDiv] = React.useState("");
  const [detail, setDetail] = React.useState({});
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
  //변경이력 상세조회
  const handelChangeHistoryDetailBtn = () => {
    let url = `${PORT}/corp/chDetail?chCd=${data.chCd}&chDiv=${data.chDiv}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setDetail(res.voData);
      });
  };
  return (
    <Tr
      backgroundColor={mouseOverIndex === index ? "navy.50" : "white"}
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index);
      }}
      onClick={() => {
        setChDiv(data.chDiv);
        setIsOpen(true);
        handelChangeHistoryDetailBtn();
      }}
    >
      {isOpen && (
        <ModalLayout
          title={"변경이력"}
          onClose={() => setIsOpen(false)}
          buttonYn={false}
          size={"3xl"}
        >
          {chDiv === "추가" && (
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeInsertTable detail={detail} />
            </Box>
          )}
          {chDiv === "수정" && (
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeModifyTable detail={detail} />
            </Box>
          )}
          {chDiv === "삭제" && (
            <Box borderRadius="lg" bg="white" p="6">
              <ChangeDeleteTable detail={detail} />
            </Box>
          )}
        </ModalLayout>
      )}
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.chCd}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.cdt}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.chDiv}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.coNm}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.empNm}({data.loginId})
        </Text>
      </Td>
    </Tr>
  );
};

export default ListCardTableTr;
