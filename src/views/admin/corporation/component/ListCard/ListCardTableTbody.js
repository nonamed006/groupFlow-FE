import React from "react";
import ListCardTableTr from "./ListCardTableTr";

  const ListCardTableTbody = ({listData, setCoCd }) => {

    return (
        <>
              {listData&&
                  listData.map((data, index) =>{
                    return  <ListCardTableTr setCoCd={setCoCd} key={index} index={index} data={data}  />
               })}
        </>

    );
  };
  
  export default ListCardTableTbody;
  