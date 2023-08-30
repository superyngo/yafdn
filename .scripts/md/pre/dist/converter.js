"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.convertFrontMatter = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var yaml_1 = require("yaml");
var postCategoryName = process.env.POST_CATEGORY || "posts";
var splitMdx = function (mdx) {
    var arr = mdx.split(/^(?:-{3}[\n\r]([\w\W]+?)[\n\r]-{3})/);
    if (arr.length === 1)
        return [mdx];
    var frontMatter = yaml_1["default"].parse(arr[1].trim());
    return [arr[2], frontMatter];
};
exports.convertFrontMatter = function (list) {
    return list.reduce(function (newList, node) {
        if (node.category.name === postCategoryName &&
            !node.labels.nodes.some(function (label, index, arr) { return label.name === "isPublic" && arr.splice(index, 1); } //filter out not public and spice the isPublic label
            ))
            return newList;
        var _a = splitMdx(node.body), md = _a[0], originalFrontMatter = _a[1];
        if (originalFrontMatter) {
            Object.entries(originalFrontMatter).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                node[key] = value;
            });
            var date = new Date(node.publishedAt);
            node.year = date.getFullYear();
            node.month = date.getMonth() + 1;
            node.date = date.getDate();
        }
        var test = node;
        delete test.body;
        var frontMatterText = "---\n" + yaml_1["default"].stringify(node) + "---\n";
        node.body = frontMatterText + md;
        return __spreadArrays(newList, [node]);
    }, []);
};
