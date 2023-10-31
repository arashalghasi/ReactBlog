import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { db, connectToDd } from './db.js';


const app = express();
app.use(express.json());

app.put('/api/articles/:articleId/upvote', async (req, res) => {
    const { articleId } = req.params;

    await db.collection('articles').updateOne({ name: articleId }, {
        $inc: { upvotes: 1 }
    });

    const article = await db.collection('articles').findOne({ name: articleId });
    res.json(article);
});

app.get('/api/articles/:articleId', async (req, res) => {
    const { articleId } = req.params;

    const article = await db.collection('articles').findOne({ name: articleId });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/articles/:articleId/comments', async (req, res) => {
    const { articleId } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name: articleId }, {
        $push: {
            comments: {
                postedBy, text
            }
        },
    })

    const article = await db.collection('articles').findOne({ name: articleId });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

const PORT = 8000;

connectToDd(() => {
    console.log('successfully connected to the database');
    app.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}`)
    });

})

