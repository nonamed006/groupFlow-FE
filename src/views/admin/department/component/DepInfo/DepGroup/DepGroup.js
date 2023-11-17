import { Table, Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect } from "react";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";
import DepGroupTbody from "./DepGroupTbody";
import Loading from "common/Loading";

const DepGroup = (props) => {
  const headerGroups = ["부서", "직급", "직책", "사용자명"];
  useEffect(() => { }, [props]);
  return (
    <Box display={'flex'} justifyContent={"center"}>
      <Box
        minHeight={450}
        maxH={530}
        w={'95%'}
        mt={5}
        overflowY={"auto"}
      >
        {props.value.length > 0 ? (
          <Table variant="simple" w={"100%"} colorScheme="facebook">
            {/* Thead */}
            <ListCardTableHeader headerGroups={headerGroups} />
            {/* Tbody */}
            <DepGroupTbody dg={props.value} />
          </Table>
        ) : (
          <Text
            pt={200}
            align={"center"}
            fontWeight={600}
            color={"lightgray"}
            fontSize={"18px"}
          >
            검색된 데이터가 없습니다.
          </Text>
        )}

        {props.isLoading && <Loading />}
      </Box>
    </Box>
  );
};

export default DepGroup;
