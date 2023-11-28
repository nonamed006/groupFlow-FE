import {
  Text,
  Flex,
  Box,
  Button,
  Center,
  Spacer,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";
import { UseMouseOver } from "hook/UseMouseOver";
const Paging = ({ chHistory, handelChangeHistoryBtn }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
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

  let temp1 = endPage % navigatePages === 0 ? 5 : endPage % navigatePages;
  let limit = endNavigate === group ? temp1 : navigatePages;
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
  const test = (page) => {
    handelChangeHistoryBtn(page);
  };
  const rendering = () => {
    const result = [];
    for (let i = 1; i < limit + 1; i++) {
      result.push(
        <Box
          p="3"
          backgroundColor={
            selectedIndex === i
              ? "navy.50"
              : mouseOverIndex === i
                ? "navy.50"
                : "white"
          }
          onMouseOut={onMouseOut}
          onMouseOver={() => {
            onMouseOver(i);
          }}
          onClick={() => {
            test((group - 1) * navigatePages + i);
            setSelectedIndex(i);
          }}
        >
          {(group - 1) * navigatePages + i}
        </Box>
      );
    }
    return result;
  };
  return (
    <Box  >
      {chHistory.list?.length > 0 && (
        <Box  >
        <Flex w={'100%'} alignItems={"center"} justifyContent={"center"}>

          <Flex>
            <Center >
              <Button
              borderRadius={'5px'}
              bg={'white'}
              w={'50%'}
                onClick={() => {
                  test(1);
                  setSelectedIndex(1);
                }}
              >
                {"<<"}
              </Button>
            </Center>
            <Center>
              <Button
              borderRadius={'5px'}
              bg={'white'}
              w={'50%'}
                onClick={() => {
                  if (chHistory.pageNum % navigatePages === 0) {
                    test((Math.floor(chHistory.pageNum / navigatePages) - 1) * 5);
                    setSelectedIndex(navigatePages);
                    if (chHistory.pageNum <= navigatePages) {
                      test(1);
                      setSelectedIndex(1);
                    }
                  } else {
                    if (chHistory.pageNum <= navigatePages) {
                      test(Math.floor(chHistory.pageNum / navigatePages) * 5);
                      setSelectedIndex(1);
                    } else {
                      test(Math.floor(chHistory.pageNum / navigatePages) * 5);
                      setSelectedIndex(navigatePages);
                    }
                  }
                }}
              >
                {"<"}
              </Button>
            </Center>
            {rendering()}
            <Center>
              <Button
              borderRadius={'5px'}
              bg={'white'}
              w={'50%'}
                onClick={() => {
                  if (chHistory.pageNum % navigatePages === 0) {
                    test(chHistory.nextPage);
                    setSelectedIndex(1);
                  } else {
                    if (chHistory.pageNum + navigatePages > chHistory.pages) {
                      test(chHistory.pages);
                      if (chHistory.pages % navigatePages === 0) {
                        setSelectedIndex(navigatePages);
                      } else {
                        setSelectedIndex(chHistory.pages % navigatePages);
                      }
                    } else {
                      test(
                        (Math.floor(chHistory.pageNum / navigatePages) + 1) *
                        navigatePages +
                        1
                      );
                      setSelectedIndex(1);
                    }
                  }
                }}
              >
                {">"}
              </Button>
            </Center>
            <Center>
              <Button
                borderRadius={'5px'}
                bg={'white'}
                w={'50%'}
                onClick={() => {
                  test(chHistory.pages);
                  if (chHistory.pages % navigatePages === 0) {
                    setSelectedIndex(navigatePages);
                  } else {
                    setSelectedIndex(chHistory.pages % navigatePages);
                  }
                }}
              >
                {">>"}
              </Button>
            </Center>
          </Flex>
        </Flex>
        <Box float={"right"} mt={-7}>
        <Center>
            <Text>
              1-{chHistory.pages}페이지/총{chHistory.total}개
            </Text>
          </Center>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Paging;
