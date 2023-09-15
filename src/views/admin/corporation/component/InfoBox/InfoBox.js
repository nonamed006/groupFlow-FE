import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PORT } from "set";

const InfoBox = () => {
    const coCd = useSelector((state) => state.solution.dataPk);
    const [isEditing, setIsEditing] = useState(false);  // 저장 및 수정 상태 (기본값 false - 저장) 

    useEffect(() => {   
        console.log(coCd);
        
        if(coCd !== 0){ // 선택된 coCd 값이 있다면(초기값 0이 아니라면) -> 저장 상태 - 회사 조회, isEditing - true
           fetchCorp(coCd);
            setIsEditing(true);
        }else{
             onReset();
            setIsEditing(false);
        }
    }, [coCd]);

    // 초기 회사 데이터 값
    const [corp, setCorp] = useState({}); // 회사 데이터 (하나)

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
            sort: '',
            fax: '',
            stnd: '',
            useYn: true,
            postNum: '',
            addr: '',
            addrDetail: '',
            delYn: false
        });
    }
    // 회사 조회
    const fetchCorp = (coCd) => {
        let url = `${PORT}/corp/${coCd}`;
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            let data = res.voData;
           
            if (data !== null) {
                onReset();
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
            });}
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
        });
    };
    // 회사 삭제
    const fetchCorpDelete = (coCd) => {
        let url = `${PORT}/corp/${coCd}`;
        fetch(url, {
            method: "PUT",
        }).then(res => res.json()).then(res => {
            alert(res.resultMsg);
        });
    };
    // 삭제 버튼 클릭 시
    const handelDeleteBtn = (coCd) => {
        fetchCorpDelete(coCd);
    }
    // 저장 버튼 클릭 시
    const handelSaveBtn = () => {
        isEditing? fetchCorpUpdate() : fetchCorpSave(); 
    }

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white">
            <InfoBoxBar coCd={coCd} handelDeleteBtn={handelDeleteBtn} handelSaveBtn={handelSaveBtn} />
            <Box>
                <InputGrid corp={corp} setCorp={setCorp} isEditing={isEditing}/>
            </Box>
        </Box>
    );
};

export default InfoBox;