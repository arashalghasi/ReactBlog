import { useState } from 'react';
import axios from 'axios';
const AddCommentForm = ({ articleId , onArticleUpdated}) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleId}/comments`, {
            postedBy: name,
            text: comment
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setComment('');
    }
    return (
        <>
            <div id='add-comment-form'>
                <h3>
                    Add a Comment
                </h3>
                <label>
                    Name:
                    <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Name ...' />
                </label>
                <label>
                    Comment:
                    <input value={comment} onChange={e => setComment(e.target.value)} type='text' row='4' height='50' placeholder='Name ...' />
                </label>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </>
    );
}
export default AddCommentForm;