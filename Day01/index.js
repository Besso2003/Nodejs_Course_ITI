const http = require("http");
const fs = require("fs");

const FILE_PATH = "./posts.json";

// let posts = [
//     {"id":1,"title":"First Post","content":"Hello world"},
//     {"id":2,"title":"Second Post","content":"Node is great"},
//     {"id":3,"title":"Third Post","content":"hello this is Bassant"}
// ];

function readPosts() {
    if (!fs.existsSync(FILE_PATH)) return [];
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

function savePosts(posts) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(posts));
}

function isValidPost(post) {
    if (!post.id || typeof post.id !== "number") return false;
    if (!post.title || post.title.trim() == "") return false;
    if (!post.content || post.content.trim() == "") return false;
    return true;
}

const server = http.createServer((req, res) => {
    console.log(req.method);

    if (req.url == "/") {
        res.end("Welcome to Posts")
    }
    else if (req.url.startsWith("/posts/") && req.method == "GET") {
        const id = parseInt(req.url.split("/")[2]);
        const posts = readPosts();
        const post = posts.find(p => p.id == id);

        if (post) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(post));
        } else {
            res.statusCode = 404;
            res.end("Post Not Found!");
        }
    }
    else if (req.url == "/posts" && req.method == "GET") {
        const posts = readPosts();
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(posts));
    }
    else if (req.url == "/posts" && req.method == "POST") {
        req.on("data", (chunk) => {
            const newPost = JSON.parse(chunk);
            const posts = readPosts();

            if (!isValidPost(newPost)) {
                res.statusCode = 400;
                res.end("Invalid Post Data!");
                return;
            }

            let foundPost = posts.find(p => p.id == newPost.id);

            if (foundPost) {
                res.statusCode = 400;
                res.end("Post Already Exists!");
            } else {
                newPost.createdAt = new Date().toISOString();
                newPost.updatedAt = null;
                posts.push(newPost);
                savePosts(posts);
                res.statusCode = 201;
                res.end("Post Created");
            }
        });
    } else if (req.url == "/posts" && req.method == "PUT") {
        req.on("data", (chunk) => {
            const updatePost = JSON.parse(chunk);
            const posts = readPosts();
            let post = posts.find(p => p.id == updatePost.id);

            if (!isValidPost(updatePost)) {
                res.statusCode = 400;
                res.end("Invalid post data!");
                return;
            }

            if (post) {
                post.title = updatePost.title;
                post.content = updatePost.content;
                post.updatedAt = new Date().toISOString();
                savePosts(posts);
                res.statusCode = 200;
                res.end("Post Updated!");
            } else {
                res.statusCode = 404;
                res.end("Post Not Found!");
            }
        });
    } else if (req.url == "/posts" && req.method == "DELETE") {
        req.on("data", (chunk) => {
            const deletedPost = JSON.parse(chunk);

            let posts = readPosts();
            let foundPost = posts.find(p => p.id == deletedPost.id);

            if (foundPost) {
                posts = posts.filter(p => p.id != deletedPost.id);
                savePosts(posts);
                res.statusCode = 200;
                res.end("Post Deleted!");
            } else {
                res.statusCode = 404;
                res.end("Post Not Found!");
            }
        });
    } else {
        res.statusCode = 404;
        res.end("Route Not Found")
    }
})

server.listen(3000, (err) => {
    console.log("server is running on port 3000");
    if (err) {
        console.log(err);
    }
});