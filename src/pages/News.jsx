import { useCallback, useEffect, useState } from "react";
import { useNewsContext } from "../hooks/useNewsContext";
import { API } from "../API";
import { countries, lang } from "../dropDownMenus";
import ArticleCard from "../components/ArticleCard";

function News() {

    const {
        articles, setArticles,
        language, setLanguage,
        country, setCountry,
        search, setSearch
    } = useNewsContext();

    const [loading, setLoading] = useState(null);

    const fetchData = useCallback(async () => {
        const obj = {}
        obj.lang = language;
        obj.country = country;
        obj.q = search;
        console.log(obj);
        try {
            setLoading(true);
            const response = await fetch(`${API}/news`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            setArticles(json.articles);
            setLoading(null);
        } catch (error) {
            console.log(error);
            setLoading(null);
        }
    }, [country, language, search, setArticles]);

    useEffect(() => {
        if (!articles) {
            fetchData();
        }
    }, [articles, fetchData]);

    const onSearch = async (e) => {
        e.preventDefault();
        fetchData();
    }

    return (
        <>
            {
                loading && (
                    <div className="center-div text-2xl">
                        Fetching News...
                    </div>
                )
            }
            {
                articles && (
                    <div className='max-width center-div justify-start flex gap-2 p-2'>
                        <form className="bg-toolite w-full" onSubmit={onSearch}>
                            <div className="border p-2 justify-start flex flex-col gap-5 items-center w-full">
                                <div className="flex flex-col gap-5 desktop:items-center">
                                    <div className="flex flex-col desktop:flex-row gap-5">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="language" className="text-blue-500 font-bold">Select Language</label>
                                            <select
                                                defaultValue={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                className="font-custom px-2 py-1 h-12"
                                            >
                                                {
                                                    [...lang.entries()].map(([language, code]) => (
                                                        <option className="font-custom p-2" value={code} key={code}>{language}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="country" className="text-blue-500 font-bold">Select Country</label>
                                            <select
                                                defaultValue={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="font-custom px-2 py-1 h-12"
                                            >
                                                {
                                                    [...countries.entries()].map(([country, code]) => (
                                                        <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <input required type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex: software" className="placeholder:text-black/20 p-2 flex justify-center" />
                                        <button type="submit" className="px-4 py-2 border-2 bg-toodark text-white font-bold font-custom">Search News</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ArticleCard articles={articles} />
                    </div>
                )
            }
        </>
    )
}

export default News;