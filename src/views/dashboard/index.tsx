import React, { useEffect, useState } from "react";
import ListCard from "../../components/list-card";
import * as S from "../../assets/styles";
import { fetchAllLists } from "../../utils";
import { List } from "../../types/type";

const Dashboard: React.FC = ()=> {
    const [lists, setLists] = useState<List[]>([]);

    const fetchlists = async (): Promise<void>=> {
        const newLists = await fetchAllLists('admin@wp.pl');
        console.log(newLists);
        setLists(newLists);
    }

    useEffect(()=> { 
        fetchlists();
    }, [])

    return (
        <S.ListWrapper>{lists.map((list, index)=> { 
            return (<ListCard list={list} key={index}/>)
        })}</S.ListWrapper>
    )
}

export default Dashboard;