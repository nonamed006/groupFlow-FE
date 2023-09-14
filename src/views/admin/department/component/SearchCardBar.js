import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Grid, Input, GridItem} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { setDataPk } from 'redux/solution';
import {PORT} from "set";
const SearchCardBar = () => {

	const [corpNm, setCorpNm] = useState([]);
	const [selectedCoNm, setSelectedCoNm] = useState('');
	const [searchText, setSearchText] = useState('');
	const [depCd, setDepCd] = useState();

	//리덕스
	const dispatch = useDispatch();

	const getCorpNmList = () => {
		let url = `${PORT}/corp/list`;
		fetch(url, {
			method : "GET"
		}).then(res=>res.json())
			.then(res=>{
				setCorpNm(res.data);
				
			});
			     
	};
	const coNmChange = (e) => {
		const selectedValue = e.target.value;
    setSelectedCoNm(selectedValue);
	}
	const onChangeSearchText = (e) => {
		setSearchText(e.target.value);
	}
	const onClickSearchText = () => {
		let url = `${PORT}/dep?text=${searchText}&coNm=${selectedCoNm}`;
		fetch(url, {method : "GET" })	
			.then(res=>res.json())
			.then(res=>{
				dispatch(setDataPk(res));
				console.log(res)
				
			});
	}
	useEffect(() => {
    getCorpNmList();
  }, []);

	return (<div>
		<Box borderRadius='lg' bg='white' p='6'>
			<Grid templateColumns='repeat(14, 1fr)' gap={2}>
				<GridItem colSpan={1}><div style={{textAlign: 'center'}}>회사</div></GridItem>
				<GridItem colSpan={2}>
					<Select placeholder='전체' value={selectedCoNm} onChange={coNmChange}>
						{corpNm.map((item, index) => (
            	<option key={index} value={item}>
              	{item}
            	</option>
          ))}
					</Select>
				</GridItem>
				
				<GridItem colStart={5} colEnd={5}><div style={{textAlign: 'center'}}>코드/부서명</div></GridItem>
				<GridItem colSpan={3}>
					<Input placeholder="검색어를 입력하세요." name="searchText" size="md" borderRadius="14px" onChange={onChangeSearchText} />
				</GridItem>
				<GridItem colStart={14} colEnd={14}>
					<Button variant="brand" onClick={onClickSearchText}>검색</Button>
				</GridItem>
			</Grid>
		</Box>
	</div>)
};

export default SearchCardBar;



