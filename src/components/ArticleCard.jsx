const ArticleCard = ({ articles }) => (
    articles.map((article, index) => (
        <a
            key={article.source.name + index}
            className="w-full hover:bg-blue-200"
            href={article.url}
            target="_blank"
            rel="noreferrer"
        >
            <div className="w-full mx-auto min-h-[400px] p-4 flex flex-col gap-2 border">
                <h3 className="text-md tablet:text-lg desktop:2xl font-bold">{article.title}</h3>
                <p>{article.description}</p>
                <img src={article.image} className="flex mx-auto justify-center items-center" />
            </div>
        </a>
    ))
)

export default ArticleCard;