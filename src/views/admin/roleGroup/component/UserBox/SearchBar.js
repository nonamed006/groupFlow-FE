import { Box, Grid, Button, Text, GridItem, Input } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const SearchBar = ({ rgCd, keyword, setKeyword, handleSearchBtn }) => {
    const formInputRef = useRef(null);
    
	useEffect(() => {
		onClearSelect();
	}, [rgCd]);

    const onClearSelect = () => {
		if (formInputRef.current) 
			formInputRef.current.reset();
	}
    return (

        <Box bg='white'>
            <form ref={formInputRef}>
            <Grid templateColumns='repeat(14, 1fr)' gap={1}>
                <GridItem colSpan={2}><Text style={{ textAlign: 'center' }}>이름</Text></GridItem>
                <GridItem colSpan={11}>
                    <Input placeholder="검색어를 입력하세요."
                        name='keyword'
                        size="md"
                        borderRadius="14px"
                        onChange={(e) => setKeyword(e.target.value)}
                        defaultValue={keyword}
                         />
                </GridItem>

                <GridItem colStart={14} colEnd={14}>
                    <Button variant="brand" onClick={handleSearchBtn}>검색</Button>
                </GridItem>
            </Grid>
            </form>
        </Box>

    );
};

export default SearchBar;
