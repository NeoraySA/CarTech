"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/CarAdd",{

/***/ "./pages/CarAdd.js":
/*!*************************!*\
  !*** ./pages/CarAdd.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_AddCarForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/AddCarForm */ \"./components/AddCarForm.js\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ListHeader */ \"./components/ListHeader.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction CarAdd() {\n    _s();\n    const [companyId, setCompanyId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const storedCompanyId = localStorage.getItem(\"company_id\");\n        if (storedCompanyId) {\n            setCompanyId(storedCompanyId);\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"הוספת רכב חדש\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CarAdd.js\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CarAdd.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                title: \"הוספת רכב חדש\",\n                subtitle: \"מילוי פרטי הרכב\",\n                showSearchBox: false\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CarAdd.js\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AddCarForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                companyId: companyId\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CarAdd.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CarAdd.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(CarAdd, \"7zDTQkHa+f4B3IIV8ynuV65G1DI=\");\n_c = CarAdd;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CarAdd);\nvar _c;\n$RefreshReg$(_c, \"CarAdd\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9DYXJBZGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDdEI7QUFDcUI7QUFDQTtBQUVsRCxTQUFTTTs7SUFDUCxNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR1AsK0NBQVFBLENBQUM7SUFFM0NDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTU8sa0JBQWtCQyxhQUFhQyxPQUFPLENBQUM7UUFDN0MsSUFBSUYsaUJBQWlCO1lBQ25CRCxhQUFhQztRQUNmO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNHOzswQkFDQyw4REFBQ1Qsa0RBQUlBOzBCQUNILDRFQUFDVTs4QkFBTTs7Ozs7Ozs7Ozs7MEJBRVQsOERBQUNSLDhEQUFVQTtnQkFDVFEsT0FBTTtnQkFDTkMsVUFBUztnQkFDVEMsZUFBZTs7Ozs7OzBCQUVqQiw4REFBQ1gsOERBQVVBO2dCQUFDRyxXQUFXQTs7Ozs7Ozs7Ozs7O0FBRzdCO0dBdkJTRDtLQUFBQTtBQXlCVCwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9DYXJBZGQuanM/NGM0NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IEFkZENhckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9BZGRDYXJGb3JtJztcclxuaW1wb3J0IExpc3RIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9MaXN0SGVhZGVyJztcclxuXHJcbmZ1bmN0aW9uIENhckFkZCgpIHtcclxuICBjb25zdCBbY29tcGFueUlkLCBzZXRDb21wYW55SWRdID0gdXNlU3RhdGUoJycpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkQ29tcGFueUlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbXBhbnlfaWQnKTtcclxuICAgIGlmIChzdG9yZWRDb21wYW55SWQpIHtcclxuICAgICAgc2V0Q29tcGFueUlkKHN0b3JlZENvbXBhbnlJZCk7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPHRpdGxlPteU15XXodek16og16jXm9eRINeX15PXqTwvdGl0bGU+XHJcbiAgICAgIDwvSGVhZD5cclxuICAgICAgPExpc3RIZWFkZXJcclxuICAgICAgICB0aXRsZT1cIteU15XXodek16og16jXm9eRINeX15PXqVwiXHJcbiAgICAgICAgc3VidGl0bGU9XCLXnteZ15zXldeZINek16jXmNeZINeU16jXm9eRXCJcclxuICAgICAgICBzaG93U2VhcmNoQm94PXtmYWxzZX0gIC8vINee15XXoNeiINeQ16og15TXpteS16og16rXmdeR16og15TXl9eZ16TXldepXHJcbiAgICAgIC8+XHJcbiAgICAgIDxBZGRDYXJGb3JtIGNvbXBhbnlJZD17Y29tcGFueUlkfSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FyQWRkO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkhlYWQiLCJBZGRDYXJGb3JtIiwiTGlzdEhlYWRlciIsIkNhckFkZCIsImNvbXBhbnlJZCIsInNldENvbXBhbnlJZCIsInN0b3JlZENvbXBhbnlJZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkaXYiLCJ0aXRsZSIsInN1YnRpdGxlIiwic2hvd1NlYXJjaEJveCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/CarAdd.js\n"));

/***/ })

});