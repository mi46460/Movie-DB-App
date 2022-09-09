import React from 'react';
import logicWathcList from '../logic/WatchListLogic';
import {
    FlatList
} from 'react-native';
import CardWatchList from './CardWatchList';
import { observer } from "mobx-react";
import data from '../data/data';


const FlatListWatchList = observer(() => {
    return(
        <FlatList
            data={logicWathcList.searchedData.length !=0 ? logicWathcList.searchedData : data.localData}
            renderItem={
                ({item, index}) => <CardWatchList data={item} index={index}/>  
            }
            keyExtractor={(item, index) => String(index)}
        />
    )
})

export default FlatListWatchList;