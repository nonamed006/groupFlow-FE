import { Box, useDisclosure } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { corpSchema } from "common/Schema";
import DeleteModal from "common/modal/DeleteModal";
import api from "api/Fetch";

const InfoBox = ({ coCd, setCoCd, setChangeYn, sortValue, changeYn, setAlertInfo }) => {
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
  const fetchCorp = async (coCd) => {
    let res = await api.corp.getCorpInfo(coCd);
    if(res.status === 200){
        let data = res.voData;
        data !== null && setCorp(data);
    }
  };

  // 회사 저장
  const fetchCorpSave = async () => {
    let res = await api.corp.postCorpInfo(corp);
    console.log(res);
    if(res.status === 200){
       setAlertInfo({
          isOpen : true,
          status : 'success',
          title : res.resultMsg,
          width : 'fit-content'
        });
        setChangeYn(!changeYn); // 변경 여부 변경
    }else{
      setAlertInfo({
        isOpen : true,
        status : 'error',
        title : res.resultMsg,
        width : 'fit-content'
      });
    }
  };

  // 회사 정보 수정
  const fetchCorpUpdate = async () => {
    let res = await api.corp.putCorpInfo(corp);
    if(res.status === 200){
      setAlertInfo({
        isOpen : true,
        status : 'success',
        title : res.resultMsg,
        width : 'fit-content'
      });
      setIsEditing(false);
      setChangeYn(!changeYn); // 변경 여부 변경
    } else{
      setAlertInfo({
        isOpen : true,
        status : 'error',
        title : res.resultMsg,
        width : 'fit-content'
      });
    }
  };

  // 회사 삭제
  const fetchCorpDelete = async () => {
    let res = await api.corp.deleteCorpInfo(coCd);
    if(res.status === 200){
       setAlertInfo({
          isOpen : true,
          status : 'success',
          title : res.resultMsg,
          width : 'fit-content'
        });
        setCoCd(); // coCd 초기화
        setChangeYn(!changeYn); // 변경 여부 변경
    }else{
      setAlertInfo({
        isOpen : true,
        status : 'error',
        title : res.resultMsg,
        width : 'fit-content'
      });
    }
  };

  // 삭제 버튼 클릭 시
  const handleDeleteBtn = () => {
    coCd !== "undefined" && coCd !== undefined
      ? fetchCorpDelete(coCd) 
      :
      setAlertInfo({
        isOpen : true,
        status : 'warning',
        title : '선택된 회사가 없습니다.',
        width : 'fit-content'
      });
      // : alert('삭제할 회사가 존재하지않습니다.');
    onClose();
  };


  // 저장 버튼 클릭 시
  const handleSaveBtn = () => {
    console.log('ddddd');
    corpSchema.validate(corp)
      .then(() => {
        // 유효성 검사 통과한 데이터 처리
        coCd !== 0 ? fetchCorpUpdate() : fetchCorpSave(); // isEditing: true => 수정 / false => 저장
      })
      .catch( errors => {
        // 유효성 검사 실패한 경우 에러 메세지
        setAlertInfo({
          isOpen : true,
          status : 'warning',
          title : '입력값을 확인해주세요.',
          detail : errors.message,
          width : 'fit-content'
        });
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
    setAlertInfo({
      isOpen : true,
      status : 'warning',
      title : '선택된 회사가 없습니다.',
      width : 'fit-content'
    });
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
        w={'1100px'}
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
      {(isOpen && !isEditing) &&
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleCheck={handleDeleteBtn}
        />
      }
    </>
  );
};

export default InfoBox;
