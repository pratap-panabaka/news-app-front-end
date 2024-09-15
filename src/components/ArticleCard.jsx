const ArticleCard = ({ articles }) => (
    articles.map((article, index) => (
        <div key={article.source.name + index}>
            <div className="w-full mx-auto min-h-[400px] p-4 flex flex-col gap-2 border">
                <h3 className="font-poppins text-md tablet:text-lg desktop:2xl font-bold">{article.title}</h3>
                <p className="font-poppins">{article.description}</p>
                <img src={article.image} className="flex mx-auto justify-center items-center" />
            </div>
        </div>
    ))
)

export default ArticleCard;