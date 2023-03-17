"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const cloud = cloudinary_1.v2.config({
    cloud_name: "dvjd1s1cr",
    api_key: "948725743129798",
    api_secret: "Yr_zD7Z1BVVAq38r2XlwXK4fSlU-GA-GA",
    secure: true
});
exports.default = cloud;
