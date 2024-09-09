import { useEffect, useState } from "react";
import { categories, lang, countries } from "../dropDownMenus.js";
import api from "../api.js";

const Headlines = () => {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(null);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`${api}`)
            const json = await response.json()
            console.log(json);
            setArticles(json.articles);
            setLoading(false);
        }
        fetchData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/query`, {
                method: 'POST',
                body: JSON.stringify({ q: search, category }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {
                loading && (
                    <div>
                        Loading...
                    </div>
                )
            }
            {
                articles && (
                    <div className="bg-toolite">
                        <div className='max-width center-div justify-start flex gap-2 pt-2'>
                            <form onSubmit={onSubmit}>
                                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="search news with any key word" className="placeholder:text-black/20 p-2" />
                            </form>
                            <select
                                defaultValue={""}
                                onChange={(e) => setCategory(e.target.value)}
                                className="font-custom px-2 py-1 h-12"
                            >
                                <option value={""} disabled>Category</option>
                                {
                                    categories.map(cat => (
                                        <option className="font-custom p-2" value={cat} key={cat}>{cat}</option>
                                    ))
                                }
                            </select>
                            <select
                                defaultValue={""}
                                onChange={(e) => setLang(e.target.value)}
                                className="font-custom px-2 py-1 h-12"
                            >
                                <option value={""} disabled>Language</option>
                                {
                                    [...lang.entries()].map(([country, code]) => (
                                        <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                    ))
                                }
                            </select>
                            {
                                articles.map((article, index) => (
                                    <div key={article.source.name + index}>
                                        <div className="min-w-[300px] min-h-[400px] p-4 border-2 border-red-500 bg-lite">
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

export default Headlines;