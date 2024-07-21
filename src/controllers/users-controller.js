import url from "url";
import { UsersModel } from "../model/users-model.js";
import { jsonMiddelware } from "../utils/json-middelware.js";

export class UsersController {
  static async signupUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;

      if (
        !input.hasOwnProperty("fullname") ||
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "you have to fill the filds" }));
        return;
      }

      try {
        const newUser = await UsersModel.registerUser({ input });

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "new user was created", newUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }
  static async loginUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;
      if (
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "you have to fill the filds" }));
        return;
      }

      try {
        const logUser = await UsersModel.loginUser({ input });

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "a user was loged", logUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }
  static async userInfo(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;
    console.log(id);

    const userInfoByID = await UsersModel.getUser({ id: id });

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "user was found", user: userInfoByID }));
  }
}
