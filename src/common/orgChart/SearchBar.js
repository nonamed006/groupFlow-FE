import { Box, Grid, GridItem, Button, Select,  Input, Text} from '@chakra-ui/react';
  import React from "react";

  const SearchBar = ({setKeyword, setSearch, handleSearchBtn}) => {
    return (
        <Box borderRadius='lg'  boxShadow='lg' bg='white' p={2}>
        <Grid templateColumns='repeat(14, 1fr)' gap={2}>
            <GridItem colSpan={1}><div style={{textAlign: 'center'}}>회사/부서</div></GridItem>
            <GridItem colSpan={3}>
                <Select   
                    onChange={(e)=>{setSearch(e.target.value)}} 
                    style={{ color: "gray" }} 
                    defaultValue={''}
                    placeholder='검색기준'
                    borderRadius="14px"
                >
                    <option value='corp'>회사</option> 
                    <option  value='dep'>부서</option>     
                </Select>
            </GridItem>
            
            <GridItem colStart={6} colEnd={6}>
                <Text style={{textAlign: 'center'}}>검색어</Text>
            </GridItem>
            <GridItem colSpan={5}>
                <Input 
                onChange={(e)=>{setKeyword(e.target.value)}} 
                placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
            </GridItem>
            <GridItem colStart={14} colEnd={14}>
                <Button variant="brand" onClick={()=>handleSearchBtn()}>검색</Button>
            </GridItem>
        </Grid>
    </Box>
    );
  };
  
  export default SearchBar;
  