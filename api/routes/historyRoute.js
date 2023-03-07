const express = require("express");
const historyRouter = express.Router();
const { getHistory, addHistory } = require("../Controller/HistoryController");

historyRouter.get("/getHistory", getHistory);
historyRouter.post("/addHistory", addHistory);

module.exports = historyRouter;

