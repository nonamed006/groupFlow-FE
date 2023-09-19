import {
  Box
} from "@chakra-ui/react"
import { PORT } from "set";
import React, { useState, useEffect } from "react";
import DepGrpCard from "./DepGrpCard";

const DepGrpCardList = ({setDepGrp}) => {
  const [depGrpList, setDepGrpList] = useState([]); // 사원 목록
  const [code, setCode] = useState('CO230002'); // 선택된 부서코드 또는 회사코드

	useEffect(() => {
		fetchDepGrpList();
	}, []);

	// 조직_그룹 목록 조회
	const fetchDepGrpList = () => {
		let url = `${PORT}/depGrp/${code}`;

		fetch(url, {
			method: "GET"
		}).then(res => res.json()).then(res => {
			setDepGrpList(res.data);
		});
	};

  return (
    <Box overflowY={'scroll'} overflowX={'hidden'}
      boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>

      {depGrpList.map((depGrp, index) => {
        return <DepGrpCard depGrp={depGrp} key={index} setDepGrp={setDepGrp}/>
      })}
    </Box>
  );
};

export default DepGrpCardList;
