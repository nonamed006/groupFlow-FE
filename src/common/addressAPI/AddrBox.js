import { Button, GridItem, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import AddrModal from "./AddrModal";
import FormInput from "common/component/FormInput";

// title: 기준 주소 제목 ex) 회사주소, data: dto 데이터, setData: 변경된 주소 값을 data에 담아 보내기 위해, dataPk:  addrDetail의 defaultValue 변경을 위한 키 값으로 구분되는 데이터 pk값 사용
const AddrBox = ({ title, data, setData, dataPk, editState, isRequired }) => {
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

      <GridItem colStart={1} colEnd={5} colSpan={5}>
        <FormInput
          title={'우편번호'}
          name={'postNum'}
          value={data.postNum?data.postNum:''}
          readOnly={true}
          isRequired={isRequired}
          placeholder="주소를 선택하세요"
        />
      </GridItem>
      <GridItem colStart={5} colEnd={10} >
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
      <GridItem colStart={1} colEnd={5} colSpan={5}>
        <FormInput
          title={'주소'}
          name={'addr'}
          value={data.addr?data.addr:''}
          readOnly={true}
          isRequired={isRequired}
          placeholder="주소를 선택하세요"
        />
      </GridItem>

      {/* 상세주소 */}
      <GridItem colStart={5} colEnd={10} colSpan={5}>
        <FormInput
          name={'addrDetail'}
          value={data.addrDetail?data.addrDetail:''}
          readOnly={editState === "update" ? false : true}
          isRequired={isRequired}
          placeholder="상세주소를 입력하세요"
          onChange={onChangeAddrDetail}
          pk={dataPk}
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
