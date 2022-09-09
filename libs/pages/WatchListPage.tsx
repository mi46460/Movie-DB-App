import React, { useEffect,
    useState,
    useRef,
    useLayoutEffect
    } from 'react';
    
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    TextInput,
    TouchableOpacity
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../api/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "../routes/route";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/route';
import { DetailFilmInterface } from '../model/filmDetailAPI';
import CardWatchList from '../component/CardWatchList';
import logicWathcList from '../logic/WatchListLogic';
import { observer } from "mobx-react";
import FlatListWatchList from '../component/FlatListWatchList';

type Props = NativeStackScreenProps<RootStackParamList, 'WatchListPage'>;

const WatchListPage = () => {
    const navigation = useNavigation<RootNavigationProp>();
    const [keyword, setKeyword] = useState<string>();

    // useEffect(() => {
    //     logicWathcList.fetchData();
    //     logicWathcList.fetchKey();
    // }, [])

    const handleSearch = () => {
        if(keyword != null) {
            logicWathcList.searchData(keyword);
        }
    }

    const setKeywordSearch = (keyword: string) => {
        setKeyword(keyword);

        if(keyword.length == 0) {
            logicWathcList.clearSearchedData();
            logicWathcList.fetchData();
        }   
    }

    const toHomePage = () => {
        navigation.push('Dashboard');
    }

    return( 
        <SafeAreaView style={styles.dashboardStyle}>
        <Text style={styles.textTitle}>
                    Movie DB App
                </Text>
                <Text style={styles.textSubTitle}>
                    Find Your Movies
                </Text>
                <View style={styles.SearchWrap}>
                    <TextInput 
                        style={styles.TextInpuStyle}
                        placeholder='Search Here ...'
                        placeholderTextColor="#EEEEEE"
                        onChangeText={text => setKeywordSearch(text)}
                    />
                    <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => handleSearch()}
                    >
                        <Icon
                            name='search'
                            color='#EEEEEE'
                            size={19.06}     
                        />
                    </TouchableOpacity>
                </View>
            {/* <FlatList
                // data={searchData.length != 0 ? searchData : data}
                data={logicWathcList.localData}
                renderItem={
                    ({item, index}) => <CardWatchList data={item} index={index}/>  
                }
                keyExtractor={(item, index) => String(index)}
                /> */}
                <FlatListWatchList />
                {/* <CustomFlatList /> */}
            <TouchableOpacity 
                style={styles.buttonBack}
                onPress={toHomePage}
                >
                    <Icon 
                        name='arrow-back'
                        size={24}
                        color='white'
                    />
                    <Text style={styles.textButtonBack}>
                        Back
                    </Text>
                    
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dashboardStyle: {
        backgroundColor: '#242A32',
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
    },
    textTitle: {
        fontSize: 36,
        fontFamily: 'Poppins-Bold',
        color: 'white'
    },
    textSubTitle: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        marginTop: 5
    },
    buttonBack: {
        position: 'absolute',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        width: 105,
        height: 42,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        bottom: 30,
        left: 30,
        backgroundColor: '#3A3F47',
    },
    textButtonBack: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: 'white',
        marginTop: 4
    },
    SearchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    buttonStyle: {
        borderRadius: 16,
        width: 42,
        height: 42,
        backgroundColor: '#3A3F47',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    TextInpuStyle: {
        backgroundColor: '#3A3F47',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        width: 252,
        height: 42,
        borderRadius: 16,
        alignItems: 'center',
        paddingVertical: 0,
        paddingLeft: 20,
        color: '#EEEEEE'
    },
})

export default WatchListPage;