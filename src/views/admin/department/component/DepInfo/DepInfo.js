import { Box,Flex,
  TabPanels, TabPanel, Tab,Tabs, TabList,
  } 
  from '@chakra-ui/react/dist/chakra-ui-react.cjs';

import React, {useEffect, useState,} from 'react';
import DepInfoBox from './DepInfoBox';
import { useSelector } from "react-redux";
import {PORT} from "set";
import DepBasic from "./DepBasic";
import DepGroup from "./DepGroup";
import { useDispatch } from 'react-redux';
import { setDataPk } from 'redux/dep';

const EmpInfo = () => {
  const dispatch = useDispatch();
    const dpCd = useSelector((state) => state.depDetail.dataPk);
    const [depDto, setDepDto] = useState({});
    const [dg, setDg] = useState([]);

    //부서 상세조회
    const getDepDto = () => {
      let url = `${PORT}/dep/detail?dpCd=${dpCd}`;
      fetch(url, {method : "GET" })	
        .then(res=>
           res.json()
        )
        .then(res=>{
          setDepDto(res.voData);
			});
	  }

    //부서원 조회
    const getDepGroup = () => {
      let url = `${PORT}/dep/dg?dpCd=${dpCd}`;
      fetch(url, {method : "GET" })	
        .then(res=>
           res.json()
        )
        .then(res=>{
          // console.log(res);
          setDg(res.data);
			});
    }
   

    const fetchUpdateDep = () => {
      let url = `${PORT}/dep`;
      fetch(url, {
        method : "PUT" ,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(depDto)
      })
        .then(res=>
           res.json()
        )
        .then(res=>{
          setDepDto(res);
			});
    }
    const change = (depDto) => {
      setDepDto(depDto);
    }
    const updateBtn = () => {
      fetchUpdateDep();
    }
    useEffect(() => {
      if(dpCd != 0){
        getDepDto();
        getDepGroup();

      }
    }, [dpCd]);
    return (
        <div>
            <Box borderRadius="lg" bg="white" h="600px" p="6">
            <DepInfoBox title={"상세정보"} updateBtn={updateBtn}/>
                <Tabs colorScheme="brandScheme">
                    <TabList>
                        <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
                            <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                                기본정보
                            </Tab>
                            <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                                조직정보
                            </Tab>
                        </Flex>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <DepBasic value={depDto} change={change}/>
                        </TabPanel>
                        <TabPanel>
                          <DepGroup value={dg}/>
                        </TabPanel>
                    </TabPanels>
              
                </Tabs>
            </Box>
        </div>
    )
};

export default EmpInfo;