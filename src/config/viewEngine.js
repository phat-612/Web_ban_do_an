import path from "path";

const viewEngine = (app) => {
  // Set the view engine to EJS
  app.set("view engine", "ejs");

  // Set the directory for the views
  app.set("views", path.join(__dirname, "../views"));
};
export default viewEngine;
