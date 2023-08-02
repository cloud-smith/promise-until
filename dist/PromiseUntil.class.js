"use strict";
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
exports.PromiseUntil = void 0;
const PromiseUntil = (resolver) => {
    let state = {
        isCanceled: false,
        isComplete: false,
        results: undefined,
        error: undefined,
    };
    const promise = new Promise((resolve, reject) => {
        const onSuccess = (results) => {
            state.isComplete = true;
            state.results = results;
            resolve(results);
        };
        const onError = (error) => {
            state.isComplete = true;
            state.error = error;
            reject(error);
        };
        resolver(onSuccess, onError);
    });
    const callbacks = {};
    const proto = {
        then: callback => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield promise
                    .then(results => {
                    if (state.isCanceled)
                        return;
                    callback(state.results = results);
                })
                    .catch(() => { });
            }))();
            return proto;
        },
        catch: (callback) => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield promise
                    .catch(error => {
                    if (state.isCanceled)
                        return;
                    callback(state.error = error);
                });
            }))();
            return proto;
        },
        finally: (callback) => {
            callbacks.onFinally = callback;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield promise
                    .finally(() => {
                    if (state.isCanceled)
                        return;
                    callback();
                })
                    .catch(() => { });
            }))();
            return proto;
        },
        until: (condition) => {
            if (typeof condition === 'number') {
                setTimeout(() => {
                    state.isCanceled = true;
                    if (!state.isComplete && callbacks.onFinally)
                        callbacks.onFinally();
                }, condition);
            }
            return proto;
        },
    };
    return proto;
};
exports.PromiseUntil = PromiseUntil;
