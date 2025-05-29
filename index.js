const express = require("express");
const fs = require("fs");
const app = express();

// Загружаем белый список HWID
const whitelist = JSON.parse(fs.readFileSync("whitelist.json")).whitelist;

app.use(express.json());

// Проверка HWID
app.post("/check-hwid", (req, res) => {
  const hwid = req.body.hwid;
  if (!hwid) {
    return res.status(400).json({ error: "HWID не указан" });
  }

  const isAllowed = whitelist.includes(hwid);
  res.json({ allowed: isAllowed });
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});