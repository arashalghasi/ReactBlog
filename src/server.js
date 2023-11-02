import express from 'express';
import path from 'path';
import { db, connectToDd } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';
import 'dotenv/config';


import { fileURLToPath } from 'url';
const  __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
})


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};
    next();
})



app.get('/api/articles/:articleId', async (req, res) => {
    const { articleId } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name: articleId });
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});


app.use(async (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.send(401);
        // 401 means the user can not access that resource
    }
})

app.put('/api/articles/:articleId/upvote', async (req, res) => {
    const { articleId } = req.params;
    const {uid}  = req.user;

    const article = await db.collection('articles').findOne({ name: articleId });
    
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        if(canUpvote){
            await db.collection('articles').updateOne({ name: articleId }, {
                $inc: { upvotes: 1 },
                $push: {upvoteIds : uid}
            });
        }

        const UpdatedArticle = await db.collection('articles').findOne({ name: articleId });
        res.json(UpdatedArticle);

    } else {
        res.sendStatus(404);
    }

;


  
});

app.post('/api/articles/:articleId/comments', async (req, res) => {
    const { articleId } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name: articleId }, {
        $push: {
            comments: {
                postedBy : email, text
            }
        },
    })

    const UpdatedArticle = await db.collection('articles').findOne({ name: articleId });

    if (UpdatedArticle) {
        res.json(UpdatedArticle);
    } else {
        res.sendStatus(404);
    }
});

const PORT = process.env.PORT || 8000;

connectToDd(() => {
    console.log('successfully connected to the database');
    app.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}`)
    });

})

