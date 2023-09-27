import fs from "fs";
import path from "path";
// myModule.mjs
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current directory of the module
const __dirname = dirname(fileURLToPath(import.meta.url));

// utilities
import { getDT } from "../utilities/getdateTime.js";

// catch all request errors
export const errorLog = async (err, req, res, next) => {
  try {
    if (!err) {
      return next();
    }
    // patht o folder and file erroor logger
    const pathToLogFolder = path.join(__dirname, "..", "log");
    const pathToFile = path.join(pathToLogFolder, "error-log.txt");

    // get the status code and set it to 500 if its ok
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    const error = `${getDT()}\t\t\t\t${req.method}\t\t\t${
      req.url
    }\t\t\t${statusCode}\t\t\t${err.message}\n`;

    //   check if log folder exists or not
    if (!fs.existsSync(pathToLogFolder)) {
      fs.mkdirSync(pathToLogFolder);
    }

    // if folder exists then:
    // check if file is not exisiting
    if (!fs.existsSync(pathToFile)) {
      fs.writeFileSync(pathToFile, error);
    } else {
      fs.appendFileSync(pathToFile, error);
    }

    return res.status(statusCode).json({ message: err.message });
  } catch (error) {
    console.log(`Error logger error: ${error.message}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};
