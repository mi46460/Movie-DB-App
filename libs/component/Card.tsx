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
import { DetailFilmInterface } from "../model/filmDetailAPI";

interface props{
    detailFilm?: DetailFilm,
    index: number,
    localData: Array<number>,
    detailFilmAPI?: DetailFilmInterface
}

const Card = (props: props) => {
    const navigation = useNavigation<RootNavigationProp>();
    const [bookmark, setBookmark] = useState<boolean>();
    const [data, setData] = useState<DetailFilm | DetailFilmInterface>();

    const toDetailPage = () => {
        navigation.push('DetailPage', {
            id: data?.id!!
        })
    };

    useEffect(() => {
        setStatusBookmark() 
        setDataFilm()
    }, [])  

    const setStatusBookmark = () => {
        console.log(data?.id);
        const status = props.localData.find((obj) => {
            return obj === data?.id;
        });

        if(status != undefined) {
            setBookmark(true);
        } else {
            setBookmark(false);
        }
    };

    const setDataFilm = () => {
        if(props.detailFilm == null) {
            setData(props.detailFilmAPI);
        } else {
            setData(props.detailFilm);
        }
    }

    return (
        <Pressable
            onPress={() => toDetailPage()}
        >
                    <View style={styles.containerPressable}>
                        <Image
                            style={styles.imageStyle}
                            source={{uri:`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}}
                        />
                        <View style={styles.filmInfo}>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Title:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                    {data?.original_title}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Release Date:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                    {data?.release_date}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.filmInfoTitle}
                                >
                                    Average Rating:
                                </Text>
                                <Text style={styles.filmInfoSubTitle}>
                                {props.detailFilm == null ? data?.vote_average : Math.round(data?.vote_average!!)}
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
                                    {props.detailFilm == null ? data?.vote_average : Math.round(data?.vote_average!!)}
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

export default Card;