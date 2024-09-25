import { createContext, useState } from "react";

const NewsContext = createContext(null);

const NewsContextProvider = ({ children }) => {
    const [articles, setArticles] = useState(null);
    const [language, setLanguage] = useState("en");
    const [country, setCountry] = useState("any");
    const [search, setSearch] = useState("technology");

    return (
        <NewsContext.Provider value={{
            articles, setArticles,
            language, setLanguage,
            country, setCountry,
            search, setSearch
        }}>
            {children}
        </NewsContext.Provider>
    )
}

export { NewsContext, NewsContextProvider }