"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "__barrel_optimize__?names=FaCheckCircle,FaExclamationCircle,FaInfoCircle,FaSpinner!=!./node_modules/react-icons/fa/index.mjs":
/*!************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=FaCheckCircle,FaExclamationCircle,FaInfoCircle,FaSpinner!=!./node_modules/react-icons/fa/index.mjs ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_USER_Documents_CarTech_node_modules_react_icons_fa_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/react-icons/fa/index.mjs */ "./node_modules/react-icons/fa/index.mjs");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in C_Users_USER_Documents_CarTech_node_modules_react_icons_fa_index_mjs__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return C_Users_USER_Documents_CarTech_node_modules_react_icons_fa_index_mjs__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "./components/Notification.js":
/*!************************************!*\
  !*** ./components/Notification.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_FaCheckCircle_FaExclamationCircle_FaInfoCircle_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=FaCheckCircle,FaExclamationCircle,FaInfoCircle,FaSpinner!=!react-icons/fa */ \"__barrel_optimize__?names=FaCheckCircle,FaExclamationCircle,FaInfoCircle,FaSpinner!=!./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Notification.module.css */ \"./styles/Notification.module.css\");\n/* harmony import */ var _styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3__);\nvar _this = undefined;\n\n\n\n\nvar Notification = function(param) {\n    var message = param.message, type = param.type, onClose = param.onClose, onConfirm = param.onConfirm;\n    if (!message) return null;\n    var icon;\n    switch(type){\n        case \"success\":\n            icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheckCircle_FaExclamationCircle_FaInfoCircle_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.FaCheckCircle, {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().icon)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 11,\n                columnNumber: 14\n            }, _this);\n            break;\n        case \"error\":\n            icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheckCircle_FaExclamationCircle_FaInfoCircle_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.FaExclamationCircle, {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().icon)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 14,\n                columnNumber: 14\n            }, _this);\n            break;\n        case \"info\":\n            icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheckCircle_FaExclamationCircle_FaInfoCircle_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.FaInfoCircle, {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().icon)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 17,\n                columnNumber: 14\n            }, _this);\n            break;\n        case \"loading\":\n            icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCheckCircle_FaExclamationCircle_FaInfoCircle_FaSpinner_react_icons_fa__WEBPACK_IMPORTED_MODULE_2__.FaSpinner, {\n                className: \"\".concat((_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().icon), \" \").concat((_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().spinner))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 20,\n                columnNumber: 14\n            }, _this);\n            break;\n        default:\n            icon = null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"\".concat((_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().notification), \" \").concat((_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default())[type]),\n        children: [\n            icon,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().message),\n                children: message\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, _this),\n            onConfirm ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().buttonGroup),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().confirmButton),\n                        onClick: onConfirm,\n                        children: \"אישור\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                        lineNumber: 32,\n                        columnNumber: 11\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().cancelButton),\n                        onClick: onClose,\n                        children: \"ביטול\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                        lineNumber: 33,\n                        columnNumber: 11\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, _this) : type !== \"loading\" ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: (_styles_Notification_module_css__WEBPACK_IMPORTED_MODULE_3___default().closeButton),\n                onClick: onClose,\n                children: \"\\xd7\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n                lineNumber: 36,\n                columnNumber: 9\n            }, _this) : null\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\components\\\\Notification.js\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, _this);\n};\n_c = Notification;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Notification);\nvar _c;\n$RefreshReg$(_c, \"Notification\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05vdGlmaWNhdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBCO0FBQ21FO0FBQ3RDO0FBRXZELElBQU1NLGVBQWU7UUFBR0MsZ0JBQUFBLFNBQVNDLGFBQUFBLE1BQU1DLGdCQUFBQSxTQUFTQyxrQkFBQUE7SUFDOUMsSUFBSSxDQUFDSCxTQUFTLE9BQU87SUFFckIsSUFBSUk7SUFDSixPQUFRSDtRQUNOLEtBQUs7WUFDSEcscUJBQU8sOERBQUNWLHlJQUFhQTtnQkFBQ1csV0FBV1AsNkVBQVc7Ozs7OztZQUM1QztRQUNGLEtBQUs7WUFDSE0scUJBQU8sOERBQUNULCtJQUFtQkE7Z0JBQUNVLFdBQVdQLDZFQUFXOzs7Ozs7WUFDbEQ7UUFDRixLQUFLO1lBQ0hNLHFCQUFPLDhEQUFDUix3SUFBWUE7Z0JBQUNTLFdBQVdQLDZFQUFXOzs7Ozs7WUFDM0M7UUFDRixLQUFLO1lBQ0hNLHFCQUFPLDhEQUFDUCxxSUFBU0E7Z0JBQUNRLFdBQVcsR0FBa0JQLE9BQWZBLDZFQUFXLEVBQUMsS0FBa0IsT0FBZkEsZ0ZBQWM7Ozs7OztZQUM3RDtRQUNGO1lBQ0VNLE9BQU87SUFDWDtJQUVBLHFCQUNFLDhEQUFDRztRQUFJRixXQUFXLEdBQTBCUCxPQUF2QkEscUZBQW1CLEVBQUMsS0FBZ0IsT0FBYkEsd0VBQU0sQ0FBQ0csS0FBSzs7WUFDbkRHOzBCQUNELDhEQUFDSztnQkFBS0osV0FBV1AsZ0ZBQWM7MEJBQUdFOzs7Ozs7WUFDakNHLDBCQUNDLDhEQUFDSTtnQkFBSUYsV0FBV1Asb0ZBQWtCOztrQ0FDaEMsOERBQUNhO3dCQUFPTixXQUFXUCxzRkFBb0I7d0JBQUVlLFNBQVNWO2tDQUFXOzs7Ozs7a0NBQzdELDhEQUFDUTt3QkFBT04sV0FBV1AscUZBQW1CO3dCQUFFZSxTQUFTWDtrQ0FBUzs7Ozs7Ozs7Ozs7d0JBRTFERCxTQUFTLDBCQUNYLDhEQUFDVTtnQkFBT04sV0FBV1Asb0ZBQWtCO2dCQUFFZSxTQUFTWDswQkFBUzs7Ozs7d0JBQ3ZEOzs7Ozs7O0FBR1Y7S0FuQ01IO0FBcUNOLCtEQUFlQSxZQUFZQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvTm90aWZpY2F0aW9uLmpzP2Q0ZTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRmFDaGVja0NpcmNsZSwgRmFFeGNsYW1hdGlvbkNpcmNsZSwgRmFJbmZvQ2lyY2xlLCBGYVNwaW5uZXIgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL05vdGlmaWNhdGlvbi5tb2R1bGUuY3NzJztcclxuXHJcbmNvbnN0IE5vdGlmaWNhdGlvbiA9ICh7IG1lc3NhZ2UsIHR5cGUsIG9uQ2xvc2UsIG9uQ29uZmlybSB9KSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgbGV0IGljb247XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgaWNvbiA9IDxGYUNoZWNrQ2lyY2xlIGNsYXNzTmFtZT17c3R5bGVzLmljb259IC8+O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgaWNvbiA9IDxGYUV4Y2xhbWF0aW9uQ2lyY2xlIGNsYXNzTmFtZT17c3R5bGVzLmljb259IC8+O1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2luZm8nOlxyXG4gICAgICBpY29uID0gPEZhSW5mb0NpcmNsZSBjbGFzc05hbWU9e3N0eWxlcy5pY29ufSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdsb2FkaW5nJzpcclxuICAgICAgaWNvbiA9IDxGYVNwaW5uZXIgY2xhc3NOYW1lPXtgJHtzdHlsZXMuaWNvbn0gJHtzdHlsZXMuc3Bpbm5lcn1gfSAvPjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpY29uID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7c3R5bGVzLm5vdGlmaWNhdGlvbn0gJHtzdHlsZXNbdHlwZV19YH0+XHJcbiAgICAgIHtpY29ufVxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5tZXNzYWdlfT57bWVzc2FnZX08L3NwYW4+XHJcbiAgICAgIHtvbkNvbmZpcm0gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b25Hcm91cH0+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmNvbmZpcm1CdXR0b259IG9uQ2xpY2s9e29uQ29uZmlybX0+15DXmdep15XXqDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5jYW5jZWxCdXR0b259IG9uQ2xpY2s9e29uQ2xvc2V9PteR15nXmNeV15w8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IHR5cGUgIT09ICdsb2FkaW5nJyA/IChcclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmNsb3NlQnV0dG9ufSBvbkNsaWNrPXtvbkNsb3NlfT4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbjtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiRmFDaGVja0NpcmNsZSIsIkZhRXhjbGFtYXRpb25DaXJjbGUiLCJGYUluZm9DaXJjbGUiLCJGYVNwaW5uZXIiLCJzdHlsZXMiLCJOb3RpZmljYXRpb24iLCJtZXNzYWdlIiwidHlwZSIsIm9uQ2xvc2UiLCJvbkNvbmZpcm0iLCJpY29uIiwiY2xhc3NOYW1lIiwic3Bpbm5lciIsImRpdiIsIm5vdGlmaWNhdGlvbiIsInNwYW4iLCJidXR0b25Hcm91cCIsImJ1dHRvbiIsImNvbmZpcm1CdXR0b24iLCJvbkNsaWNrIiwiY2FuY2VsQnV0dG9uIiwiY2xvc2VCdXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Notification.js\n"));

/***/ })

});