"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/CustomerAdd",{

/***/ "./pages/CustomerAdd.js":
/*!******************************!*\
  !*** ./pages/CustomerAdd.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swc/helpers/_/_define_property */ \"./node_modules/@swc/helpers/esm/_define_property.js\");\n/* harmony import */ var _swc_helpers_object_spread__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swc/helpers/_/_object_spread */ \"./node_modules/@swc/helpers/esm/_object_spread.js\");\n/* harmony import */ var _swc_helpers_object_spread_props__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_object_spread_props */ \"./node_modules/@swc/helpers/esm/_object_spread_props.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ \"./node_modules/@swc/helpers/esm/_ts_generator.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var _components_AddCustomerForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/AddCustomerForm */ \"./components/AddCustomerForm.js\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ListHeader */ \"./components/ListHeader.js\");\n/* harmony import */ var _components_ListFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ListFooter */ \"./components/ListFooter.js\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"./node_modules/process/browser.js\");\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\n\n\n\n // קומפוננטה שתיצור להוספת הטופס\n\n\nfunction AddCustomerPage() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_6__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        last_name: \"\",\n        first_name: \"\",\n        company_name: \"\",\n        street: \"\",\n        building_number: \"\",\n        city: \"\",\n        country: \"\",\n        telephone: \"\",\n        cellphone: \"\",\n        fax: \"\",\n        email: \"\",\n        gender: \"\",\n        category: \"\",\n        referral: \"\",\n        is_active: false,\n        vat_exempt: false,\n        deposit_exempt: false,\n        notes: \"\"\n    }), 2), formData = _useState[0], setFormData = _useState[1];\n    var handleChange = function(event) {\n        var _event_target = event.target, name = _event_target.name, value = _event_target.value, type = _event_target.type, checked = _event_target.checked;\n        setFormData((0,_swc_helpers_object_spread_props__WEBPACK_IMPORTED_MODULE_7__._)((0,_swc_helpers_object_spread__WEBPACK_IMPORTED_MODULE_8__._)({}, formData), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_9__._)({}, name, type === \"checkbox\" ? checked : value)));\n    };\n    var handleSubmit = function() {\n        var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_10__._)(function(event) {\n            var apiUrl, token, company_id, branch_id, added_by, completeFormData, response, error;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_11__._)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        event.preventDefault();\n                        apiUrl = process.env.NEXT_PUBLIC_API_URL || \"http://localhost:3001\";\n                        token = localStorage.getItem(\"token\"); // קריאה של הטוקן מ-localStorage\n                        company_id = localStorage.getItem(\"company_id\");\n                        branch_id = localStorage.getItem(\"branch_id\");\n                        added_by = localStorage.getItem(\"user_id\");\n                        completeFormData = (0,_swc_helpers_object_spread_props__WEBPACK_IMPORTED_MODULE_7__._)((0,_swc_helpers_object_spread__WEBPACK_IMPORTED_MODULE_8__._)({}, formData), {\n                            company_id: company_id,\n                            branch_id: branch_id,\n                            added_by: added_by\n                        });\n                        _state.label = 1;\n                    case 1:\n                        _state.trys.push([\n                            1,\n                            3,\n                            ,\n                            4\n                        ]);\n                        return [\n                            4,\n                            axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].post(\"\".concat(apiUrl, \"/api/customers\"), completeFormData, {\n                                headers: {\n                                    Authorization: \"Bearer \".concat(token)\n                                }\n                            })\n                        ];\n                    case 2:\n                        response = _state.sent();\n                        if (response.status === 201) {\n                            setNotification({\n                                message: \"הלקוח נוסף בהצלחה!\",\n                                type: \"success\"\n                            });\n                        }\n                        return [\n                            3,\n                            4\n                        ];\n                    case 3:\n                        error = _state.sent();\n                        console.error(\"Failed to add customer:\", error);\n                        setNotification({\n                            message: \"הוספת הלקוח נכשלה!\",\n                            type: \"error\"\n                        });\n                        return [\n                            3,\n                            4\n                        ];\n                    case 4:\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return function handleSubmit(event) {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"הוספת לקוח חדש\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\OneDrive - חושן קאר\\\\CarTech\\\\ריאקט ונקסט\\\\CarTech\\\\pages\\\\CustomerAdd.js\",\n                    lineNumber: 72,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\OneDrive - חושן קאר\\\\CarTech\\\\ריאקט ונקסט\\\\CarTech\\\\pages\\\\CustomerAdd.js\",\n                lineNumber: 71,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                title: \"הוספת לקוח חדש\",\n                subtitle: \"מילוי פרטי הלקוח\",\n                showSearchBox: false\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\OneDrive - חושן קאר\\\\CarTech\\\\ריאקט ונקסט\\\\CarTech\\\\pages\\\\CustomerAdd.js\",\n                lineNumber: 74,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AddCustomerForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                formData: formData,\n                handleChange: handleChange,\n                handleSubmit: handleSubmit\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\OneDrive - חושן קאר\\\\CarTech\\\\ריאקט ונקסט\\\\CarTech\\\\pages\\\\CustomerAdd.js\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\OneDrive - חושן קאר\\\\CarTech\\\\ריאקט ונקסט\\\\CarTech\\\\pages\\\\CustomerAdd.js\",\n        lineNumber: 70,\n        columnNumber: 5\n    }, this);\n}\n_s(AddCustomerPage, \"wDNo+rlHroqopKxbAw/HatsO5Lw=\");\n_c = AddCustomerPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AddCustomerPage);\nvar _c;\n$RefreshReg$(_c, \"AddCustomerPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9DdXN0b21lckFkZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNYO0FBQ0g7QUFDa0MsQ0FBQyxnQ0FBZ0M7QUFDM0M7QUFDQTtBQUVsRCxTQUFTTzs7SUFDUCxJQUFnQ04sWUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFDO1FBQ3ZDTyxXQUFXO1FBQ1hDLFlBQVk7UUFDWkMsY0FBYztRQUNkQyxRQUFRO1FBQ1JDLGlCQUFpQjtRQUNqQkMsTUFBTTtRQUNOQyxTQUFTO1FBQ1RDLFdBQVc7UUFDWEMsV0FBVztRQUNYQyxLQUFLO1FBQ0xDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxVQUFVO1FBQ1ZDLFVBQVU7UUFDVkMsV0FBVztRQUNYQyxZQUFZO1FBQ1pDLGdCQUFnQjtRQUNoQkMsT0FBTztJQUNULFFBbkJPQyxXQUF5QnpCLGNBQWYwQixjQUFlMUI7SUFxQmhDLElBQU0yQixlQUFlLFNBQUNDO1FBQ3BCLElBQXVDQSxnQkFBQUEsTUFBTUMsTUFBTSxFQUEzQ0MsT0FBK0JGLGNBQS9CRSxNQUFNQyxRQUF5QkgsY0FBekJHLE9BQU9DLE9BQWtCSixjQUFsQkksTUFBTUMsVUFBWUwsY0FBWks7UUFDM0JQLFlBQVksc0lBQ1BELFdBQ0gsb0VBQUNLLE1BQU9FLFNBQVMsYUFBYUMsVUFBVUY7SUFFNUM7SUFFQSxJQUFNRzttQkFBZSw2RUFBT047Z0JBRXBCTyxRQUNBQyxPQUNBQyxZQUNBQyxXQUNBQyxVQUVBQyxrQkFRRUMsVUFRQ0M7Ozs7d0JBdkJUZCxNQUFNZSxjQUFjO3dCQUNkUixTQUFTUyxPQUFPQSxDQUFDQyxHQUFHLENBQUNDLG1CQUFtQixJQUFJO3dCQUM1Q1YsUUFBUVcsYUFBYUMsT0FBTyxDQUFDLFVBQVUsZ0NBQWdDO3dCQUN2RVgsYUFBYVUsYUFBYUMsT0FBTyxDQUFDO3dCQUNsQ1YsWUFBWVMsYUFBYUMsT0FBTyxDQUFDO3dCQUNqQ1QsV0FBV1EsYUFBYUMsT0FBTyxDQUFDO3dCQUVoQ1IsbUJBQW1CLHNJQUNwQmY7NEJBQ0hZLFlBQUFBOzRCQUNBQyxXQUFBQTs0QkFDQUMsVUFBQUE7Ozs7Ozs7Ozs7d0JBSWlCOzs0QkFBTXJDLG1EQUFVLENBQUMsR0FBVSxPQUFQaUMsUUFBTyxtQkFBaUJLLGtCQUFrQjtnQ0FDN0VVLFNBQVM7b0NBQ1BDLGVBQWUsVUFBZ0IsT0FBTmY7Z0NBQzNCOzRCQUNGOzs7d0JBSk1LLFdBQVc7d0JBS2pCLElBQUlBLFNBQVNXLE1BQU0sS0FBSyxLQUFLOzRCQUMzQkMsZ0JBQWdCO2dDQUFFQyxTQUFTO2dDQUFzQnRCLE1BQU07NEJBQVU7d0JBQ25FOzs7Ozs7d0JBQ09VO3dCQUNQYSxRQUFRYixLQUFLLENBQUMsMkJBQTJCQTt3QkFDekNXLGdCQUFnQjs0QkFBRUMsU0FBUzs0QkFBc0J0QixNQUFNO3dCQUFROzs7Ozs7Ozs7OztRQUVuRTt3QkE1Qk1FLGFBQXNCTjs7OztJQStCNUIscUJBQ0UsOERBQUM0Qjs7MEJBQ0MsOERBQUN2RCxrREFBSUE7MEJBQ0gsNEVBQUN3RDs4QkFBTTs7Ozs7Ozs7Ozs7MEJBRVQsOERBQUNyRCw4REFBVUE7Z0JBQ1RxRCxPQUFNO2dCQUNOQyxVQUFTO2dCQUNUQyxlQUFlOzs7Ozs7MEJBR2pCLDhEQUFDeEQsbUVBQWVBO2dCQUFDc0IsVUFBVUE7Z0JBQVVFLGNBQWNBO2dCQUFjTyxjQUFjQTs7Ozs7Ozs7Ozs7O0FBR3JGO0dBM0VTNUI7S0FBQUE7QUE2RVQsK0RBQWVBLGVBQWVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvQ3VzdG9tZXJBZGQuanM/MGU1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBBZGRDdXN0b21lckZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9BZGRDdXN0b21lckZvcm0nOyAvLyDXp9eV157XpNeV16DXoNeY15Qg16nXqteZ16bXldeoINec15TXldeh16TXqiDXlNeY15XXpNehXHJcbmltcG9ydCBMaXN0SGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvTGlzdEhlYWRlcic7XHJcbmltcG9ydCBMaXN0Rm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvTGlzdEZvb3Rlcic7XHJcblxyXG5mdW5jdGlvbiBBZGRDdXN0b21lclBhZ2UoKSB7XHJcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XHJcbiAgICBsYXN0X25hbWU6ICcnLFxyXG4gICAgZmlyc3RfbmFtZTogJycsXHJcbiAgICBjb21wYW55X25hbWU6ICcnLFxyXG4gICAgc3RyZWV0OiAnJyxcclxuICAgIGJ1aWxkaW5nX251bWJlcjogJycsXHJcbiAgICBjaXR5OiAnJyxcclxuICAgIGNvdW50cnk6ICcnLFxyXG4gICAgdGVsZXBob25lOiAnJyxcclxuICAgIGNlbGxwaG9uZTogJycsXHJcbiAgICBmYXg6ICcnLFxyXG4gICAgZW1haWw6ICcnLFxyXG4gICAgZ2VuZGVyOiAnJyxcclxuICAgIGNhdGVnb3J5OiAnJyxcclxuICAgIHJlZmVycmFsOiAnJyxcclxuICAgIGlzX2FjdGl2ZTogZmFsc2UsXHJcbiAgICB2YXRfZXhlbXB0OiBmYWxzZSxcclxuICAgIGRlcG9zaXRfZXhlbXB0OiBmYWxzZSxcclxuICAgIG5vdGVzOiAnJ1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUsIHR5cGUsIGNoZWNrZWQgfSA9IGV2ZW50LnRhcmdldDtcclxuICAgIHNldEZvcm1EYXRhKHtcclxuICAgICAgLi4uZm9ybURhdGEsXHJcbiAgICAgIFtuYW1lXTogdHlwZSA9PT0gJ2NoZWNrYm94JyA/IGNoZWNrZWQgOiB2YWx1ZVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAxJztcclxuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7IC8vINen16jXmdeQ15Qg16nXnCDXlNeY15XXp9efINeeLWxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgY29tcGFueV9pZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb21wYW55X2lkJyk7XHJcbiAgICBjb25zdCBicmFuY2hfaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnJhbmNoX2lkJyk7XHJcbiAgICBjb25zdCBhZGRlZF9ieSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2lkJyk7XHJcblxyXG4gICAgY29uc3QgY29tcGxldGVGb3JtRGF0YSA9IHtcclxuICAgICAgLi4uZm9ybURhdGEsXHJcbiAgICAgIGNvbXBhbnlfaWQsXHJcbiAgICAgIGJyYW5jaF9pZCxcclxuICAgICAgYWRkZWRfYnlcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KGAke2FwaVVybH0vYXBpL2N1c3RvbWVyc2AsIGNvbXBsZXRlRm9ybURhdGEsIHtcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMSkge1xyXG4gICAgICAgIHNldE5vdGlmaWNhdGlvbih7IG1lc3NhZ2U6ICfXlNec16fXldeXINeg15XXodejINeR15TXptec15fXlCEnLCB0eXBlOiAnc3VjY2VzcycgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBhZGQgY3VzdG9tZXI6JywgZXJyb3IpO1xyXG4gICAgICBzZXROb3RpZmljYXRpb24oeyBtZXNzYWdlOiAn15TXldeh16TXqiDXlNec16fXldeXINeg15vXqdec15QhJywgdHlwZTogJ2Vycm9yJyB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDx0aXRsZT7XlNeV16HXpNeqINec16fXldeXINeX15PXqTwvdGl0bGU+XHJcbiAgICAgIDwvSGVhZD5cclxuICAgICAgPExpc3RIZWFkZXJcclxuICAgICAgICB0aXRsZT1cIteU15XXodek16og15zXp9eV15cg15fXk9epXCJcclxuICAgICAgICBzdWJ0aXRsZT1cItee15nXnNeV15kg16TXqNeY15kg15TXnNen15XXl1wiXHJcbiAgICAgICAgc2hvd1NlYXJjaEJveD17ZmFsc2V9ICAvLyDXnteV16DXoiDXkNeqINeU16bXkteqINeq15nXkdeqINeU15fXmdek15XXqVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPEFkZEN1c3RvbWVyRm9ybSBmb3JtRGF0YT17Zm9ybURhdGF9IGhhbmRsZUNoYW5nZT17aGFuZGxlQ2hhbmdlfSBoYW5kbGVTdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkZEN1c3RvbWVyUGFnZTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJIZWFkIiwiYXhpb3MiLCJBZGRDdXN0b21lckZvcm0iLCJMaXN0SGVhZGVyIiwiTGlzdEZvb3RlciIsIkFkZEN1c3RvbWVyUGFnZSIsImxhc3RfbmFtZSIsImZpcnN0X25hbWUiLCJjb21wYW55X25hbWUiLCJzdHJlZXQiLCJidWlsZGluZ19udW1iZXIiLCJjaXR5IiwiY291bnRyeSIsInRlbGVwaG9uZSIsImNlbGxwaG9uZSIsImZheCIsImVtYWlsIiwiZ2VuZGVyIiwiY2F0ZWdvcnkiLCJyZWZlcnJhbCIsImlzX2FjdGl2ZSIsInZhdF9leGVtcHQiLCJkZXBvc2l0X2V4ZW1wdCIsIm5vdGVzIiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsImhhbmRsZUNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwidHlwZSIsImNoZWNrZWQiLCJoYW5kbGVTdWJtaXQiLCJhcGlVcmwiLCJ0b2tlbiIsImNvbXBhbnlfaWQiLCJicmFuY2hfaWQiLCJhZGRlZF9ieSIsImNvbXBsZXRlRm9ybURhdGEiLCJyZXNwb25zZSIsImVycm9yIiwicHJldmVudERlZmF1bHQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwb3N0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJzdGF0dXMiLCJzZXROb3RpZmljYXRpb24iLCJtZXNzYWdlIiwiY29uc29sZSIsImRpdiIsInRpdGxlIiwic3VidGl0bGUiLCJzaG93U2VhcmNoQm94Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/CustomerAdd.js\n"));

/***/ })

});