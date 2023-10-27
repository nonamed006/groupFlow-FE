import { Table, Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect } from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import DepGroupTbody from "./DepGroupTbody";
import Loading from "common/Loading";
import { useInView } from "react-intersection-observer";

const DepGroup = (props) => {
  const headerGroups = ["부서", "직급", "직책", "사용자명"];
  const [infiniteScrollRef, inView] = useInView();
  useEffect(() => {}, [props]);
  return (
    <div>
      <Box minHeight={450}>
        {props.value.length > 0 ? (
          <Table variant="simple" w={"100%"}>
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

        {props.isLoading ? (
          <Loading />
        ) : (
          <Box ref={infiniteScrollRef} h={"1px"} />
        )}
      </Box>
    </div>
  );
};

export default DepGroup;
