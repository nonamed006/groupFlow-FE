import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from 'react';
import GnbInputGrid from "./GnbInputGrid";
import LnbInputGrid from "./LnbInputGrid";

const InfoBox = ({
    title,
    menuInfo,
    setMenuInfo,
    setAlertInfo,
    isEditing,
    setIsEditing,
    isEditingReset,
    setIsSave,
    isSave,
    setIsLoading
}) => {

    return (
        <Box
            borderRadius="5px"
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
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						isEditingReset={isEditingReset}
                        isSave={isSave}
                        setIsSave={setIsSave}
                        setIsLoading={setIsLoading}
                    />
                    :
                    <GnbInputGrid
                        title={title}
                        menuInfo={menuInfo}
                        setMenuInfo={setMenuInfo}
                        setAlertInfo={setAlertInfo}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						isEditingReset={isEditingReset}
                        isSave={isSave}
                        setIsSave={setIsSave}
                        setIsLoading={setIsLoading}
                    />
                }
            </Box>
        </Box>
    );
};

export default InfoBox;