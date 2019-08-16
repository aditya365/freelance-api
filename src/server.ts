import app from "./app";

//port on which app runs
const port = process.env.port ||  3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
