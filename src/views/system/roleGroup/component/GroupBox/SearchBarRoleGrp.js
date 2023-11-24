import { Select, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "common/component/FormInput";

const SearchBarRoleGrp = ({ setSearchCorp, placeholder, setKeyword, handleSearchBtn, corps }) => {

    return (
        <Box mb={3}>
            <Select
                name='coCd'
                borderRadius="5px"
                defaultValue={''}
                onChange={(e) => setSearchCorp(e.target.value)}  
                mb={1}>
                <option value={''}>{'전체'}</option>
                {corps &&
                    corps.map((corp, index) => {
                        return (<option key={index} value={corp.coCd}>{corp.coNm}</option>);
                    })};
            </Select>

            <FormInput
                searchBar={true}
                onChange={(e)=>setKeyword(e.target.value)}
                handleSearchBtn={()=>handleSearchBtn()}
                placeholder={placeholder?placeholder:'검색어를 입력하세요'}
                btnText={'검색'}
            />

        </Box>
    );
};

export default SearchBarRoleGrp;
