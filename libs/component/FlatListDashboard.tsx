import React from "react";
import { 
    FlatList,
    View,
    Pressable,
    Image
} from "react-native";
import data from "../data/data";
import dashboardLogic from "../logic/DashboardLogic";
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "../routes/route";
import { observer } from "mobx-react";

const FlatListDashboard = observer(() => {
    const navigation = useNavigation<RootNavigationProp>();

    const toDetailPage = (id: number) => {
        navigation.push('DetailPage', {
            id: id
        });
    }
    return(
        <FlatList
        data={dashboardLogic.searchedData.length != 0 ? dashboardLogic.searchedData.slice() : data.externalData.slice()}
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
        onEndReached={() => {dashboardLogic.searchPage >= 1 ? dashboardLogic.incremSearchedPage(): dashboardLogic.incremDashboardPage()}} 
        keyExtractor={(item, index) => String(index)}
        numColumns={3}
        />
    )
}
);

export default FlatListDashboard;