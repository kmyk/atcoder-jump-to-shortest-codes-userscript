// ==UserScript==
// @name         AtCoder jump to shortest codes
// @description  adds links to submissions pages sorted by code length
// @version      0.2.0
// @author       Kimiyuki Onaka
// @include      https://atcoder.jp/contests/*/tasks*
// @include      https://atcoder.jp/contests/*/submissions*
// @supportURL   https://github.com/kmyk/atcoder-jump-to-shortest-codes-userscript
// @namespace    https://github.com/kmyk/
// ==/UserScript==

function createIconAnchorElement(url, classes, text) {
    const span = document.createElement("span");
    for (const class_ of classes) {
        span.classList.add(class_);
    }
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.appendChild(span);
    if (text) {
        a.appendChild(document.createTextNode(text));
    }
    return a;
}

(function() {
    'use strict';

    // add links to shortest codes to all links to problems
    for (const a of document.getElementsByTagName("a")) {
        if (/\/tasks\/\w+/.test(a.href)) {
            if (a.href.includes('#')) continue; // links with # should be ignored, since they are often dummy links
            const url = a.href.replace("tasks/", "submissions?f.Status=AC&orderBy=source_length&f.Task=");
            const shortest = createIconAnchorElement(url, ["glyphicon", "glyphicon-flag", "black"], null);

            a.parentElement.insertBefore(shortest, a.nextSibling);
        }
    }

    // add a tab to the navvar on problem pages
    if (/\/tasks\/\w+/.test(location.href)) {
        const url = location.href.replace("tasks/", "submissions?f.Status=AC&orderBy=source_length&f.Task=");

        const shortest = createIconAnchorElement(url, ["glyphicon", "glyphicon-flag"], "ゴルフ");
        const li = document.createElement("li");
        li.appendChild(shortest);
        const ul = document.getElementById('contest-nav-tabs').getElementsByClassName('nav nav-tabs')[0];
        ul.appendChild(li);
    }
})();
