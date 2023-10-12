import { Select, Box } from "@chakra-ui/react";
import React from "react";
import SearchBar from "common/component/SearchBar";

const SearchBarRoleGrp = ({ setSearchCorp, setKeyword, handleSearchBtn, corps }) => {

    return (
        <Box >
            <Select
                name='coCd'
                borderRadius="14px"
                defaultValue={''}
                onChange={(e) => setSearchCorp(e.target.value)}  
                mb={1}>
                <option value={''}>{'전체'}</option>
                {corps &&
                    corps.map((corp, index) => {
                        return (<option key={index} value={corp.coCd}>{corp.coNm}</option>);
                    })};
            </Select>

            <SearchBar
                setKeyword={setKeyword}
                handleSearchBtn={handleSearchBtn}
                placeholder={'검색어를 입력하세요'}
                btnText={'검색'}
            />

        </Box>
    );
};

export default SearchBarRoleGrp;
