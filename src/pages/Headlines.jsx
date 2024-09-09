import { useEffect, useState } from "react";
import { categories, lang, countries } from "../dropDownMenus.js";

const Headlines = () => {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [category, setCategory] = useState('general');
    const [language, setLanguage] = useState('en');
    const [country, setCountry] = useState('us');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3003/headlines')
                const json = await response.json()
                console.log(json);
                setArticles(json.articles);
                setLoading(null);
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        }
        fetchData();
    }, []);

    const onChange = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3003/headlines', {
                method: 'POST',
                body: JSON.stringify({
                    category: category || 'general',
                    country: country || 'us',
                    lang: language || 'en'
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
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
                    <div className="center-div">
                        Fetching News...
                    </div>
                )
            }
            {
                articles && (
                    <div className="bg-toolite">
                        <div className='max-width center-div justify-start flex gap-2 p-2'>
                            <div className="border-2 border-toodark p-5 justify-start flex flex-col gap-5 items-center w-full">
                                <div className="flex flex-col desktop:flex-row gap-5 desktop:items-center">
                                    <h3 className="font-bold font-custom text-lg">Filter News By</h3>
                                    <select
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setLanguage(e.target.value);
                                            onChange();
                                        }}
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
                                        onChange={(e) => {
                                            setCountry(e.target.value);
                                            onChange();
                                        }}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""} disabled>Country</option>
                                        {
                                            [...countries.entries()].map(([country, code]) => (
                                                <option className="font-custom p-2" value={code} key={code}>{country}</option>
                                            ))
                                        }
                                    </select>
                                    <select
                                        defaultValue={""}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            onChange();
                                        }}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""} disabled>Category</option>
                                        {
                                            categories.map(category => (
                                                <option className="font-custom p-2" value={category} key={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
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

export default Headlines;