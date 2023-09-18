import React from "react";

import ModalLayout from 'common/modal/ModalLayout';
import OrgChartBox from './OrgChartBox';

const OrgChartModal = ({onClose, isOpen }) => {
  return (
    <ModalLayout title={'조직도'} onClose={onClose} isOpen={isOpen} buttonYn={false} size={'6xl'} >
      <OrgChartBox />
    </ModalLayout>
  );
};

export default OrgChartModal;
