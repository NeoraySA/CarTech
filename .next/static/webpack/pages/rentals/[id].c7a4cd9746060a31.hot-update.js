"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/rentals/[id]",{

/***/ "./components/EditDetailsForm.js":
/*!***************************************!*\
  !*** ./components/EditDetailsForm.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/EditDetailsForm.module.css */ \"./styles/EditDetailsForm.module.css\");\n/* harmony import */ var _styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_translations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/translations */ \"./src/translations.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst EditDetailsForm = ({ rentalDetails, groupTitle, onClose, onSave, summaryGroups })=>{\n    _s();\n    const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        ...rentalDetails\n    });\n    const handleChange = (e)=>{\n        const { name, value } = e.target;\n        setFormData({\n            ...formData,\n            [name]: value\n        });\n    };\n    const handleSave = ()=>{\n        onSave(formData);\n    };\n    const renderFields = ()=>{\n        const fields = summaryGroups.find((group)=>group.title === groupTitle)?.fields || [];\n        return fields.map((field, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2___default().inputField),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        children: [\n                            _src_translations__WEBPACK_IMPORTED_MODULE_3__[\"default\"][field] || field,\n                            \":\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n                        lineNumber: 21,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        name: field,\n                        value: formData[field] || \"\",\n                        onChange: handleChange\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n                        lineNumber: 22,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, index, true, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, undefined));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2___default().editDetailsForm),\n        children: [\n            renderFields(),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleSave,\n                className: (_styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2___default().saveButton),\n                children: \"שמור\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: onClose,\n                className: (_styles_EditDetailsForm_module_css__WEBPACK_IMPORTED_MODULE_2___default().cancelButton),\n                children: \"בטל\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\EditDetailsForm.js\",\n        lineNumber: 33,\n        columnNumber: 5\n    }, undefined);\n};\n_s(EditDetailsForm, \"yTzdt+/NT9rYMrLejaJ3RLuAySw=\");\n_c = EditDetailsForm;\n/* harmony default export */ __webpack_exports__[\"default\"] = (EditDetailsForm);\nvar _c;\n$RefreshReg$(_c, \"EditDetailsForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0VkaXREZXRhaWxzRm9ybS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdDO0FBQ2tCO0FBQ047QUFFcEQsTUFBTUksa0JBQWtCLENBQUMsRUFBRUMsYUFBYSxFQUFFQyxVQUFVLEVBQUVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxhQUFhLEVBQUU7O0lBQ3BGLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHViwrQ0FBUUEsQ0FBQztRQUFFLEdBQUdJLGFBQWE7SUFBQztJQUU1RCxNQUFNTyxlQUFlLENBQUNDO1FBQ3BCLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBR0YsRUFBRUcsTUFBTTtRQUNoQ0wsWUFBWTtZQUFFLEdBQUdELFFBQVE7WUFBRSxDQUFDSSxLQUFLLEVBQUVDO1FBQU07SUFDM0M7SUFFQSxNQUFNRSxhQUFhO1FBQ2pCVCxPQUFPRTtJQUNUO0lBRUEsTUFBTVEsZUFBZTtRQUNuQixNQUFNQyxTQUFTVixjQUFjVyxJQUFJLENBQUNDLENBQUFBLFFBQVNBLE1BQU1DLEtBQUssS0FBS2hCLGFBQWFhLFVBQVUsRUFBRTtRQUNwRixPQUFPQSxPQUFPSSxHQUFHLENBQUMsQ0FBQ0MsT0FBT0Msc0JBQ3hCLDhEQUFDQztnQkFBZ0JDLFdBQVd6QixzRkFBaUI7O2tDQUMzQyw4REFBQzJCOzs0QkFBTzFCLHlEQUFpQixDQUFDcUIsTUFBTSxJQUFJQTs0QkFBTTs7Ozs7OztrQ0FDMUMsOERBQUNNO3dCQUNDQyxNQUFLO3dCQUNMakIsTUFBTVU7d0JBQ05ULE9BQU9MLFFBQVEsQ0FBQ2MsTUFBTSxJQUFJO3dCQUMxQlEsVUFBVXBCOzs7Ozs7O2VBTkphOzs7OztJQVVkO0lBRUEscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVd6QiwyRkFBc0I7O1lBQ25DZ0I7MEJBQ0QsOERBQUNnQjtnQkFBT0MsU0FBU2xCO2dCQUFZVSxXQUFXekIsc0ZBQWlCOzBCQUFFOzs7Ozs7MEJBQzNELDhEQUFDZ0M7Z0JBQU9DLFNBQVM1QjtnQkFBU29CLFdBQVd6Qix3RkFBbUI7MEJBQUU7Ozs7Ozs7Ozs7OztBQUdoRTtHQWxDTUU7S0FBQUE7QUFvQ04sK0RBQWVBLGVBQWVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9FZGl0RGV0YWlsc0Zvcm0uanM/OThmMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL0VkaXREZXRhaWxzRm9ybS5tb2R1bGUuY3NzJztcclxuaW1wb3J0IGxhYmVsVHJhbnNsYXRpb25zIGZyb20gJy4uL3NyYy90cmFuc2xhdGlvbnMnO1xyXG5cclxuY29uc3QgRWRpdERldGFpbHNGb3JtID0gKHsgcmVudGFsRGV0YWlscywgZ3JvdXBUaXRsZSwgb25DbG9zZSwgb25TYXZlLCBzdW1tYXJ5R3JvdXBzIH0pID0+IHtcclxuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHsgLi4ucmVudGFsRGV0YWlscyB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcclxuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xyXG4gICAgc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgW25hbWVdOiB2YWx1ZSB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlID0gKCkgPT4ge1xyXG4gICAgb25TYXZlKGZvcm1EYXRhKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW5kZXJGaWVsZHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmaWVsZHMgPSBzdW1tYXJ5R3JvdXBzLmZpbmQoZ3JvdXAgPT4gZ3JvdXAudGl0bGUgPT09IGdyb3VwVGl0bGUpPy5maWVsZHMgfHwgW107XHJcbiAgICByZXR1cm4gZmllbGRzLm1hcCgoZmllbGQsIGluZGV4KSA9PiAoXHJcbiAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXRGaWVsZH0+XHJcbiAgICAgICAgPGxhYmVsPntsYWJlbFRyYW5zbGF0aW9uc1tmaWVsZF0gfHwgZmllbGR9OjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICBuYW1lPXtmaWVsZH1cclxuICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YVtmaWVsZF0gfHwgJyd9XHJcbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZWRpdERldGFpbHNGb3JtfT5cclxuICAgICAge3JlbmRlckZpZWxkcygpfVxyXG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNhdmV9IGNsYXNzTmFtZT17c3R5bGVzLnNhdmVCdXR0b259Ptep157XldeoPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17b25DbG9zZX0gY2xhc3NOYW1lPXtzdHlsZXMuY2FuY2VsQnV0dG9ufT7XkdeY15w8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0RGV0YWlsc0Zvcm07XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwic3R5bGVzIiwibGFiZWxUcmFuc2xhdGlvbnMiLCJFZGl0RGV0YWlsc0Zvcm0iLCJyZW50YWxEZXRhaWxzIiwiZ3JvdXBUaXRsZSIsIm9uQ2xvc2UiLCJvblNhdmUiLCJzdW1tYXJ5R3JvdXBzIiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsImhhbmRsZUNoYW5nZSIsImUiLCJuYW1lIiwidmFsdWUiLCJ0YXJnZXQiLCJoYW5kbGVTYXZlIiwicmVuZGVyRmllbGRzIiwiZmllbGRzIiwiZmluZCIsImdyb3VwIiwidGl0bGUiLCJtYXAiLCJmaWVsZCIsImluZGV4IiwiZGl2IiwiY2xhc3NOYW1lIiwiaW5wdXRGaWVsZCIsImxhYmVsIiwiaW5wdXQiLCJ0eXBlIiwib25DaGFuZ2UiLCJlZGl0RGV0YWlsc0Zvcm0iLCJidXR0b24iLCJvbkNsaWNrIiwic2F2ZUJ1dHRvbiIsImNhbmNlbEJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/EditDetailsForm.js\n"));

/***/ })

});