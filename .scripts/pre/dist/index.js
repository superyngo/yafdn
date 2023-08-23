"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var converter_js_1 = require("./converter.js");
var fetcher_js_1 = require("./fetcher.js");
var filter_js_1 = require("./filter.js");
var writer_js_1 = require("./writer.js");
dotenv_1["default"].config();
var _a = await fetcher_js_1.fetchUser(), user = _a.login, githubUrl = _a.url, bio = _a.bio;
var list = await fetcher_js_1.fetchAllDiscussions(user);
list = converter_js_1.convertFrontMatter(list);
var allList = await filter_js_1.filterAll(list);
var configList = [
    ["PAGE_SIZE"],
    ["BLOG_NAME"],
    ["BIO", bio],
    ["EMAIL"],
    ["TWITTER"],
    ["DOMAIN"],
    ["DESCRIPTION"],
    ["KEYWORDS"],
    ["REPOSITORY"],
    ["LANGUAGE"],
    ["COMMENT"],
    ["TIMEZONE"],
];
var config = allList.config[0] ? dotenv_1["default"].parse(allList.config[0].body) : {};
config.NAME = user;
config.GITHUB_URL = githubUrl;
configList.forEach(function (_a) {
    var key = _a[0], value = _a[1];
    var finalValue = config[key] || process.env[key] || value;
    if (!finalValue)
        return;
    config[key] = finalValue;
});
await writer_js_1.writeEnv(config);
await writer_js_1.writePosts(allList.posts);
await writer_js_1.writePages(allList.pages);
console.log("done");
