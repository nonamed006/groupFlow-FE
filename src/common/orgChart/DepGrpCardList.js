import {
  Box
} from "@chakra-ui/react"

import React, { useState } from "react";
import DepGrpCard from "./DepGrpCard";

const DepGrpCardList = () => {
  const [depGrpList, setDepGrpList] = useState([
    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111', // 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },
    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111', // 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },
    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },

    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },

    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },

    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },

    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },

    {
      dpGrpcd: "DG230001", // 조직_그룹 코드
      coCd: "CO230002", // 회사코드
      dpCd: "DP230001", // 부서코드
      empCd: "EM230001", // 사원코드
      coDomain: "", // 회사 도메인  - 하나 조회시
      telNum: '051-111-1111',// 조직_부서 전화번호
      rankNm: "사원", // 직급명 
      pstnNm: "팀원", // 직책명
      empNm: "장은주",  // 사원명
      mailId: "jej",  // 메일 아이디 
      psnMail: null,  // 개인메일 - 하나 조회시
      fileNm: null, // 프로필 파일명
      filePath: null, // 프로필 파일경로
      dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
      dpPathNm: [ // 상위부서-현재부서 이름
        "test3333",
        "부서명",
        "-부서2"
      ]
    },
  ]); // 사원 목록

  return (

    <Box overflowY={'scroll'} overflowX={'hidden'}
      boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>

      {depGrpList.map((depGrp, index) => {
        return <DepGrpCard depGrp={depGrp} key={index} />
      })}
    </Box>
  );
};

export default DepGrpCardList;
