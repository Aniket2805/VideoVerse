import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromAPI } from "../utils/api"

export const Context = createContext();
export const AppContext = (props) => {
    const [loading, setloading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [selectCategories, setSelectCategories] = useState("New");
    const [mobileMenue, setMobileMenue] = useState(false);
    useEffect(() => {
        fetchSelectedCategoryData(selectCategories);
    }, [selectCategories]);
    const fetchSelectedCategoryData = (query) => {
        setloading(true);
        fetchDataFromAPI(`search/?q=${query}`).then(({contents}) => {
            console.log(contents);
            setSearchResults(contents);
            setloading(false);
        })
    }
    return (
        <Context.Provider value={{ loading, setloading, searchResults, setSearchResults, selectCategories, setSelectCategories, mobileMenue, setMobileMenue }}>
            {props.children}
        </Context.Provider>
    )
}