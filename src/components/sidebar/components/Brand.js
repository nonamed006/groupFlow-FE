import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom/cjs/react-router-dom";
// Custom components
import { GroupwareLogo } from "components/icons/Icons";

import { useHistory } from 'react-router-dom';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  const history = useHistory();
  return (
    <Flex align='center' direction='column'  >
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> 이혜윤 - 수정(HorizonLogo -> GroupwareLogo) */}
      {/* 로고 클릭 시 홈화면으로 - 안은비 추가 */}
      <Link to='/'>
        <GroupwareLogo h='26px' w='175px' my='32px' color={logoColor} />
      </Link>
      {/* <HSeparator mb='20px' /> */}
    </Flex>
  );
}

export default SidebarBrand;
