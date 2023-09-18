import { Box, Grid, GridItem, Button, Select,  Input, Text} from '@chakra-ui/react';
  import React from "react";
  
  const SearchBar = () => {
    return (
        <Box borderRadius='lg'  boxShadow='lg' bg='white' p={2}>
        <Grid templateColumns='repeat(14, 1fr)' gap={2}>
            <GridItem colSpan={1}><div style={{textAlign: 'center'}}>회사/부서</div></GridItem>
            <GridItem colSpan={3}>
                <Select placeholder='전체' borderRadius="14px">
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </GridItem>
            
            <GridItem colStart={6} colEnd={6}><div style={{textAlign: 'center'}}>검색어</div></GridItem>
            <GridItem colSpan={5}>
                <Input placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
            </GridItem>
            <GridItem colStart={14} colEnd={14}>
                <Button variant="brand">검색</Button>
            </GridItem>
        </Grid>
    </Box>
    );
  };
  
  export default SearchBar;
  