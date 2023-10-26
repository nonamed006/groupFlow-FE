// Chakra Imports
import {
	Avatar,
	Button,
	Checkbox,
	Flex,
	Icon,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { RiOrganizationChart } from 'react-icons/ri'

// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";
// Assets
import navImage from 'assets/img/layout/Navbar.png';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PORT } from 'set';
import { setEmpData } from 'redux/solution';
import { getCookie } from 'common/common';
import { deleteCookie } from 'common/common';
import { setCookie } from 'common/common';
import { ThemeEditor } from './ThemeEditor';
import OrgChartModal from "views/system/orgChart/OrgChartModal";
export default function HeaderLinks(props) {
  const { secondary } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  const empInfo = useSelector((state) => state.solution.empData);
  const dispatch = useDispatch();
  const [dpType, setDpType] = useState("");
  const [empDetail, setEmpDetail] = useState([]);
  const [empTemp, setEmpTemp] = useState();

	// 조직도 isOpen
	const [isOpen, setIsOpen] = useState(false);
	//사원 정보 조회, 리덕스에 저장
	const getEmpInfo = () => {
		fetch(
			`${PORT}/emp/getEmpInfo`,
			{
				method: "post",
				headers: {
					'Content-Type': "application/json; charset=utf-8",
				},
				credentials: 'include'
				// res에 결과가 들어옴
			}
		).then((res) => res.json())
			.then((res) => {
				setDpType(getCookie("Emp_Dp_Type"));
				dispatch(setEmpData(res.data));
				setEmpDetail(res.data[0]);
			});
	}

  //사원 로그아웃
  const logoutemp = () => {
    fetch(`${PORT}/emp/logoutEmp`, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: getCookie("Authorization"),
      },
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        deleteCookie("Authorization");
        deleteCookie("Emp_Dp_Type");
        setDpType("");
        window.location.replace("/auth/login");
      });
  };

  //체크박스 핸들링
  const handleChange = (e, empInfo) => {
    setDpType(e.target.value);
    setEmpTemp(empInfo);
  };

  const clickHandle = () => {
    setCookie("Emp_Dp_Type", dpType, 2);
    setEmpDetail(empTemp);
  };

  useEffect(() => {
    getEmpInfo();
  }, []);

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: "none", md: "unset" }}>
            {" "}
            ETH
          </Text>
        </Text>
      </Flex>
      {/* 이혜윤 - 수정(메뉴 아이콘 때문에 안눌려서 주석 처리)
			<SidebarResponsive routes={routes} /> */}

			<Menu>
				<MenuButton p="0px"  onClick={() => { setDpType(getCookie("Emp_Dp_Type")); }}>
					<Flex align="center" justify="center">
						<Avatar
							_hover={{ cursor: "pointer" }}
							color="white"
							name="Adela Parkson"
							bg="#11047A"
							size="sm"
							w="40px"
							h="40px"
						/>
						<Flex direction={"column"} p="0px 10px">
							<Text
								textAlign={"left"}
								fontSize="sm"
								fontWeight="600"
								color={textColor}
							>
								{empDetail?.empNm}
							</Text>
							<Text fontSize="sm" fontWeight="600" color={textColor}>
							{empDetail?.coNm} | {empDetail?.dpNm}
							</Text>
						</Flex>
						<ChevronDownIcon />
					</Flex>
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p="0px"
					mt="10px"
					borderRadius="20px"
					bg={menuBg}
					border="none"
					minW="300px"
				>
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}
						>
							회사정보
						</Text>
						<Spacer />
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="30%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							color="red"
							_hover={{ cursor: 'pointer' }}
							onClick={() => { logoutemp() }}
						>LogOut</Text>
					</Flex>
					<Flex flexDirection="column" p="5px">
						<TableContainer>
							<Table variant='simple' >
								<Thead>
									<Tr>
										<Th>회사명</Th>
										<Th>부서명</Th>
										<Th>상태</Th>
									</Tr>
								</Thead>
								<Tbody>
									{empInfo?.map((column, index) => (
										<Tr>
											<Td>{column.coNm}</Td>
											<Td>{column.dpNm}</Td>
											<Td><Checkbox 
													me='16px' 
													colorScheme='brandScheme' 
													value={column.dpGrpCd} 
													isChecked={column.dpGrpCd == dpType ? true : false} 
													onChange={(e) => handleChange(e, column)} 
												/></Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex p="5px" justifyContent="center">
						<Button variant="brand" w="80px" size='sm' onClick={clickHandle}>확인</Button>
					</Flex>
				</MenuList>
			</Menu>
			<Spacer />
			<Menu>
				{/* 조직도 버튼 */}
				<MenuButton p="0px" onClick={() => setIsOpen(true)}>
					<Icon
						mt="6px"
						as={RiOrganizationChart}
						color={navbarIcon}
						w="18px"
						h="18px"
						me="10px"
					/>
				</MenuButton>
			</Menu>

			<Menu>
				<MenuButton p='0px' >
					<Icon
						mt='6px'
						as={MdInfoOutline}
						color={navbarIcon}
						w='18px'
						h='18px'
						me='10px'

					/>
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					me={{ base: "30px", md: "unset" }}
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					minW={{ base: "unset" }}
					maxW={{ base: "360px", md: "unset" }}>
					<Image src={navImage} borderRadius='16px' mb='28px' />
					<Flex flexDirection='column'>
						<Link
							w='100%'
							href='https://horizon-ui.com/pro?ref=horizon-chakra-free'>
							<Button w='100%' h='44px' mb='10px' variant='brand'>
								Buy Horizon UI PRO
							</Button>
						</Link>
						<Link
							w='100%'
							href='https://horizon-ui.com/documentation/docs/introduction?ref=horizon-chakra-free'>
							<Button
								w='100%'
								h='44px'
								mb='10px'
								border='1px solid'
								bg='transparent'
								borderColor={borderButton}>
								See Documentation
							</Button>
						</Link>
						<Link
							w='100%'
							href='https://github.com/horizon-ui/horizon-ui-chakra'>
							<Button
								w='100%'
								h='44px'
								variant='no-hover'
								color={textColor}
								bg='transparent'>
								Try Horizon Free
							</Button>
						</Link>
					</Flex>
				</MenuList>
			</Menu>
			<Menu>
				<ThemeEditor navbarIcon={navbarIcon} />
			</Menu>
			{/* 조직도 */}
			{isOpen ? <OrgChartModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> : null}
		</Flex>

	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func,
};
