import { makeObservable, observable, action} from "mobx";
import API from "../api/api";
import data from "../data/data";
import { DetailFilm } from "../model/filmDetail";


class DashboardLogic {
    page: number = 1;
    searchPage: number = 0;
    searchedData: Array<DetailFilm> = Array<DetailFilm>();
    keyword: string = '';

    constructor() {
        makeObservable(this, {
            page: observable,
            searchPage: observable,
            searchedData: observable,
            keyword: observable,
            incremSearchedPage: action,
            incremDashboardPage: action,
            resetSearchedpage: action,
            resetSearchedData: action,
            fetchSearchedData: action,
            fetchData: action,
            setKeywordAndSearchData: action
        })
    }

    incremSearchedPage() {
        this.searchPage = this.searchPage + 1;
        this.fetchSearchedData();
    }

    resetSearchedpage(){
        this.searchPage = 0;
    }

    fetchSearchedData() {
        API.getSearchedFilm(this.searchPage, this.keyword)
            .then(action (result => {
                this.searchedData = [...this.searchedData, ...result];
            }))
            .catch(function (error) {
                // handle error
                console.log(error);
              })
    }

    setKeywordAndSearchData(keyword: string) {
        this.keyword = keyword;

        this.fetchSearchedData();
    }

    resetSearchedData() {
        this.searchedData.length = 0;
    }


    incremDashboardPage() {
        this.page = this.page + 1;
        this.fetchData()
    }

    fetchData() {
        data.fetchExternalData(this.page);
    }
    
}

const dashboardLogic = new DashboardLogic();

export default dashboardLogic;