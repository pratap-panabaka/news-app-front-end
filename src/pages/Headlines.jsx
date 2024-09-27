import { useCallback, useEffect, useState } from "react";
import { categories, lang, countries } from "../dropDownMenus.js";
import { API } from "../API.js";
import ArticleCard from "../components/ArticleCard.jsx";
import { useHeadlinesContext } from "../hooks/useHeadlinesContext.js";

const Headlines = () => {

    const {
        articles, setArticles,
        language, setLanguage,
        country, setCountry,
        category, setCategory,
        search, setSearch
    } = useHeadlinesContext();

    const [loading, setLoading] = useState(null);

    const fetchData = useCallback(async () => {
        const obj = {}
        obj.lang = language;
        obj.country = country;
        obj.category = category;
        obj.q = search;
        console.log(obj);
        try {
            setLoading(true);
            const response = await fetch(`${API}/headlines`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
            setArticles(json.articles);
            setLoading(null);
        } catch (error) {
            console.log(error);
            setLoading(null);
        }
    }, [country, language, category, search, setArticles]);

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
                        Fetching Headlines, Please wait...
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
                                            <label htmlFor="language">Select Language</label>
                                            <select
                                                id="language"
                                                defaultValue={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                            >
                                                {
                                                    [...lang.entries()].map(([language, code]) => (
                                                        <option className="font-custom p-2" value={code} key={code}>{language}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="country">Select Country</label>
                                            <select
                                                id="country"
                                                defaultValue={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            >
                                                {
                                                    [...countries.entries()].map(([country, code]) => (
                                                        <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="category">Select Category</label>
                                            <select
                                                id="category"
                                                defaultValue={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="capitalize"
                                            >
                                                {
                                                    categories.map(category => (
                                                        <option className="capitalize" value={category} key={category}>{category}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col tablet:flex-row gap-2 w-full">
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ex: software" className="placeholder:text-black/20 p-2 flex justify-center" />
                                        <button type="submit" className="btn">Search Headlines</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ArticleCard articles={articles} />
                    </div>
                )
            }
            {
                !articles && (
                    <h2 className="center-div font-bold">Sorry there seems to be fetching error. Please visit <span><a href="https://gnews.io" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-red-500">GNews Website</a></span></h2>
                )
            }
        </>
    )
}

export default Headlines;