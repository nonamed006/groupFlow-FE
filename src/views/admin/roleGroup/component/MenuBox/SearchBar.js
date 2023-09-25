import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";



const SearchBar = () => {

    return (

              <Box bg='white'>
                <Grid templateColumns='repeat(14, 1fr)' gap={1}>
				<GridItem colSpan={2}><Text style={{textAlign: 'center'}}>대메뉴</Text></GridItem>
				<GridItem colSpan={4}>
                <Select name='useYn' borderRadius="14px" onChange={(e)=>{}} >
						<option  value=''>전체</option>
						<option value={1}>사용</option>
						<option value={0}>미사용</option>
					</Select>
                   
				</GridItem>

				<GridItem colStart={7} colEnd={9}><Text style={{textAlign: 'center'}}>메뉴명</Text></GridItem>
				<GridItem colSpan={5}>
                    <Input placeholder="검색어를 입력하세요." name='keyword' size="md" borderRadius="14px"  onChange={(e)=>{}}/>
				</GridItem>
				
				<GridItem colStart={14} colEnd={14}>
					<Button variant="brand" onClick={()=>{}}>검색</Button>
				</GridItem>
			</Grid>
        </Box>
    );
};

export default SearchBar;
