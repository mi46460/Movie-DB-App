import { action, makeObservable, observable } from "mobx";
import API from "../api/api";
import { DetailFilm } from "../model/filmDetail";
import { DetailFilmInterface } from "../model/filmDetailAPI";

class Data {
    localData: Array<DetailFilmInterface> = Array<DetailFilmInterface>();
    localDataKey: Array<number> = Array<number>();
    externalData: Array<DetailFilm> = Array<DetailFilm>();

    constructor() {
        makeObservable(this, {
            localData: observable,
            localDataKey: observable,
            externalData: observable,
            fetchLocalData: action,
            fetchKey: action,
            fetchExternalData: action
        })
    }

    fetchLocalData () {
        API.getAllLocalDataObject().then(
            action(result => {
                this.localData = this._extractData(result);
            })
        )
    }

    fetchKey () {
        API.getAllKeys().then(
            action(result => {
                this.localDataKey = result.map(this._convertToInt);
            })
        )
    }

    fetchExternalData (page: number) {
        API.getAllFilm(page).then(
            action(result => {
                this.externalData = [...this.externalData, ...result];
        })
        )
    }

    _convertToInt = (data: string) => {
        return Number(data);
    }

    _extractData = (result: any) => {
        const array: Array<DetailFilmInterface>= new Array<DetailFilmInterface>();

        for(var data of result) {
            if(data[1] != null) { 
                array.push(JSON.parse(data[1]));
            }     
        }

        return array;
    }
}

const data = new Data();

export default data;