import { useEffect, useState } from "react";
import { countries, lang } from "../dropDownMenus";
import { API } from "../API";

function News() {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [search, setSearch] = useState(null);
    const [language, setLanguage] = useState('en');
    const [country, setCountry] = useState('us');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API}/news`);
                const json = await response.json();
                setArticles(json.articles);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        }
        fetchData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(search, language, country);
        try {
            const response = await fetch(`${API}/news`, {
                mode: "cors",
                method: 'POST',
                body: JSON.stringify({ q: search || 'software', lang: language, country }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            setArticles(json.articles);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {
                loading && (
                    <div className="center-div">
                        Fetching News...
                    </div>
                )
            }

            {
                articles && (
                    <div className="bg-toolite">
                        <div className='max-width center-div gap-2 p-2'>
                            <form onSubmit={onSubmit} className="border-2 border-toodark p-5 justify-start flex flex-col gap-5 items-center w-full">
                                <div className="flex gap-5">
                                    <select
                                        defaultValue={""}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""} disabled>Language</option>
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
                                        <option value={""} disabled>Country</option>
                                        {
                                            [...countries.entries()].map(([country, code]) => (
                                                <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="key words" className="placeholder:text-black/20 p-2 flex justify-center" />
                                <button type="submit" className="px-4 py-2 border-2 bg-toodark text-white font-bold font-custom">Search News</button>
                            </form>
                            {
                                articles.map((article, index) => (
                                    <div key={article.source.name + index}>
                                        <div className="min-w-[300px] min-h-[400px] p-4 border-2 border-toodark bg-lite">
                                            <h3 className="font-vortice text-sm">{article.title}</h3>
                                            <p>{article.description}</p>
                                            <img src={article.image} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default News;