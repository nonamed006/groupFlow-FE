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
import { RiOrganizationChart } from "react-icons/ri";

// Custom Components
import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { FaEthereum } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { PORT } from "set";
import { setEmpData } from "redux/solution";
import OrgChartModal from "views/system/orgChart/OrgChartModal";
import { MdInfoOutline } from "react-icons/md";
import { setCookie } from "common/common";
import { deleteCookie } from "common/common";
import EmpIcon from "assets/img/profile/solutionapslfintek2352.png";

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
	//const empInfo = useSelector((state) => state.solution.empData);
	const [empInfo, setEmpInfo] = useState([]);
	const loginEmpInfo = useSelector((state) => state.solution.empData);
	const dispatch = useDispatch();
	const [dpGrpCd, setDpGrpCd] = useState("");
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
				if (res.status !== 200) {
					return window.location.href = '/auth/login?status=' + res.status;
				}
				dispatch(setEmpData(res?.voData));
				setEmpInfo(res.data);
			});
	}

	//부서 변경하면 재로그인
	const empLogin = (data) => {
		fetch(`${PORT}/emp/getLoginEmp`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			},
			credentials: 'include'
		}).then((res) => res.json())
			.then((res) => {
				window.location.replace("/MU000000/home");
				dispatch(setEmpData(res?.data[0]));
				setCookie("Emp_Dp_Type", res.data[0].dpGrpCd, 2);
				window.location.href = '/MU000000/home'
			})
	}

	//사원 로그아웃
	const logoutemp = () => {
		fetch(`${PORT}/emp/logoutEmp`, {
			method: "get",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			credentials: 'include'
			// res에 결과가 들어옴
		})
			.then((res) => res.json())
			.then((res) => {
				setDpGrpCd("");
				deleteCookie("Emp_Dp_Type");
				window.location.replace("/auth/login");
			});
	};

	//체크박스 핸들링
	const handleChange = (e, empInfo) => {
		setDpGrpCd(e.target.value);
		setEmpTemp(empInfo);
	};

	const clickHandle = () => {
		empLogin(empTemp);
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
				<MenuButton p="0px" onClick={() => { setDpGrpCd(loginEmpInfo.dpGrpCd); }}>
					<Flex align="center" justify="center">
						<Avatar
							_hover={{ cursor: "pointer" }}
							src={
								loginEmpInfo.modiNm ? 
									`${PORT}/emp/display/${loginEmpInfo.modiNm}`
								:
								EmpIcon
							}
							alt={loginEmpInfo.empNm ? loginEmpInfo.empNm : 'defaultIcon'}
							bg="white"
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
								{loginEmpInfo?.empNm}
							</Text>
							<Text fontSize="sm" fontWeight="600" color={textColor} display="flex">
								<Text width={"80px"}>
									<Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} textAlign={"left"}>
										{loginEmpInfo?.coNm}
									</Text>
								</Text> <Text marginLeft={"5px"} marginRight={"5px"}> | </Text>
								<Text width={"70px"}>
									<Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} textAlign={"left"}>
										{loginEmpInfo?.dpNm}
									</Text>
								</Text>
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
							fontWeight={600}
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
										<Tr key={index}>
											<Td>{column.coNm}</Td>
											<Td>{column.dpNm}</Td>
											<Td><Checkbox
												me='16px'
												colorScheme='brandScheme'
												value={column.dpGrpCd}
												isChecked={column.dpGrpCd == dpGrpCd ? true : false}
												onChange={(e) => handleChange(e, column)}
											/></Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Flex>
					<Flex p="5px" justifyContent="center">
						<Button variant="brand" borderRadius={"10px"} w="80px" size='sm' onClick={clickHandle}>확인</Button>
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

			{/* 조직도 */}
			{isOpen ? (
				<OrgChartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			) : null}
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func,
};
