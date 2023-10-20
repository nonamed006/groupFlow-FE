import { Button, Flex, Spacer, Text } from '@chakra-ui/react';
import '../../assets/css/BottomDrawer.css';
import React from 'react';


//버튼 클릭했을때 함수
//cnt: 선택된 데이터 개수
//type: 모달 타입 => 1: 사용,미사용 삭제 선택해제 // 2: 삭제, 선택해제 // 3: 적용, 선택해제 
//handler1: 사용할 함수 
//handler2: 사용할 함수 
//onDelete: 삭제 함수 => onclick에 올 함수
const BottomDrawer = ({ cnt, type, handler1, handler2, onDelete, isDrawerClose }) => {
    return (
        <div className='drawerBody' style={{ diplay: cnt != null ? "hide" : "show" }}>
            <Flex style={{ marginTop: "18px" }}>
                <Text
                    color="#B9A2FF"
                    fontSize="23px"
                    paddingLeft="80px"
                >
                    {cnt != null ? cnt : 0}건
                </Text>
                <Text
                    color="white"
                    fontSize="23px"
                    paddingLeft="10px"
                >
                    선택됨
                </Text>
                <Spacer />
                {type == 1 ?
                    <>
                        <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={handler1}>
                            사용
                        </Button>
                        <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={handler2}>
                                미사용
                            </Button>
                        <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={onDelete}>
                            삭제
                        </Button>
                    </>
                    : type == 2 ?
                        <>
                            <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={onDelete}>
                                삭제
                            </Button>
                        </>
                        : 
                            <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={handler1}>
                                적용
                            </Button>
                }
                <Button variant="outline" color="white" borderRadius="4px" marginRight="20px" onClick={isDrawerClose}>
                    선택해제
                </Button>
            </Flex>
        </div>
    );
};

export default BottomDrawer;