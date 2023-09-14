import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const InfoBox = () => {

    const coCd = useSelector((state) => state.solution.dataPk);

    useEffect(() => {
        if (coCd != 0) {
            fetchCorp(coCd);
        }
    }, [coCd]);

    const [corp, setCorp] = useState({
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
        useYn: '',
        postNum: '',
        addr: '',
        addrDetail: '',
        delYn: ''
    }); // 회사 데이터 (하나)


    // 회사 조회
    const fetchCorp = (coCd) => {
        let url = `http://localhost:8080/corp/${coCd}`;
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            let data = res.voData;
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
        let url = `http://localhost:8080/corp`;
        console.log(url);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(corp)
        }).then(res => res.json()).then(res => {
            console.log(res);
        });
    };
    // 회사 정보 수정
    const fetchCorpUpdate = () => {
        let url = `http://localhost:8080/corp`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(corp)
        }).then(res => res.json()).then(res => {
            console.log(res);
        });
    };
    // 회사 삭제
    const fetchCorpDelete = (coCd) => {
        let url = `http://localhost:8080/corp/${coCd}`;
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
        console.log(corp);
        fetchCorpSave();
    }

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white">
            <InfoBoxBar coCd={coCd} handelDeleteBtn={handelDeleteBtn} handelSaveBtn={handelSaveBtn} />
            <Box>
                <InputGrid corp={corp} setCorp={setCorp} />
            </Box>
        </Box>
    );
};

export default InfoBox;