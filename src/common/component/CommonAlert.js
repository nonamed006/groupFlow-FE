import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";

import React, { useEffect } from "react";

// status: 'success', 'error', 'warning', 'info'
const CommonAlert = ({ alertInfo, setAlertInfo }) => {
  const { status, title, detail, width } = alertInfo;

  useEffect(() => {
    setTimeout(() => {
      setAlertInfo({ ...alertInfo, isOpen: false });
    }, 5000);
  }, []);

  return (
    <Box display={"flex"} justifyContent={"center"} >
      <Alert
        status={status}
        minW={"250px"}
        w={width}
        position="fixed"
        bottom={7}
        borderRadius={"10px"}
        minH={"50px"}
        boxShadow={"sm"}
        zIndex={11111}
      >
        <AlertIcon />
        <Box w={"fit-content"} minW={"250px"}>
          <AlertTitle>{title}</AlertTitle>
          {detail !== undefined && detail !== "undefined" && (
            <AlertDescription  whiteSpace={'pre-wrap'} >{detail}</AlertDescription>
          )}
        </Box>
        <CloseButton
          alignSelf="flex-end"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => setAlertInfo({ ...alertInfo, isOpen: false })}
        />
      </Alert>
    </Box>
  );
};

export default CommonAlert;
