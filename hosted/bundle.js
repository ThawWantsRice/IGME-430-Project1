/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js"
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
() {

eval("{const handleResponse = async (response, parseResponse) => {\r\n    const content = document.querySelector('#content');\r\n\r\n    switch (response.status) {\r\n        case 200:\r\n            content.innerHTML = '<b>Success</b>';\r\n            break;\r\n        case 201:\r\n            content.innerHTML = '<b>Created</b>';\r\n            break;\r\n        case 204:\r\n            content.innerHTML = '';\r\n            const statusLine = `<p><strong>Status:</strong> ${response.status}</p>`;\r\n            const lengthLine = `<p><strong>Content-Length:</strong> ${response.headers.get('content-length') || 'Unknown'}</p>`;\r\n            const responseLine = `<p><strong>Response:</strong></p>`;\r\n            content.innerHTML += statusLine + lengthLine + responseLine;\r\n            break;\r\n        case 400:\r\n            content.innerHTML = '<b>Bad Request</b>';\r\n            break;\r\n        case 404:\r\n            content.innerHTML = '<b>Not Found</b>';\r\n            break;\r\n        default:\r\n            content.innerHTML = `Error code not implemented by client.`;\r\n            break;\r\n    }\r\n\r\n    if (parseResponse && response.status !== 204) {\r\n        try {\r\n            const obj = await response.json();\r\n            const statusLine = `<p><strong>Status:</strong> ${response.status}</p>`;\r\n            const lengthLine = `<p><strong>Content-Length:</strong> ${response.headers.get('content-length') || 'Unknown'}</p>`;\r\n            const responseLine = `<p><strong>Response:</strong></p><pre>${JSON.stringify(obj, null, 2)}</pre>`;\r\n\r\n            content.innerHTML += statusLine + lengthLine + responseLine;\r\n        } catch (err) {\r\n            content.innerHTML += `<p>No JSON response</p>`;\r\n        }\r\n    }\r\n};\r\n\r\nconst sendPost = async (form) => {\r\n    const url = form.getAttribute('action');\r\n    const method = form.getAttribute('method');\r\n\r\n    const name = form.querySelector('#addPokemonName').value;\r\n    const primary = form.querySelector('#addPrimaryType').value;\r\n    const secondary = form.querySelector('#addSecondaryType').value;\r\n\r\n    let type = [primary];\r\n    if (secondary && secondary !== primary) type.push(secondary);\r\n\r\n    const weight = form.querySelector('#addWeight').value;\r\n    const height = form.querySelector('#addHeight').value;\r\n    const img = form.querySelector('#addImg').value || '';\r\n\r\n    const dataType = form.querySelector('#addDataType').value;\r\n\r\n    let formData;\r\n\r\n    if (dataType === 'application/json') {\r\n        formData = JSON.stringify({ name, type, weight, height, img });\r\n    } else {\r\n        // URL-encoded\r\n        formData = `name=${encodeURIComponent(name)}&weight=${encodeURIComponent(weight)}&height=${encodeURIComponent(height)}&img=${encodeURIComponent(img)}`;\r\n        type.forEach((t) => formData += `&type=${encodeURIComponent(t)}`);\r\n    }\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': dataType,\r\n            'Content-Length': formData.length,\r\n        },\r\n        body: formData,\r\n    });\r\n\r\n    handleResponse(response, true);\r\n};\r\n\r\nconst init = () => {\r\n    const pokemonForm = document.querySelector(\"#pokemonForm\");\r\n\r\n    const addPokemon = (e) => {\r\n        e.preventDefault();\r\n        sendPost(pokemonForm);\r\n        return false;\r\n    }\r\n\r\n    pokemonForm.addEventListener('submit', addPokemon);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://igme-430-project1/./client/client.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;