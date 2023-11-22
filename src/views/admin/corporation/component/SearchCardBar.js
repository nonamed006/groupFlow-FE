import React from 'react';
import { Box } from '@chakra-ui/react';
import CommonSearchBar from 'common/component/CommonSearchBar';
import FormInput from 'common/component/FormInput';

const SearchCardBar = ({ setUseYn,useYn, setKeyword, handleSearchBtn }) => {

	return (
			<CommonSearchBar handleSearchBtn={()=>handleSearchBtn()} btnText={'검색'} >

				<Box w={'30%'} marginRight={'10'} >
					<FormInput
						searchBar={true}
						title={'회사명'}
						placeholder="검색어를 입력하세요."
						name='keyword'
						onChange={(e)=>setKeyword(e.target.value)}
					/>	</Box>
				<Box w={'30%'} >
					<FormInput
            			type={'select'}
						searchBar={true}
						title={'사용여부'}
						placeholder="전체"
						name='useYn'
						onChange={(e)=>setUseYn(e.target.value)}
						pk={1}
						defaultValue={useYn}
						readOnly={false}
						values={[
							{ value: 1, name: '사용' },
							{ value: 0, name: '미사용' },
						]}
					/>
				</Box>
			</CommonSearchBar>
	)
};

export default SearchCardBar;



