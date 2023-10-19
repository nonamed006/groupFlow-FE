import { Box, Text, useDisclosure } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { PORT } from "set";
import ModalLayout from "common/modal/ModalLayout";
import { corpSchema } from "common/Schema";

const InfoBox = ({ coCd, setCoCd, setChangeYn, sortValue, changeYn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  const [isEditing, setIsEditing] = useState(); // 저장 및 수정 상태 (기본값 false - 저장)
  const [corp, setCorp] = useState(); // 회사 데이터 (하나)

  useEffect(() => {
    if (coCd !== "undefined" && coCd !== undefined && coCd !== 0)
      fetchCorp(coCd); // coCd로 회사 조회
    else
      onReset();
    setIsEditing(coCd === 0 ? true : false);
  }, [coCd, sortValue]);

  const onReset = () => {
    setCorp({ // 기본값 세팅
      postNum: undefined,
      addr: undefined,
      delYn: false,
      sort: sortValue,
    });
  };

  // 회사 조회
  const fetchCorp = (coCd) => {
    let url = `${PORT}/corp/${coCd}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.voData;
        data !== null && setCorp(data);
      });
  };

  // 회사 저장
  const fetchCorpSave = () => {
    let url = `${PORT}/corp`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corp),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.resultMsg);
        setChangeYn(!changeYn); // 변경 여부 변경
      });
  };

  // 회사 정보 수정
  const fetchCorpUpdate = () => {
    let url = `${PORT}/corp`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corp),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.resultMsg);
        setIsEditing(false);
        setChangeYn(!changeYn); // 변경 여부 변경
      });
  };

  // 회사 삭제
  const fetchCorpDelete = () => {
    let url = `${PORT}/corp/${coCd}`;
    fetch(url, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.resultMsg);
        setCoCd(); // coCd 초기화
        setChangeYn(!changeYn); // 변경 여부 변경
      });
  };

  // 삭제 버튼 클릭 시
  const handleDeleteBtn = () => {
    coCd !== "undefined" && coCd !== undefined
      ? fetchCorpDelete(coCd)
      : alert("삭제할 회사가 존재하지 않습니다");
    onClose();
  };

  // 저장 버튼 클릭 시
  const handleSaveBtn = () => {
    corpSchema.validate(corp)
      .then(() => {
        // 유효성 검사 통과한 데이터 처리
        coCd !== 0 ? fetchCorpUpdate() : fetchCorpSave(); // isEditing: true => 수정 / false => 저장
      })
      .catch(errors => {
        // 유효성 검사 실패한 경우 에러 처리
        console.log(errors);
        alert(errors.message);
      });
  };

  const handleCancle = () => {
    setCoCd();
  }

  const handleModify = () => {
    if (coCd !== undefined && coCd !== 'undefined') {
      setIsEditing(true);
      return;
    }
    alert("회사를 선택하세요.");
  }

  return (
    <>
      <Box
        borderRadius="lg"
        bg="white"
        h="700px"
        p="6"
        backgroundColor="white"
        overflowY={"auto"}
      >
        <InfoBoxBar
          title={"기본정보"}
          onOpen={onOpen}
          handleSaveBtn={handleSaveBtn}
          isEditing={isEditing}
          handleCancle={handleCancle}
          handleModify={handleModify}
        />
        <Box w={'100%'} justifyContent={"center"} alignContent={"center"}>
          <InputGrid
            corp={(corp !== undefined && corp !== 'undefined') && corp}
            setCorp={setCorp}
            isEditing={isEditing}
          />
        </Box>
      </Box>

      {/* 삭제 확인 모달 */}
      {(isOpen && !isEditing) && (
        <ModalLayout title={'삭제여부'} onClose={onClose} isOpen={isOpen} buttonYn={true} btnText={'삭제'} size={'md'} handleCheck={handleDeleteBtn}>
          <Box>
            <Text>삭제하시겠습니까?</Text>
          </Box>
        </ModalLayout>

      )}
    </>
  );
};

export default InfoBox;
