"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randDelay = void 0;
function randDelay() {
    const delayTime = Math.floor(Math.random() * 10000);
    return delayTime;
}
exports.randDelay = randDelay;
