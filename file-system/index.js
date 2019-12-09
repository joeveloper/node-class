// const fs = require("fs");

// fs.appendFile("text.txt", "New content", err => {
//   if (err) throw err;
//   console.log("New data has been added");
// });

//truncate a file
//firstly we read the file
// console.log(fs.readFileSync("text.txt", "utf-8"));

// const fd = fs.openSync("text.txt", "r+");
//truncate the file
// fs.ftruncate(fd, 20, err => {
//   console.log(fs.readFileSync("text.txt", "utf-8"));
// });

//Create a folder
// fs.mkdir("Folder one", { recursive: true }, err => {
//   if (err) throw err;
//   console.log("Folder added successfully");
// });

//remove folder

// fs.rmdir("Folder one", err => {
//   if (err) throw err;
//   console.log("Folder deleted");
// });

// fs.writeFile("write.txt", "A new content", err => {
//   if (err) throw err;
//   console.log("added successfully");
// });
