import { observable, action, makeObservable} from "mobx";
import API from "../api/api";
import data from "../data/data";
import { DetailFilmInterface } from "../model/filmDetailAPI";
import { ClassDetailFilm } from "../model/filmDetailAPIClass";

class WatchListLogic {
    searchedData: Array<DetailFilmInterface> = Array<DetailFilmInterface>();
    bookmarkStatus: boolean = true;

    constructor() {
        makeObservable(this, {
            searchedData: observable,
            bookmarkStatus: observable,
            clearSearchedData: action,
            searchData: action,
            fetchData: action,
            fetchKey: action,
            filterData: action,
            setBookmarkStatus: action
        })
    }

    fetchData () {
        data.fetchLocalData()
    }

    fetchKey () {
        data.fetchKey();
    }

    searchData (keyword: string) {
        this.searchedData = this.filterData(keyword);
    }

    filterData = (keyword: string) =>  {
        return data.localData.filter((data) => JSON.stringify(data).toLowerCase().indexOf(keyword!!.toLowerCase()) !== -1);
    }

    clearSearchedData() {
        this.searchedData = [];
    }

    setBookmarkStatus(status: boolean) {
        this.bookmarkStatus = status;
    }

    storeData(data: ClassDetailFilm) {
        API.storeLocalDataObject(data);
    }

    removeData(id: number) {
        API.removeLocalData(id);
    }

    handleButtonBookmark(data: ClassDetailFilm) {
        if(this.bookmarkStatus == false) {
            this.storeData(data);
            this.fetchData();
            this.fetchKey();
            this.setBookmarkStatus(true);
        } else {
            this.removeData(data.id)
            this.fetchData();
            this.fetchKey();
            this.setBookmarkStatus(false);
        }
    }

    setBookmarkStatusDetailPage(id: number) {
        for(var i of data.localDataKey) {
            if(i == id) {
                this.setBookmarkStatus(true);

                break;
            } else {
                this.setBookmarkStatus(false);
            }
        }
    }
}

const logicWathcList = new WatchListLogic();

export default logicWathcList;