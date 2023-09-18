import { Box, useDisclosure } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PORT } from "set";
import { useDispatch } from "react-redux";
import { setDataPk } from "redux/solution";
import { setChangeYn } from "redux/corporation";
import DeleteModal from "common/modal/DeleteModal";

const InfoBox = () => {
    const dispatch = useDispatch();
    const coCd = useSelector((state) => state.solution.dataPk);

    const { isOpen, onOpen, onClose } = useDisclosure();  // 모달 관련
    const [isEditing, setIsEditing] = useState(false);  // 저장 및 수정 상태 (기본값 false - 저장) 
    // 초기 회사 데이터 값
    const [corp, setCorp] = useState({}); // 회사 데이터 (하나)
    const [sortValue, setSortValue] = useState();   // 초기 정렬 기본값

    useEffect(() => {
        if (coCd !== 0) { // 선택된 coCd 값이 있다면(초기값 0이 아니라면) 
            fetchCorp(coCd);    // coCd로 회사 조회
            setIsEditing(true);
        } else {
            fetchMaxSort();
            onReset();
            setIsEditing(false);
        }
    }, [coCd, isEditing]);

    const onReset = () => {
        setCorp({
            coCd: '',
            coNm: '',
            coAbb: '',
            ceoNm: '',
            bsType: '',
            bsStock: '',
            bsCd: '',
            ccNm: '',
            coNum: '',
            estDt: '',
            opDt: '',
            clsDt: '',
            coDomain: '',
            pageUrl: '',
            fax: '',
            stnd: '',
            useYn: true,
            postNum: '',
            addr: '',
            addrDetail: '',
            delYn: false,
            sort: sortValue
        });
    }
    // 정렬 기본값 가져오기
    const fetchMaxSort = () => {
        let url = `${PORT}/corp/sort`;
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            setSortValue(res.strData);
        });
    };

    // 회사 조회
    const fetchCorp = (coCd) => {
        let url = `${PORT}/corp/${coCd}`;
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
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
            body: JSON.stringify(corp)
        }).then(res => res.json()).then(res => {
            console.log(res);
            alert(res.resultMsg);
            dispatch(setChangeYn(true));    // 변경 여부 변경
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
            body: JSON.stringify(corp)
        }).then(res => res.json()).then(res => {
            console.log(res);
            alert(res.resultMsg);
            dispatch(setChangeYn(true));    // 변경 여부 변경
        });
    };

    // 회사 삭제
    const fetchCorpDelete = () => {
        let url = `${PORT}/corp/${coCd}`;
        fetch(url, {
            method: "PUT",
        }).then(res => res.json()).then(res => {
            alert(res.resultMsg);
            dispatch(setDataPk(0)); // coCd 초기화
            dispatch(setChangeYn(true));    // 변경 여부 변경
        });
    };

    // 삭제 버튼 클릭 시
    const handelDeleteBtn = () => {
        fetchCorpDelete(coCd);
        onClose();
    }

    // 저장 버튼 클릭 시
    const handelSaveBtn = () => {
        isEditing ? fetchCorpUpdate() : fetchCorpSave(); // isEditing: true => 수정 / false => 저장
    }

    return (
        <>
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white">
            <InfoBoxBar title={'기본정보'} onOpen={onOpen} handelSaveBtn={handelSaveBtn} />
            <Box>
                <InputGrid corp={corp} setCorp={setCorp} />
            </Box>
        </Box>

         {/* 삭제 모달 */}
         {isOpen? <DeleteModal isOpen={isOpen} onClose={onClose} handelDeleteBtn={handelDeleteBtn}/>:''}
         </>
    );

};

export default InfoBox;