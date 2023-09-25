import { Box, Grid, GridItem, Button, useDisclosure, Select, Input } from "@chakra-ui/react";
import React, { useState } from "react";


const SearchBar = () => {

	return (
            <Grid 
      

           gap={2}>
                <GridItem colSpan={14}  colStart={0} colEnd={14}>
                    <Select name='coCd' borderRadius="14px" onChange={(e)=>{}} >
						<option  value=''>전체</option>
					</Select>
                </GridItem>
                <GridItem colSpan={12} colStart={0} colEnd={12}>
                    <Input placeholder="권한명을 검색하세요"/>
                </GridItem>
                <GridItem colStart={12} colEnd={14}>
                    <Button variant="brand" onClick={()=>{}}>검색</Button>
                </GridItem>
            </Grid>
	);
};

export default SearchBar;
