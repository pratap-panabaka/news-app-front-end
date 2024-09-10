import { useEffect, useState } from "react";
import { countries, lang } from "../dropDownMenus";
import { API } from "../API";
import ArticleCard from "../components/ArticleCard";

function News() {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [search, setSearch] = useState(null);
    const [language, setLanguage] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API}/news`);
                const json = await response.json();
                setArticles(json.articles);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(null);
            }
        }
        fetchData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const obj = {}
        obj.q = search || 'tech industry';
        if (language) {
            obj.lang = language;
        }
        if (country) {
            obj.country = country
        }
        console.log(obj);
        try {
            setLoading(true);
            const response = await fetch(`${API}/news`, {
                mode: "cors",
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
            console.log(error.message);
            setLoading(null);
        }
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
                    <div className="bg-toolite">
                        <div className='max-width center-div gap-2 p-2'>
                            <form onSubmit={onSubmit} className="border p-2 justify-start flex flex-col desktop:flex-row gap-5 items-center w-full">
                                <div className="flex gap-5">
                                    <select
                                        defaultValue={""}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""}>Language</option>
                                        {
                                            [...lang.entries()].map(([language, code]) => (
                                                <option className="font-custom p-2" value={code} key={code}>{language}</option>
                                            ))
                                        }
                                    </select>
                                    <select
                                        defaultValue={""}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""}>Country</option>
                                        {
                                            [...countries.entries()].map(([country, code]) => (
                                                <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex gap-5">
                                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="ex: tech industry" className="placeholder:text-black/20 p-2 flex justify-center" />
                                    <button type="submit" className="px-4 py-2 border-2 bg-toodark text-white font-bold font-custom">Search News</button>
                                </div>
                            </form>
                            <ArticleCard articles={articles} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default News;