import { Box, useDisclosure } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { PORT } from "set";
import DeleteModal from "common/modal/DeleteModal";

const InfoBox = ({ coCd, setCoCd, setChangeYn, sortValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  const [isEditing, setIsEditing] = useState(false); // 저장 및 수정 상태 (기본값 false - 저장)
  const [corp, setCorp] = useState({}); // 회사 데이터 (하나)

  useEffect(() => {
    if (coCd !== "undefined" && coCd !== undefined) {
      // 선택된 coCd 값이 있다면
      fetchCorp(coCd); // coCd로 회사 조회
      setIsEditing(true); // 수정모드
    } else {
      onReset();
      setIsEditing(false);
    }
  }, [coCd, sortValue]);

  const onReset = () => {
    setCorp({
      coCd: "",
      coNm: "",
      coAbb: "",
      ceoNm: "",
      bsType: "",
      bsStock: "",
      bsCd: "",
      ccNm: "",
      coNum: "",
      estDt: "",
      opDt: "",
      clsDt: "",
      coDomain: "",
      pageUrl: "",
      fax: "",
      stnd: "",
      useYn: true,
      postNum: "",
      addr: "",
      addrDetail: "",
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
        data !== null &&
          setCorp({
            coCd: data.coCd,
            coNm: data.coNm,
            coAbb: data.coAbb,
            ceoNm: data.ceoNm,
            bsType: data.bsType,
            bsStock: data.bsStock,
            bsCd: data.bsCd,
            ccNm: data.ccNm,
            coNum: data.coNum,
            estDt: data.estDt,
            opDt: data.opDt,
            clsDt: data.clsDt,
            coDomain: data.coDomain,
            pageUrl: data.pageUrl,
            sort: data.sort,
            fax: data.fax,
            stnd: data.stnd,
            useYn: data.useYn,
            postNum: data.postNum,
            addr: data.addr,
            addrDetail: data.addrDetail,
            delYn: data.delYn,
          });
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
        setChangeYn(true); // 변경 여부 변경
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
        setChangeYn(true); // 변경 여부 변경
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
        setChangeYn(true); // 변경 여부 변경
      });
  };

  // 삭제 버튼 클릭 시
  const handelDeleteBtn = () => {
    coCd !== "undefined" && coCd !== undefined
      ? fetchCorpDelete(coCd)
      : alert("삭제할 회사가 존재하지 않습니다");
    onClose();
  };

  // 저장 버튼 클릭 시
  const handelSaveBtn = () => {
    isEditing ? fetchCorpUpdate() : fetchCorpSave(); // isEditing: true => 수정 / false => 저장
  };

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
          handelSaveBtn={handelSaveBtn}
        />
        <Box>
          <InputGrid corp={corp} setCorp={setCorp} />
        </Box>
      </Box>

      {/* 삭제 확인 모달 */}
      {isOpen ? (
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleCheck={handelDeleteBtn}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default InfoBox;
