import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PORT } from 'set';
import DepRealGrid from '../DepRealGrid';

const GridList = ({setDpCd, fetchRoleGroup, setTotalCount}) => {
    const [org, setOrg] = useState([]);
    const [checkedMenuCd, setCheckedMenuCd] = useState([]); // 선택된 메뉴 코드 리스트

    useEffect(() => {
        getOrg();
    }, [])

    const getOrg = () => {
        let url = `${PORT}/roleEmp/list?empYn=N&searchCoCd=&keyword=&search=dep`;
        fetch(url, { method: "GET" })
          .then((res) => res.json())
          .then((res) => {
            setOrg(res.data);
          });
      };

    return (
        <Box borderRadius="lg" bg="white" h="fit-content" display={'flex'} px="6">
            <DepRealGrid org={org} setCheckedMenuCd={setCheckedMenuCd} setDpCd={setDpCd} fetchRoleGroup={fetchRoleGroup}/>
        </Box>
    );
};

export default GridList;