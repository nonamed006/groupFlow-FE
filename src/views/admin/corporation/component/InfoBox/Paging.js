import {
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";
const Paging = ({ chHistory, handelChangeHistoryBtn }) => {
  const pageSize = chHistory.pageSize;
  const navigatePages = chHistory.navigatePages;
  let endPage = Math.ceil(chHistory.total / pageSize);
  let endNavigate = Math.ceil(endPage / navigatePages);
  let group = 0;
  if (chHistory.pageNum % navigatePages === 0) {
    group = chHistory.pageNum / navigatePages;
  } else {
    group = Math.floor(chHistory.pageNum / navigatePages) + 1;
  }
  //if (chHistory.pages !== null) {
  //  console.log("qweqwe", chHistory.pages);
  //  //group = chHistory.pages.slice(0, -1);
  //}

  let temp1 = endPage % navigatePages === 0 ? 5 : endPage % navigatePages;
  let limit = endNavigate === group ? temp1 : navigatePages;
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
  const test = (page) => {
    console.log(page);
    handelChangeHistoryBtn(page);
  };
  const rendering = () => {
    const result = [];
    for (let i = 1; i < limit + 1; i++) {
      result.push(
        <Box
          p="3"
          backgroundColor={
            mouseOverIndex === i
              ? "navy.50"
              : mouseOverIndex === i
              ? "navy.50"
              : "white"
          }
          onMouseOut={onMouseOut}
          onMouseOver={() => {
            onMouseOver(i);
          }}
          onClick={() => test((group - 1) * navigatePages + i)}
        >
          {(group - 1) * navigatePages + i}
        </Box>
      );
    }
    return result;
  };
  return (
    <div>
      {chHistory.list.length > 0 && (
        <Flex>
          {chHistory.prePage > 0 && <Button> {"<<"} </Button>}
          {chHistory.prePage > 0 && <Button> {"<"} </Button>}
          {rendering()}
          {chHistory.nextPage > 0 && <Button>{">"}</Button>}
          {chHistory.nextPage > 0 && <Button>{">>"}</Button>}
        </Flex>
      )}
    </div>
  );
};

export default Paging;
