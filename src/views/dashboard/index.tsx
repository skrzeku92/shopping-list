import React, { useEffect, useState } from "react";
import {List, mockLists} from '../../assets/mock';
import ListCard from "../../components/list-card";

const Dashboard: React.FC = ()=> {
    const [lists, setLists] = useState<List[]>([]);

    useEffect(()=> {
        setLists(mockLists);
        console.log(mockLists);
    }, [])

    return (
        <div>{lists.map((list, index)=> {
            return (<ListCard list={list} key={index}/>)
        })}</div>
    )
}

export default Dashboard;