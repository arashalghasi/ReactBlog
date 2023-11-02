import { useNavigate, useParams } from 'react-router-dom';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
    const params = useParams();
    const articleId = params.articleId;
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] , canUpvote: false});
    const {canUpvote} = articleInfo;
    const navigate = useNavigate();

    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken  : token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, { headers, });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(!isLoading){
            loadArticleInfo();
        }
// eslint-disable-next-line
    }, [isLoading,user]);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authToken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null,{headers} );
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
                {user
                    ? <button onClick={addUpvote}>{canUpvote ? 'Upvote': 'Already Upvoted'}</button>
                    : <button onClick={()=>{navigate('/login')}}>Log In to Upvote</button>
                }
                <p>This article has {articleInfo.upvotes} upvotes</p>
            </div>

            {article.content.map((pragraph, key) => (<p key={key}>{pragraph}</p>))}
            {user
                ? <AddCommentForm articleId={articleId} onArticleUpdated={updateArticle => setArticleInfo(updateArticle)} />
                : <button onClick={()=>{navigate('/login')}}>Log In to add a comment</button>
            }

            <CommentList comments={articleInfo.comments} />
        </>
    )
}
export default ArticlePage;