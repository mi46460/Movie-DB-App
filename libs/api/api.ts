import axios from "axios";
import { FilmData } from '../model/filmDataClass';
import { DetailFilmInterface } from '../model/filmDetailAPI';
import { ClassDetailFilm } from '../model/filmDetailAPIClass';

import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiLogic {
    async getAllFilm(page: number) {
        const response = await axios.get<FilmData>(`https://api.themoviedb.org/3/movie/popular?api_key=bb83bd5cf496014b1bf123c7b88809ad&page=${page}`);

        return response.data.results;
    }

    async getSearchedFilm(page: number, keyword: string) {
        const response = await axios.get<FilmData>(`https://api.themoviedb.org/3/search/movie?api_key=bb83bd5cf496014b1bf123c7b88809ad&page=${page}&query=${keyword}`);

        return response.data.results;
    }

    async getDetailFilm(id: number) {
        const response = await axios.get<DetailFilmInterface>(`https://api.themoviedb.org/3/movie/${id}?api_key=bb83bd5cf496014b1bf123c7b88809ad`);

        return response.data;
    }
    
    async getAllKeys() {
        const keys  = await AsyncStorage.getAllKeys();

        return keys;
    }

    async storeLocalDataObject(data: ClassDetailFilm) {
        await AsyncStorage.setItem(data.id.toString(), JSON.stringify(data))
    }

    async getAllLocalDataObject() {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        return result;
    }

    async removeLocalData(id: number) {
        await AsyncStorage.removeItem(id.toString());
    }
}

const API = new ApiLogic();

export default API;