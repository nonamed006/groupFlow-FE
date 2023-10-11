import { Grid, GridItem, Button,  Select, Input } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({setSearchCorp, setKeyword, handelSearchBtn, corps}) => {
    
    return (
        <Grid
            mb={5}
            gap={2}>
            {/* <GridItem colSpan={14} colStart={0} colEnd={14}>
                <Select name='coCd' borderRadius="14px"  defaultValue={''} onChange={(e)=>setSearchCorp(e.target.value)}  >
                    <option value={''}>{'전체'}</option>
                    {corps&&
                    corps.map((corp, index)=>{
                        return (<option key={index} value={corp.coCd}>{corp.coNm}</option>);
                    })};
                </Select>
            </GridItem> */}

            <GridItem colSpan={12} colStart={0} colEnd={12}>
                <Input placeholder="권한명을 검색하세요" name='keyword' onChange={(e)=>{setKeyword(e.target.value)}} 
                     size="md" borderRadius="14px" defaultValue={''} />
            </GridItem>
            <GridItem colStart={12} colEnd={14}>
                <Button variant="brand" onClick={() =>handelSearchBtn()}>검색</Button>
            </GridItem>
        </Grid>
    );
};

export default SearchBar;
