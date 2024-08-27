import express from "express";

const configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); // báo vs th js rằng: t dùng view engine để hiển thị (dùng công nghệ j để viết code html trong js)
    app.set("views", "./src/views"); // tất cả view engine dc luuw trong src/views (định nghĩa nơi luu trữ file)
};
export default configViewEngine;