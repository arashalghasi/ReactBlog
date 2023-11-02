import { useState } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';
const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const email = user.email;

        const headers = token ? { authToken : token } : {};
        if(comment === ''){setError('Please Write something before adding!'); return} else {setError('')};
        const response = await axios.post(`/api/articles/${articleId}/comments`, {
            postedBy: email,
            text: comment
        }, { headers });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setComment('');
    }
    return (
        <>
            <div id='add-comment-form'>
                <h3>
                    Add a Comment
                </h3>
                {error && <p className='error'>{error}</p>}
                {user && <p>You are Posting as {user.email}</p>}
                <label>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} type='text' rows='4' cols='50' placeholder='Type here ...' required/>
                </label>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </>
    );
}
export default AddCommentForm;