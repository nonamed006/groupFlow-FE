import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { PORT } from "set";

const SearchBar = ({ handelSearchBtn, setKeyword, setSelectedMenu}) => {
	const [menuList, setMenuList] = useState();// 대메뉴 목록 (셀렉트박스에서 사용됨)
	useEffect(() => {
		fetchMenuList();
    }, []);
	 // 대메뉴 이름/코드 목록 조회
	 const fetchMenuList = () => {
        let url = `${PORT}/menu/`;
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                setMenuList(res.data);
            });
    }

    return (

              <Box bg='white'>
                <Grid templateColumns='repeat(14, 1fr)' gap={1}>
				<GridItem colSpan={2}><Text style={{textAlign: 'center'}}>대메뉴</Text></GridItem>
				<GridItem colSpan={4}>
                	<Select name='useYn' borderRadius="14px" onChange={(e)=>setSelectedMenu(e.target.value)} >
						{menuList&&
						 menuList.map((menu, index)=>{
							return (<option key={index} value={menu.menuCd}>{menu.menuNm}</option>);
						 })}
					</Select>
				</GridItem>

				<GridItem colStart={7} colEnd={9}><Text style={{textAlign: 'center'}}>메뉴명</Text></GridItem>
				<GridItem colSpan={5}>
                    <Input placeholder="검색어를 입력하세요." name='keyword' size="md" borderRadius="14px"  onChange={(e)=>setKeyword(e.target.value)}/>
				</GridItem>
				
				<GridItem colStart={14} colEnd={14}>
					<Button variant="brand" onClick={()=>handelSearchBtn()}>검색</Button>
				</GridItem>
			</Grid>
        </Box>
    );
};

export default SearchBar;
