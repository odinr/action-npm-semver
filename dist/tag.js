"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tag = exports.latestTag = void 0;
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const path_1 = require("path");
exports.latestTag = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = github_1.getOctokit(core.getInput('token', { required: true }));
    const { data: { tag_name } } = yield client.repos.getLatestRelease({
        repo: core.getInput('repo') || github_1.context.repo.repo,
        owner: core.getInput('owner') || github_1.context.repo.owner,
    });
    return tag_name;
});
exports.tag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    switch (tag) {
        case 'current':
            return `v${require(path_1.resolve(process.cwd(), 'package.json')).version}`;
        case 'latest':
            return exports.latestTag();
        default:
            return tag.replace('refs/tags/', '');
    }
});
exports.default = exports.tag;
