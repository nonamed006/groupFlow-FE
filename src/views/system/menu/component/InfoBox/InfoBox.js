import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from 'react';
import GnbInputGrid from "./GnbInputGrid";
import LnbInputGrid from "./LnbInputGrid";
import CommonAlert from "common/component/CommonAlert";

const InfoBox = ({title, menuInfo, setMenuInfo, setAlertInfo, selectGnbMenuCd}) => {

    return (
        <Box
            borderRadius="lg"
            bg="white"
            h="700px"
            p="6"
            backgroundColor="white"
            overflowY={'scroll'}
        >
            <Box>
                {
                    menuInfo.upperCd ?
                    <LnbInputGrid
                        title={title}
                        menuInfo={menuInfo}
                        setMenuInfo={setMenuInfo}
                        setAlertInfo={setAlertInfo}
                    />
                    :
                    <GnbInputGrid
                        title={title}
                        menuInfo={menuInfo}
                        setMenuInfo={setMenuInfo}
                        setAlertInfo={setAlertInfo}
                        selectGnbMenuCd={selectGnbMenuCd}
                    />
                }
            </Box>
        </Box>
    );
};

export default InfoBox;