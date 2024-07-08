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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/RentalsList.module.css */ \"./styles/RentalsList.module.css\");\n/* harmony import */ var _styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst FilterComponent = ({ filters, onFilterChange })=>{\n    const handleInputChange = (e, key)=>{\n        const { value } = e.target;\n        const updatedFilters = {\n            ...filters,\n            [key]: {\n                ...filters[key],\n                value\n            }\n        };\n        onFilterChange(updatedFilters);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterContainer),\n        children: Object.keys(filters).map((key)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterItem),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        children: filters[key].label\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                        lineNumber: 18,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: filters[key].type,\n                        value: filters[key].value,\n                        onChange: (e)=>handleInputChange(e, key),\n                        className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_2___default().filterInput)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                        lineNumber: 19,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, key, true, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n                lineNumber: 17,\n                columnNumber: 9\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\FilterComponent.js\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, undefined);\n};\n_c = FilterComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (FilterComponent);\nvar _c;\n$RefreshReg$(_c, \"FilterComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUM0QjtBQUV0RCxNQUFNRSxrQkFBa0IsQ0FBQyxFQUFFQyxPQUFPLEVBQUVDLGNBQWMsRUFBRTtJQUNsRCxNQUFNQyxvQkFBb0IsQ0FBQ0MsR0FBR0M7UUFDNUIsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0YsRUFBRUcsTUFBTTtRQUMxQixNQUFNQyxpQkFBaUI7WUFDckIsR0FBR1AsT0FBTztZQUNWLENBQUNJLElBQUksRUFBRTtnQkFBRSxHQUFHSixPQUFPLENBQUNJLElBQUk7Z0JBQUVDO1lBQU07UUFDbEM7UUFDQUosZUFBZU07SUFDakI7SUFFQSxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBV1gsdUZBQXNCO2tCQUNuQ2EsT0FBT0MsSUFBSSxDQUFDWixTQUFTYSxHQUFHLENBQUMsQ0FBQ1Qsb0JBQ3pCLDhEQUFDSTtnQkFBY0MsV0FBV1gsa0ZBQWlCOztrQ0FDekMsOERBQUNpQjtrQ0FBT2YsT0FBTyxDQUFDSSxJQUFJLENBQUNXLEtBQUs7Ozs7OztrQ0FDMUIsOERBQUNDO3dCQUNDQyxNQUFNakIsT0FBTyxDQUFDSSxJQUFJLENBQUNhLElBQUk7d0JBQ3ZCWixPQUFPTCxPQUFPLENBQUNJLElBQUksQ0FBQ0MsS0FBSzt3QkFDekJhLFVBQVUsQ0FBQ2YsSUFBTUQsa0JBQWtCQyxHQUFHQzt3QkFDdENLLFdBQVdYLG1GQUFrQjs7Ozs7OztlQU52Qk07Ozs7Ozs7Ozs7QUFZbEI7S0F6Qk1MO0FBMkJOLCtEQUFlQSxlQUFlQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvRmlsdGVyQ29tcG9uZW50LmpzPzYxMzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvUmVudGFsc0xpc3QubW9kdWxlLmNzcyc7XHJcblxyXG5jb25zdCBGaWx0ZXJDb21wb25lbnQgPSAoeyBmaWx0ZXJzLCBvbkZpbHRlckNoYW5nZSB9KSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZSwga2V5KSA9PiB7XHJcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlLnRhcmdldDtcclxuICAgIGNvbnN0IHVwZGF0ZWRGaWx0ZXJzID0ge1xyXG4gICAgICAuLi5maWx0ZXJzLFxyXG4gICAgICBba2V5XTogeyAuLi5maWx0ZXJzW2tleV0sIHZhbHVlIH0sXHJcbiAgICB9O1xyXG4gICAgb25GaWx0ZXJDaGFuZ2UodXBkYXRlZEZpbHRlcnMpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlckNvbnRhaW5lcn0+XHJcbiAgICAgIHtPYmplY3Qua2V5cyhmaWx0ZXJzKS5tYXAoKGtleSkgPT4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT17c3R5bGVzLmZpbHRlckl0ZW19PlxyXG4gICAgICAgICAgPGxhYmVsPntmaWx0ZXJzW2tleV0ubGFiZWx9PC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPXtmaWx0ZXJzW2tleV0udHlwZX1cclxuICAgICAgICAgICAgdmFsdWU9e2ZpbHRlcnNba2V5XS52YWx1ZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJbnB1dENoYW5nZShlLCBrZXkpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5maWx0ZXJJbnB1dH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbHRlckNvbXBvbmVudDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0Iiwic3R5bGVzIiwiRmlsdGVyQ29tcG9uZW50IiwiZmlsdGVycyIsIm9uRmlsdGVyQ2hhbmdlIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJlIiwia2V5IiwidmFsdWUiLCJ0YXJnZXQiLCJ1cGRhdGVkRmlsdGVycyIsImRpdiIsImNsYXNzTmFtZSIsImZpbHRlckNvbnRhaW5lciIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJmaWx0ZXJJdGVtIiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJvbkNoYW5nZSIsImZpbHRlcklucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/FilterComponent.js\n"));

/***/ })

});