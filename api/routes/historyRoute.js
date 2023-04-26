const express = require("express");
const historyRouter = express.Router();
const { getHistory, addHistory ,updateHistory} = require("../Controller/HistoryController");

historyRouter.get("/getHistory", getHistory);
historyRouter.post("/addHistory", addHistory);
historyRouter.patch("/updateHistory", updateHistory);

module.exports = historyRouter;

