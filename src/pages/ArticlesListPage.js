import ArticleList from "../components/ArticlesList";
import articles from "./article-content";

const ArticlesListPage = () => {
    return (
        <>
        <h1>Articles</h1>
            <ArticleList articles={articles} />
        </>
    );
}
export default ArticlesListPage;