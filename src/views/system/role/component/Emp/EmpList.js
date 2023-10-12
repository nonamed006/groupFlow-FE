import { Box, Grid, GridItem, Select, Button, Input } from "@chakra-ui/react";
import { getEmpListApi, getCorpListApi } from "api/roleEmp/RoleEmpApi";
import { useEffect, useState } from "react";
import RealGrid from "./RealGrid";

const EmpList = () => {
    //const searchCorpList = getCorpList();
    const [ searchCoCd, setSearchCoCd ] = useState('');
    const [ searchCorpList, setSearchCorpList ] = useState([]);
    const [ list, setList ] = useState([]);
    const [ emp, setEmp ] = useState({});

    useEffect(() => {
        const getCorpList = async() => {
            const response = await getCorpListApi();
            setSearchCorpList(response.data);
        }
        getCorpList();
    }, [])

    useEffect(() => {
        const getEmpList = async() => {
            const response = await getEmpListApi(searchCoCd);
            setList(response.data);
        }
        getEmpList();
    }, [searchCoCd])

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6">
            <Grid templateColumns='repeat(4, 1fr)' gap={2}>
				<GridItem colSpan={4}>
                    <Select onChange={(e) => {
                        setSearchCoCd(e.target.value);
                    }}>
                        <option>전체</option>
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
						// setSearch({
						// 	...search,
						// 	searchMenuNm: e.target.value
						// })
					}}/>
				</GridItem>
				<GridItem colStart={4} colEnd={4}>
					<Button variant="brand" onClick={() => {
						// setSearch({
						// 	...search,
						// 	onSearchClick: !search.onSearchClick
						// })
					}}>검색</Button>
				</GridItem>
			</Grid>
            
            <Box w={"full"} h={'500px'} overflowY={'scroll'}>
                <RealGrid org={list} setListDetail={setEmp}/>
            </Box>
        </Box>
    )
}

export default EmpList;