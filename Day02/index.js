import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json())

let comments = [
    { id: 1, author: "Ahmed", body: "First comment" },
    { id: 2, author: "Sara", body: "Nice post!" },
    { id: 3, author: "Ali", body: "Very helpful" }
];

function isValidComment(comment) {
    if (!comment.author || comment.author.trim() === "") return false;
    if (!comment.body || comment.body.trim() === "") return false;
    return true;
}

app.get("/home", (req, res) => {
    const filePath = fileURLToPath(import.meta.url);
    const dirPath = path.dirname(filePath)
    console.log(dirPath);
    res.sendFile(path.join(dirPath, "index.html"))
})

app.get("/comments", (req, res) => {
    res.status(200).json(comments);
});

app.get("/comments/:id", (req, res) => {
    const id = req.params.id;
    const foundComment = comments.find(comment => comment.id == id);

    if (foundComment) {
        res.status(200).json(foundComment);
    } else {
        res.status(404).send("comment not found!");
    }
});

app.post("/comments", (req, res) => {
    if (!isValidComment(req.body)) {
        return res.status(400).send("Author and Body are Required!");
    }

    req.body.id = comments[comments.length - 1].id + 1;
    comments.push(req.body);
    res.status(201).json(req.body);
});

app.put("/comments/:id", (req, res) => {
    const id = req.params.id;

    if (!isValidComment(req.body)) {
        return res.status(400).send("Author and Body are Required!");
    }

    const foundComment = comments.find(comment => comment.id == id);

    if (foundComment) {
        foundComment.author = req.body.author;
        foundComment.body = req.body.body;
        res.status(200).json(foundComment);
    } else {
        res.status(404).send("Comment not Found!");
    }
});

app.delete("/comments/:id", (req, res) => {
    const id = req.params.id;
    const foundComment = comments.find(comment => comment.id == id);
    
    if(!foundComment) {
        return res.status(404).send("Comment not found!");
    }
    
    comments = comments.filter(comment => comment.id != id);
    res.status(200).send("Comment deleted!");
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});