import { useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {
    const params = useParams();
    const articleId = params.articleId;
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, []);


    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
    }

    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>{article.title}</h1>
            <div className='upvotes-section'>
                <button onClick={addUpvote}>Upvote</button>
                <p>This article has {articleInfo.upvotes} upvotes</p>
            </div>
            {article.content.map((pragraph, key) => (<p key={key}>{pragraph}</p>))}
            <AddCommentForm articleId={articleId} onArticleUpdated={updateArticle => setArticleInfo(updateArticle)}/>
            <CommentList comments={articleInfo.comments} />
        </>
    )
}
export default ArticlePage;