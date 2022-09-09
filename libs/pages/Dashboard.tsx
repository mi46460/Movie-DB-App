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
    TouchableOpacity,
    Image,
    Pressable
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailFilm } from '../model/filmDetail';
import API from '../api/api';
import Footer from '../component/Footer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "../routes/route";
import Card from '../component/Card';
import dashboardLogic from '../logic/DashboardLogic';
import FlatListDashboard from '../component/FlatListDashboard';
import logicWathcList from '../logic/WatchListLogic';

const Dashboard = () => {
    const [data, setData] = useState<Array<DetailFilm>>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [searchPage, setSearchpage] = useState<number>(0);
    const [localData, setLocalData] = useState<Array<number>>([]);
    const firstRender = useRef(true);
    const [keywordStatus, setKeywordStatus] = useState(false);
    const navigation = useNavigation<RootNavigationProp>();

    const getData = () => {
        getLocalData();
        setLoading(true);
        getExternalData();
    };

    const getExternalData = () => {
        API.getAllFilm(page).then(function(result) {
            setData([...data, ...result]);
            setLoading(false);
        });
    };

    const getLocalData = () => {
        API.getAllKeys().then(function(result) {
            setLocalData(result.map(convertToInt));
        })
    }

    const toWatchListPage = () => {
        navigation.push('WatchListPage');
    }

    const convertToInt = (data: string) => {
        return Number(data);
    }

    const getSeacrchedData = () => {
        setLoading(true);
        
        API.getSearchedFilm(searchPage, keyword).then(function(result) {
            setData([...data, ...result]);
            setLoading(false);
        });
    };

    const handleChange = () => {
        setData([]);
        setSearchpage(1);

        // dashboardLogic.resetSearchedData();
        // dashboardLogic.incremSearchedPage();
    };

    const setKeywordText = (text: string) => {
        setKeyword(text);

        if(text.length == 0) {
            setSearchpage(0);
            setPage(1);
            setData([]);
            setKeywordStatus(!keywordStatus);
        }
    }

    const setPageSearch = () => {
        setSearchpage(searchPage + 1);
    }

    const toDetailPage = (id: number) => {
        navigation.push('DetailPage', {
            id: id
        })
    }
    
    useEffect(() => {
        getData();
    }, [page, keywordStatus]);

    useLayoutEffect(() => {
        if(firstRender.current || searchPage === 0) {
            firstRender.current = false;
            
            return;
        }
        
        getSeacrchedData();
    }, [searchPage]);

    useEffect(() => {
        logicWathcList.fetchData();
        logicWathcList.fetchKey();
    }, []);

    return(
        <SafeAreaView style={styles.dashboardStyle}>
            <View style={styles.container}>
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
                        onChangeText={text => setKeywordText(text)}
                    />
                    <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress= {handleChange}
                    >
                        <Icon
                            name='search'
                            color='#EEEEEE'
                            size={19.06}     
                        />
                    </TouchableOpacity>
                </View>
                <FlatListDashboard />
                <FlatList
                data={data.slice()}
                renderItem={({item}) => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        margin: 1,
                        padding: 3
                      }}>
                        <Pressable
                        onPress={() => toDetailPage(item.id)}
                        >
                        <Image style={{
                         justifyContent: 'center',
                         alignItems: 'center',
                         height: 170,
                         borderRadius: 16
                      }}
                            source={{ uri: `https://image.tmdb.org/t/p/w780/${item.poster_path}`}}
                        />
                        </Pressable>                  
                    </View>
                  )}
                ListFooterComponent={Footer({loading: loading})}
                onEndReached={() => {(searchPage >= 1) ? setPageSearch(): setPage(page + 1)}} 
                keyExtractor={(item, index) => String(index)}
                numColumns={3}
                />
                <TouchableOpacity 
                style={styles.buttonWatchList}
                onPress={toWatchListPage}
                >
                    <Text style={styles.textButtonWatchList}>
                        Watch List
                    </Text>
                    <Icon
                        name='bookmark'
                        color={'#242A32'}
                        size={22}
                    />
                </TouchableOpacity>       
            </View>          
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
    container: {
        flex: 1,
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
    buttonWatchList: {
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: '#4FCCA3',
        flexDirection: 'row',
        bottom: 20,
        width: 142,
        height: 42,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textButtonWatchList: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#242A32',
        marginTop: 4
    },
})

export default Dashboard;