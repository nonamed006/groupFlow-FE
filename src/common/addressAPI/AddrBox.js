import { Input, Button, GridItem, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddrModal from "./AddrModal";

// title: 기준 주소 제목 ex) 회사주소, data: dto 데이터, setData: 변경된 주소 값을 data에 담아 보내기 위해, dataPk:  addrDetail의 defaultValue 변경을 위한 키 값으로 구분되는 데이터 pk값 사용
const AddrBox = ({ title, data, setData, dataPk, editState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련

  // 선택된 값으로 dto 데이터의 postNum, addr 값 변경
  const onCompletePost = (addr) => {
    setData({
      ...data,
      postNum: addr.zonecode,
      addr: addr.address,
    });
    onClose();
  };

  // 입력되는 상세주소 값으로 dto 데이터의 addrDetail 값 변경
  const onChangeAddrDetail = (e) => {
    setData({
      ...data,
      addrDetail: e.target.value,
    });
  };
  return (
    <>
      <GridItem colSpan={2} rowSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            {title}
          </Text>
        </GridItem>

      {/* 우편번호 */}
      <GridItem colStart={3} colEnd={7}>
        <Input
          id="postNum"
          name="postNum"
          size="md"
          borderRadius="14px"
          defaultValue={data ? data.postNum:''}
          placeholder="우편번호"
          readOnly
        />
      </GridItem>
      <GridItem colStart={7} colEnd={14}>
        {/* 우편번호 찾기 부분 ! */}
        <Button
          id="postNumBtn"
          onClick={() => {
            if (editState === "update") {
              onOpen();
            }
          }}
        >
          <Text fontSize="sm" fontWeight="600">
            우편번호 찾기
          </Text>
        </Button>
      </GridItem>

      {/* 주소 */}
      <GridItem colStart={3} colEnd={8}>
        <Input
          id="addr"
          name="addr"
          size="md"
          borderRadius="14px"
          defaultValue={data ? data.addr: ''}
          placeholder="주소를 선택하세요"
          readOnly
        />
      </GridItem>

      {/* 상세주소 */}
      <GridItem colStart={8} colEnd={14}>
        <Input
          id="addrDetail"
          name="addrDetail"
          size="md"
          borderRadius="14px"
          onChange={onChangeAddrDetail}
          defaultValue={data ? data.addrDetail:''}
          key={dataPk}
          placeholder="상세주소를 입력하세요."
          readOnly={editState === "update"?false:true}
        />
      </GridItem>

      {/* 주소찾기 모달 */}
      {isOpen ? (
        <AddrModal
          isOpen={isOpen}
          onClose={onClose}
          onCompletePost={onCompletePost}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default AddrBox;
