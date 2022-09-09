import React, {useEffect, useState} from "react";
import{
    StyleSheet,
    Text,
    Pressable,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailFilm } from "../model/filmDetail";
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "../routes/route";
import { DetailFilmInterface } from '../model/filmDetailAPI';

interface props{
    data: DetailFilmInterface,
    index: number
    // status: boolean
}

const CardWatchList = (props: props) => {
    const navigation = useNavigation<RootNavigationProp>();
    const [bookmark, setBookmark] = useState<boolean>();

    const toDetailPage = () => {
        navigation.push('DetailPageWatchList', {
            data: props.data
        })
    };

    useEffect(() => {
        setStatusBookmark() 
    }, [])  
 
    const setStatusBookmark = () => {
        setBookmark(true);
    };

    return (
        <Pressable
            onPress={() => toDetailPage()}
        >
                    <View style={styles.containerPressable}>
                        <Image
                            style={styles.imageStyle}
                            source={{uri:`https://image.tmdb.org/t/p/w780/${props.data.poster_path}`}}
                        />
                        <View style={styles.filmInfo}>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Title:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                    {props.data.original_title}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Release Date:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                    {props.data.release_date}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Average Rating:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                    {props.data.vote_average}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.filmRating}>
                            <View style={styles.filmRatingWrapper}>
                                <Icon
                                    name={bookmark == true ? 'bookmark-check' : 'bookmark'}
                                    size={24}
                                    color={bookmark == true ? '#4FCCA3' : 'white'}
                                />
                                <Icon 
                                    name='star'
                                    size={24}
                                    color={bookmark == true ? '#4FCCA3' : 'white'}
                                    style={styles.filmRatingIcon}
                                />
                                <Text style={bookmark == true ? styles.filmRatingNumberBook : styles.filmRatingNumberNoBook}>
                                    {Math.round(props.data.vote_average)}
                                </Text>
                            </View> 
                        </View>
                    </View>
                </Pressable>
    );
}

const styles = StyleSheet.create({
    dashboardStyle: {
        backgroundColor: '#242A32',
        flex: 1,
        flexDirection: 'column',
        padding: 25
    },
    container: {
        flex: 1,
    },
    containerPressable: {
        flexDirection: 'row',
        height: 120,
        width: '100%',
        marginBottom: 20
    },
    imageStyle: {
        height: 120,
        width: 90,
        borderRadius: 10
    },
    filmInfo: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
        marginLeft: 10
    },
    filmRating: {
        flex: 1,
        alignItems: 'flex-end'
    },
    filmRatingNumberNoBook: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginRight: 1
    },
    filmRatingNumberBook: {
        color: '#4FCCA3',
        fontFamily: 'Poppins-Medium',
        marginRight: 1
    },
    filmRatingIcon: {
      marginTop: 13  
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
    filmRatingWrapper: {
        flexDirection: 'column', 
        alignItems: 'center'
    }
})

export default CardWatchList;