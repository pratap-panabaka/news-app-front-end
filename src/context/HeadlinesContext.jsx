import { createContext, useState } from "react";

const HeadlinesContext = createContext(null);

const HeadlinesContextProvider = ({ children }) => {
    const [articles, setArticles] = useState(null);
    const [language, setLanguage] = useState("Any");
    const [country, setCountry] = useState("Any");
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