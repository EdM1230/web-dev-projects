import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

function logger(req, res, next) {
    console.log("Request Method: " + req.method);
    console.log("Request URL: " + req.url);
    next();
}

app.use(logger);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    const mode = "default";
    res.render("index.ejs", {posts, mode});
})

app.post("/blog-post-creation", (req, res, next) => {
    const mode = "post";
    res.render("form.ejs", {mode});
})

app.post("/post-content", (req, res, next) => {
    const formData = {
        title: req.body['blog-title'],
        content: req.body['blog-content']
    };
    posts.push(formData);
    res.redirect("/");
});

app.post("/delete-post", (req, res, next) => {
    const selectedPostIndex = parseInt(req.body.postIndex);
    if (selectedPostIndex >= 0 && selectedPostIndex < posts.length) {
        posts.splice(selectedPostIndex, 1); // removes the post from the array
    }
    res.redirect("/");
})

app.get("/edit-post", (req, res, next) => {
    const mode = "edit";
    const selectedPostIndex = parseInt(req.query.editIndex);
    if (selectedPostIndex >= 0 && selectedPostIndex < posts.length) {
        let post = posts[selectedPostIndex];
        res.render("edit-form.ejs", {post, selectedPostIndex, mode});
    } else {
        res.redirect("/"); // redirect if index is out of range
    }
})

app.post("/update-post", (req, res, next) => {
    const updatePostIndex = parseInt(req.body.updateIndex); // use req.body because we carried out POST request
    if (updatePostIndex >= 0 && updatePostIndex < posts.length) {
        let updatedBlogTitle = req.body['blog-title'];
        let updatedBlogContent = req.body['blog-content'];
        posts[updatePostIndex].title = updatedBlogTitle;
        posts[updatePostIndex].content = updatedBlogContent;
    } 
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
