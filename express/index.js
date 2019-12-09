const express = require("express");
const app = express();
const path = require("path");
const { check, validationResult } = require("express-validator");

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//global variable
app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  next();
});

const students = [
  { id: 1, name: "Opeyemi", age: 12, score: 56 },
  { id: 2, name: "Oyekunle", age: 10, score: 87 },
  { id: 3, name: "Oyetunde", age: 8, score: 45 }
];

app.get("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`
    <ul>
      <li>Name: ${name}</li>
      <li>Age: ${age}</li>
    </ul>
  `);
});

app.get("/:age/:name", (req, res) => {
  const { name, age } = req.params;
  res.send(`
    <ul>
      <li>Name: ${name}</li>
      <li>Age: ${age}</li>
    </ul>
  `);
});

app.get("/form", (req, res) => {
  res.render("index", {
    title: "Using Ejs",
    students
  });
});

app.post("/students", (req, res) => {
  const { name, age, score } = req.body;
  // res.redirect('/')
  /*
  res.send(`
    <ul>
      <li>Name: ${name}</li>
      <li>Age: ${age}</li>
      <li>Score: ${score}</li>
    </ul>
  `)
  */
  if (name === "" || age === "" || score === "") {
    res.render("index", {
      title: "Using Ejs",
      error: "No student was added",
      students
    });
  } else {
    students.push({ name, age, score });
    res.render("index", {
      title: "Using Ejs",
      success: "A student was added",
      students
    });
  }
});

app.get("/validation-form", (req, res) => {
  res.render("validation", {
    title: "validation"
  });
});

app.post(
  "/validation",
  [
    // username must be an email
    check("email", "Provide a valid email")
      .isEmail()
      .withMessage("include an @ and a dot")
      .isLength({ min: 5 })
      .withMessage("Minimum characters allowed is 5"),
    // password must be at least 5 chars long
    check("password", "password field must be at least 6 characters").isLength({
      min: 5
    }),
    check("gender")
      .isIn(["male", "female"])
      .withMessage("Wrong option chosen")
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    console.log(errors);
    // res.send('validation')
    if (errors.isEmpty()) {
      res.render("validation", {
        title: "validation",
        success: "successfully submitted"
      });
    } else {
      res.render("validation", {
        title: "validation",
        error: errors.array()
      });
    }
  }
);

app.put("/update", (req, res) => {
  res.send("Student Updated");
});

app.delete("/delete", (req, res) => {
  res.send("Student Deleted");
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
