"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/RentalsList",{

/***/ "./components/FilterComponent.js":
/*!***************************************!*\
  !*** ./components/FilterComponent.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/FilterComponent.module.css */ \"./styles/FilterComponent.module.css\");\n/* harmony import */ var _styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst FilterComponent = ({ filters, onFilterChange })=>{\n    _s();\n    const [filterValues, setFilterValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(filters);\n    const handleInputChange = (e)=>{\n        const { name, value } = e.target;\n        const updatedFilters = {\n            ...filterValues,\n            [name]: value\n        };\n        setFilterValues(updatedFilters);\n        onFilterChange(updatedFilters);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterContainer),\n        children: Object.keys(filters).map((key)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterItem),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        htmlFor: key,\n                        children: filters[key].label\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                        lineNumber: 18,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: filters[key].type,\n                        name: key,\n                        value: filterValues[key].value,\n                        onChange: handleInputChange,\n                        className: (_styles_FilterComponent_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterInput)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                        lineNumber: 19,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, key, true, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                lineNumber: 17,\n                columnNumber: 9\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, undefined);\n};\n_s(FilterComponent, \"0RxgS5AGcgiKaGcAUkT7p1FgT0k=\");\n_c = FilterComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (FilterComponent);\nvar _c;\n$RefreshReg$(_c, \"FilterComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0M7QUFDa0I7QUFFMUQsTUFBTUcsa0JBQWtCLENBQUMsRUFBRUMsT0FBTyxFQUFFQyxjQUFjLEVBQUU7O0lBQ2xELE1BQU0sQ0FBQ0MsY0FBY0MsZ0JBQWdCLEdBQUdOLCtDQUFRQSxDQUFDRztJQUVqRCxNQUFNSSxvQkFBb0IsQ0FBQ0M7UUFDekIsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHRixFQUFFRyxNQUFNO1FBQ2hDLE1BQU1DLGlCQUFpQjtZQUFFLEdBQUdQLFlBQVk7WUFBRSxDQUFDSSxLQUFLLEVBQUVDO1FBQU07UUFDeERKLGdCQUFnQk07UUFDaEJSLGVBQWVRO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVdiLDJGQUFzQjtrQkFDbkNlLE9BQU9DLElBQUksQ0FBQ2QsU0FBU2UsR0FBRyxDQUFDLENBQUNDLG9CQUN6Qiw4REFBQ047Z0JBQWNDLFdBQVdiLHNGQUFpQjs7a0NBQ3pDLDhEQUFDb0I7d0JBQU1DLFNBQVNIO2tDQUFNaEIsT0FBTyxDQUFDZ0IsSUFBSSxDQUFDRSxLQUFLOzs7Ozs7a0NBQ3hDLDhEQUFDRTt3QkFDQ0MsTUFBTXJCLE9BQU8sQ0FBQ2dCLElBQUksQ0FBQ0ssSUFBSTt3QkFDdkJmLE1BQU1VO3dCQUNOVCxPQUFPTCxZQUFZLENBQUNjLElBQUksQ0FBQ1QsS0FBSzt3QkFDOUJlLFVBQVVsQjt3QkFDVk8sV0FBV2IsdUZBQWtCOzs7Ozs7O2VBUHZCa0I7Ozs7Ozs7Ozs7QUFhbEI7R0ExQk1qQjtLQUFBQTtBQTRCTiwrREFBZUEsZUFBZUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudC5qcz82MTM1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvRmlsdGVyQ29tcG9uZW50Lm1vZHVsZS5jc3MnO1xyXG5cclxuY29uc3QgRmlsdGVyQ29tcG9uZW50ID0gKHsgZmlsdGVycywgb25GaWx0ZXJDaGFuZ2UgfSkgPT4ge1xyXG4gIGNvbnN0IFtmaWx0ZXJWYWx1ZXMsIHNldEZpbHRlclZhbHVlc10gPSB1c2VTdGF0ZShmaWx0ZXJzKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XHJcbiAgICBjb25zdCB1cGRhdGVkRmlsdGVycyA9IHsgLi4uZmlsdGVyVmFsdWVzLCBbbmFtZV06IHZhbHVlIH07XHJcbiAgICBzZXRGaWx0ZXJWYWx1ZXModXBkYXRlZEZpbHRlcnMpO1xyXG4gICAgb25GaWx0ZXJDaGFuZ2UodXBkYXRlZEZpbHRlcnMpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlckNvbnRhaW5lcn0+XHJcbiAgICAgIHtPYmplY3Qua2V5cyhmaWx0ZXJzKS5tYXAoKGtleSkgPT4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlckl0ZW19PlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2tleX0+e2ZpbHRlcnNba2V5XS5sYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHR5cGU9e2ZpbHRlcnNba2V5XS50eXBlfVxyXG4gICAgICAgICAgICBuYW1lPXtrZXl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJWYWx1ZXNba2V5XS52YWx1ZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJJbnB1dH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbHRlckNvbXBvbmVudDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJzdHlsZXMiLCJGaWx0ZXJDb21wb25lbnQiLCJmaWx0ZXJzIiwib25GaWx0ZXJDaGFuZ2UiLCJmaWx0ZXJWYWx1ZXMiLCJzZXRGaWx0ZXJWYWx1ZXMiLCJoYW5kbGVJbnB1dENoYW5nZSIsImUiLCJuYW1lIiwidmFsdWUiLCJ0YXJnZXQiLCJ1cGRhdGVkRmlsdGVycyIsImRpdiIsImNsYXNzTmFtZSIsImZpbHRlckNvbnRhaW5lciIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJmaWx0ZXJJdGVtIiwibGFiZWwiLCJodG1sRm9yIiwiaW5wdXQiLCJ0eXBlIiwib25DaGFuZ2UiLCJmaWx0ZXJJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/FilterComponent.js\n"));

/***/ })

});