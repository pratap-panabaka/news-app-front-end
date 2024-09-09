import { useEffect, useState } from "react";
import api from "../api";

function News() {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [search, setSearch] = useState('');

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
                body: JSON.stringify({ q: search }),
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

export default News;