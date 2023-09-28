const express = require("express");
const { notes } = require("./model/index");
const app = express();

require("./model/index");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all notes
app.get("/", async (req, res) => {
  const allNotes = await notes.findAll();

  res.render("Homepage", { notes: allNotes });
});
//createnote
app.get("/createNote", (req, res) => {
  res.render("createNote");
});
app.post("/createNote", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  await notes.create({
    title: title,
    content: content,
  });

  res.redirect("/");
});

// single note
app.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  const note = await notes.findAll({
    where: {
      id: id,
    },
  });

  res.render("singleNote.ejs", { note: note });
});

//delete the note
app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await notes.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/");
});
//edit note
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const note = await notes.findAll({
    where: {
      id: id,
    },
  });
  res.render("editNote", { note: note });
});
app.post("/editNote/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await notes.update(
    {
      title: title,
      content: content,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/single/" + id);
});
app.use(express.static("public/"));

app.listen(3000, () => {
  console.log("NodeJs project has started at port 3000");
});
