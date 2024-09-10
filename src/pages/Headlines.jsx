import { useEffect, useState } from "react";
import { categories, lang, countries } from "../dropDownMenus.js";
import { API } from "../API.js";
import ArticleCard from "../components/ArticleCard.jsx";

const Headlines = () => {

    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(null);

    const [category, setCategory] = useState(null);
    const [language, setLanguage] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API}/headlines`);
                const json = await response.json();
                setArticles(json.articles);
                setLoading(null);
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const onChange = async () => {
            const obj = {}
            if (category) {
                obj.category = category;
            }
            if (country) {
                obj.country = country;
            }
            if (language) {
                obj.lang = language;
            }

            console.log(obj);

            try {
                setLoading(true);
                const response = await fetch(`${API}/headlines`, {
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

        onChange();

    }, [language, country, category]);

    return (
        <>
            {
                loading && (
                    <div className="center-div text-2xl">
                        Fetching Headlines...
                    </div>
                )
            }
            {
                articles && (
                    <div className="bg-toolite">
                        <div className='max-width center-div justify-start flex gap-2 p-2'>
                            <div className="border p-2 justify-start flex flex-col gap-5 items-center w-full">
                                <div className="flex flex-col desktop:flex-row gap-5 desktop:items-center">
                                    <h3 className="font-bold font-poppins text-lg">Filter Headlines By</h3>
                                    <select
                                        id="language"
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
                                        id="country"
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
                                    <select
                                        id="category"
                                        defaultValue={""}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="font-custom px-2 py-1 h-12"
                                    >
                                        <option value={""}>Category</option>
                                        {
                                            categories.map(category => (
                                                <option className="font-custom p-2 capitalize" value={category} key={category}>{category}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <ArticleCard articles={articles} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Headlines;