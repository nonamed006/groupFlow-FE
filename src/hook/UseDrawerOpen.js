import { useState } from "react"

export const UseDrawerOpen = () => {
    const [isDrawer, setIsDrawer] = useState(false);
    const [drawerCnt, setDrawerCnt] = useState(0);

    //drawer open
    const isDrawerOpen = () => setIsDrawer(true);

    //drawer close
    const isDrawerClose = () => setIsDrawer(false);

    //선택된 데이터 개수
    const setCnt = (cnt) => setDrawerCnt(cnt);

    return [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt]
}