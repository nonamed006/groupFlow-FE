import {
  Box
} from "@chakra-ui/react"
import { PORT } from "set";
import React, { useState, useEffect } from "react";
import DepGrpCard from "./DepGrpCard";

const DepGrpCardList = ({corpDepCd, setDepGrp}) => {
  const [depGrpList, setDepGrpList] = useState([]); // 사원 목록

	useEffect(() => {
		fetchDepGrpList();
	}, [corpDepCd]);

    	// 조직_그룹 목록 조회
	const fetchDepGrpList = () => {
		let url = `${PORT}/depGrp`;
		if(corpDepCd !== '') url += `?code=${corpDepCd}`
		fetch(url, {
			method: "GET"
		}).then(res => res.json()).then(res => {
			console.log(res.data);
			setDepGrpList(res.data);
		});
	};

  return (
    <Box overflowY={'scroll'} overflowX={'hidden'}
      boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>

      {depGrpList&&
	  	depGrpList.map((depGrp, index) => {
        	return <DepGrpCard depGrp={depGrp} key={index} setDepGrp={setDepGrp}/>
      })}
    </Box>
  );
};

export default DepGrpCardList;
