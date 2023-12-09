import { Box, Grid, GridItem, Select, Button, Input } from "@chakra-ui/react";
import api from "api/Fetch";
import { useEffect, useState } from "react";
import RealGrid from "./RealGrid";
import CardMenuBar from "common/component/CardMenuBar";
import Loading from "common/Loading";
import FormInput from "common/component/FormInput";

const EmpList = ({tab, realGridHandler}) => { //setCoCd, setEmpCd
    const [ searchCoCd, setSearchCoCd ] = useState('');         // 회사 카테고리 코드
    const [ searchCorpList, setSearchCorpList ] = useState([]); // 회사 카테고리 목록
    const [ keyword, setKeyword ] = useState('');               // 검색어
    const [ list, setList ] = useState([]);                     // 회사 + 부서 + 사용자 목록
    const [ empCount, setEmpCount ] = useState([]);             // 사용자 카운트
    const [ isLoading, setIsLoading ] = useState(false);

    // 회사 + 부서 + 사용자 목록 조회
    const getEmpList = async() => {
        realGridHandler('', '');
        setIsLoading(true);
        const response = await api.roleEmp.getEmpListApi(searchCoCd, keyword);
        setIsLoading(false);
        setList(response.data);
        setEmpCount(response.voData.empCount);
    }

    // 회사 카테고리 조회
    const getCorpList = async() => {
        const response = await api.roleEmp.getCorpListApi();
        setSearchCorpList(response.data);
    }

    useEffect(() => {
        if(tab === 'emp') {
            getCorpList();
            getEmpList();
        }
    }, [tab])

    return (
        <Box borderRadius="5px" bg="white" h="700px" p="6">
            <CardMenuBar title='사용자' count={empCount}/>
            <Box
                mb={3}
            >
                <Select
                    borderRadius="5px"
                    mb={1}
                    onChange={(e) => {
                        setSearchCoCd(e.target.value);
                    }}
                >
                    <option value=''>전체</option>
                    {
                        searchCorpList && searchCorpList.map((corp, key) => {
                            return (
                                <option value={corp.coCd} key={key}>{corp.coNm}</option>
                            )
                        })
                    }
                </Select>
                <FormInput
                    searchBar={true}
                    onChange={(e)=>setKeyword(e.target.value)}
                    handleSearchBtn={getEmpList}
                    placeholder={'부서명/사원명을 입력하세요.'}
                    btnText={'검색'}
                />
            </Box>
            {/* <Grid templateColumns='repeat(4, 1fr)' gap={2}>
				<GridItem colSpan={4}>
                    <Select onChange={(e) => {
                        setSearchCoCd(e.target.value);
                    }}>
                        <option value=''>전체</option>
                        {
                            searchCorpList && searchCorpList.map((corp, key) => {
                                return (
                                    <option value={corp.coCd} key={key}>{corp.coNm}</option>
                                )
                            })
                        }
                    </Select>
                </GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="부서명/사원명을 입력하세요." name='keyword' defaultValue={''} size="md" borderRadius="14px"  onChange={(e) => {
						setKeyword(e.target.value);
					}}/>
				</GridItem>
				<GridItem colStart={4} colEnd={4}>
					<Button borderRadius={'10px'} fontWeight={'600'} variant="brand" onClick={() => {
						getEmpList();
					}}>검색</Button>
				</GridItem>
			</Grid> */}
            
            <Box w={"full"} h={'500px'}>
                {
                    isLoading ?
                        <Loading/>
                    :
                        <RealGrid org={list} setListDetail={realGridHandler}/>
                }
            </Box>
        </Box>
    )
}

export default EmpList;