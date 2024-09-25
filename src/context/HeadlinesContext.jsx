import { createContext, useState } from "react";

const HeadlinesContext = createContext(null);

const HeadlinesContextProvider = ({ children }) => {
    const [articles, setArticles] = useState(null);
    const [language, setLanguage] = useState("en");
    const [country, setCountry] = useState("any");
    const [category, setCategory] = useState("general");
    const [search, setSearch] = useState("");

    return (
        <HeadlinesContext.Provider value={{
            articles, setArticles,
            language, setLanguage,
            country, setCountry,
            category, setCategory,
            search, setSearch
        }}>
            {children}
        </HeadlinesContext.Provider >
    )
}

export { HeadlinesContext, HeadlinesContextProvider }