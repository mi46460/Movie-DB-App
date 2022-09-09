import React, { useEffect, useState}  from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/route';
import { SafeAreaView } from 'react-native-safe-area-context';
import API from '../api/api';
import { DetailFilmInterface } from '../model/filmDetailAPI';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "../routes/route";
import { ClassDetailFilm } from '../model/filmDetailAPIClass';


type Props = NativeStackScreenProps<RootStackParamList, 'DetailPage'>;

const DetailPage = ({route}: Props) => {
    const [data, setData] = useState<DetailFilmInterface>();
    const [localData, setLocalData] = useState<Array<number>>([]);
    const [bookmarStatus, setBookmarStatus] = useState<boolean>();
    const navigation = useNavigation<RootNavigationProp>();


    const getExternalData = () => {
        API.getDetailFilm(route.params.id).then(function(result) {
            setData(result);
            getLocalData(result.id);
        })       
    };

    const getLocalData = (id: number) => {
        API.getAllKeys().then(function(result) {
            setLocalData(result.map(convertToInt));
            setStatuBookmark(result.map(convertToInt), id);
        })
    }

    const saveToLocalData = () => { 
        API.getDetailFilm(route.params.id).then(function (result) {
            API.storeLocalDataObject(new ClassDetailFilm(result));
        })


        // API.getDetailFilm(route.params.data.id).then(function (result) {
        //     API.storeLocalDataObject(new DetailFilmAPIClass(result));
        // })
    }

    const removeFromLocalData = () => {
        API.removeLocalData(route.params.id);
        // API.removeLocalData(route.params.data.id);
    }

    const bookMarkhandle = () => {
        if(bookmarStatus == false) {
            saveToLocalData();
            setBookmarStatus(true);
        } else {
            removeFromLocalData();
            setBookmarStatus(false);
        }
    };

    const convertToInt = (data: string) => {
        return Number(data);
    }

    const setStatuBookmark = (result: Array<number>, id: number) => {
        for(var i of result) {
            if(i == id) {
                setBookmarStatus(true);

                break;
            } else {
                setBookmarStatus(false);
            }
        }
    }

    const _goToDashboard = () => {
        navigation.push('Dashboard');
    }

    useEffect(() => {
        getExternalData();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <Image
                source={{uri:`https://image.tmdb.org/t/p/w780/${data?.backdrop_path}`}}
                style={styles.backdropImage}
            />
            <View style={styles.titleSectionWrapper}>
                <Image 
                    source={{uri:`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}}
                    style={styles.titleImage}
                />
                <Text style={styles.titleText}>
                    {data?.original_title}
                </Text>
            </View>
            <View>
                <FlatList
                horizontal={true}
                data={data?.genres}
                style={{marginLeft: 20, marginTop: -20}}
                renderItem={
                    ({item, index}) =>
                    <View 
                    style={styles.genreWrapper}>
                        <Text style={styles.genreText}>
                        {item.name}
                        </Text>
                    </View>                  
                }
                />
            </View>
            <View style={styles.overViewWrapper}>
                <View style={styles.tabWrapper}>
                    <Text style={styles.textAboutUs}>
                        About Movie
                    </Text>
                    <Text style={styles.textReview}>
                        Reviews
                    </Text>
                </View>
                <Text style={[styles.filmInfoTitle, styles.marginOverview]}>
                    Overviews
                </Text>
                <Text style={styles.filmInfoSubTitle}>
                    {data?.overview}
                </Text>
                <Text style={[styles.filmInfoTitle, styles.marginOverviewSection]}>
                    Release Date :
                </Text>
                <Text style={styles.filmInfoSubTitle}>
                    {data?.release_date}
                </Text>
                <View style={[styles.avgRatingRCWrapper, styles.marginOverviewSection]}>
                    <View>
                        <Text style={styles.filmInfoTitle}>
                            Average Rating :
                        </Text>
                        <Text style={styles.filmInfoSubTitle}>
                            {data?.vote_average}
                        </Text>
                    </View>
                    <View style={styles.marginLeftOVRC}>
                        <Text style={[styles.filmInfoTitle]}>
                            Rate Count :
                        </Text>
                        <Text style={styles.filmInfoSubTitle}>
                            {data?.vote_count}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity 
            style={styles.buttonBackStyle}
            onPress={_goToDashboard}
            >
                    <Icon 
                        name='arrow-back'
                        size={24}
                        color='white'
                    />
                    <Text style={styles.buttonBackTextStyle}>
                        Back
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={bookmarStatus == true ? styles.bookMarkedButton : styles.unBookMarkedButton}
            onPress={bookMarkhandle}
            >
                <Icon 
                    name='bookmark'
                    color={bookmarStatus == true ? '#242A32': 'white'}
                    size={18}
                />
            </TouchableOpacity>
        </SafeAreaView>     
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242A32'
    },
    backdropImage: {
        width: '100%',
        height: 210.94
    },
    titleSectionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 90,
        height: 120,
    },
    titleImage: {
        width: 95,
        height: 120
    },
    titleText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        bottom: 0,
        color: 'white',
        padding: 0,
        flexShrink: 1,
    },
    genreWrapper: {
        paddingHorizontal: 15,
        backgroundColor: '#3A3F47',
        borderRadius: 16,
        marginHorizontal: 5
    },
    genreText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        flexWrap: 'wrap',
        color: 'white',
        padding: 5
    },
    overViewWrapper: {
        height: '100%',
        marginHorizontal: 33,
        marginVertical: 25
    },
    tabWrapper: {
        flexDirection: 'row'
    },
    textAboutUs: {
        color: 'white',
        fontFamily: 'Poppis-Medium',
        fontSize: 14
    },
    textReview: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginLeft: 10
    },
    filmInfoTitle: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 12
    },
    filmInfoSubTitle: {
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: 12,
        marginTop: -5
    },
    marginOverview: {
        marginTop: 25
    },
    marginOverviewSection: {
        marginTop: 10
    },
    avgRatingRCWrapper: {
        flexDirection: 'row',
    },
    marginLeftOVRC: {
        marginLeft: 55
    },
    buttonBackStyle: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 30,
        backgroundColor: '#3A3F47',
        width: 105,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        borderRadius: 16
    },
    buttonBookMarkStyle: {
        
    },
    bookMarkedButton: {
        backgroundColor: '#4FCCA3',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 30,
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        borderRadius: 16
    },
    unBookMarkedButton: {
        backgroundColor: '#3A3F47',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 30,
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        borderRadius: 16
    },
    buttonBackTextStyle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: 'white',
        paddingTop: 3
    }
})


export default DetailPage;