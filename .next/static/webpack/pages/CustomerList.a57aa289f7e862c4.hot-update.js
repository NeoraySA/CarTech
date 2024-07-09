"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/CustomerList",{

/***/ "./pages/CustomerList.js":
/*!*******************************!*\
  !*** ./pages/CustomerList.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_UniversalTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UniversalTable */ \"./components/UniversalTable.js\");\n/* harmony import */ var _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=FaEdit,FaTrash!=!react-icons/fa */ \"__barrel_optimize__?names=FaEdit,FaTrash!=!./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ListHeader */ \"./components/ListHeader.js\");\n/* harmony import */ var _components_FilterComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/FilterComponent */ \"./components/FilterComponent.js\");\n/* harmony import */ var _components_ListFooter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ListFooter */ \"./components/ListFooter.js\");\n/* harmony import */ var _styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/RentalsList.module.css */ \"./styles/RentalsList.module.css\");\n/* harmony import */ var _styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst apiUrl = \"http://localhost:3001\" || 0;\nconst CustomersList = ()=>{\n    _s();\n    const [customers, setCustomers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [filterValues, setFilterValues] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        first_name: {\n            label: \"שם פרטי\",\n            type: \"text\",\n            value: \"\"\n        },\n        last_name: {\n            label: \"שם משפחה\",\n            type: \"text\",\n            value: \"\"\n        },\n        city: {\n            label: \"עיר\",\n            type: \"text\",\n            value: \"\"\n        },\n        country: {\n            label: \"מדינה\",\n            type: \"text\",\n            value: \"\"\n        }\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchCustomers = async ()=>{\n            const token = localStorage.getItem(\"token\");\n            try {\n                const res = await axios__WEBPACK_IMPORTED_MODULE_9__[\"default\"].get(`${apiUrl}/api/customers`, {\n                    headers: {\n                        Authorization: `Bearer ${token}`\n                    }\n                });\n                setCustomers(res.data);\n            } catch (error) {\n                console.error(\"Error fetching customers:\", error);\n                setError(\"Error fetching customers\");\n            }\n        };\n        fetchCustomers();\n    }, []);\n    const clearSearch = ()=>setFilter(\"\");\n    const handleFilterChange = (filters)=>{\n        setFilterValues(filters);\n    };\n    const applyFilters = (data, filters)=>{\n        return data.filter((item)=>{\n            return Object.keys(filters).every((key)=>{\n                if (!filters[key].value) return true;\n                return item[key] && String(item[key]).toLowerCase().includes(filters[key].value.toLowerCase());\n            });\n        });\n    };\n    const filteredCustomers = applyFilters(customers, filterValues);\n    const columns = [\n        {\n            Header: \"שם פרטי\",\n            accessor: \"first_name\"\n        },\n        {\n            Header: \"שם משפחה\",\n            accessor: \"last_name\"\n        },\n        {\n            Header: \"טלפון נייד\",\n            accessor: \"cellphone\"\n        },\n        {\n            Header: 'דוא\"ל',\n            accessor: \"email\"\n        },\n        {\n            Header: \"עיר\",\n            accessor: \"city\"\n        },\n        {\n            Header: \"מדינה\",\n            accessor: \"country\"\n        }\n    ];\n    const actionButtons = [\n        {\n            label: \"הצגה\",\n            icon: _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_10__.FaEdit,\n            onClick: (row)=>{\n                if (row && row.customer_id) {\n                    router.push(`/CustomerDetails/${row.customer_id}`);\n                } else {\n                    console.error(\"Customer ID not found\", row);\n                }\n            }\n        },\n        {\n            label: \"מחק\",\n            icon: _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_10__.FaTrash,\n            onClick: (row)=>console.log(\"Delete customer\", row)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"רשימת לקוחות\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                    lineNumber: 89,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                lineNumber: 88,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default().header),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    title: \"רשימת לקוחות\",\n                    subtitle: \"רשימת הלקוחות במערכת\",\n                    showSearchBox: false\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                    lineNumber: 92,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default().main),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default()[\"filter-container\"]),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_FilterComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            filters: filterValues,\n                            onFilterChange: handleFilterChange\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                            lineNumber: 100,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                        lineNumber: 99,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_RentalsList_module_css__WEBPACK_IMPORTED_MODULE_8___default()[\"table-container\"]),\n                        children: error ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: error\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                            lineNumber: 104,\n                            columnNumber: 13\n                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UniversalTable__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            data: filteredCustomers,\n                            columns: columns,\n                            actionButtons: actionButtons,\n                            expandable: false\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                            lineNumber: 106,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                        lineNumber: 102,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                lineNumber: 98,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListFooter__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                title: 'סה\"כ לקוחות:',\n                content: filteredCustomers.length\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n                lineNumber: 110,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\CustomerList.js\",\n        lineNumber: 87,\n        columnNumber: 5\n    }, undefined);\n};\n_s(CustomersList, \"ucCDVsZeskQ78JWF/o+a50fSMTU=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = CustomersList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CustomersList);\nvar _c;\n$RefreshReg$(_c, \"CustomersList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMseUJBQXlCeUM7Z0JBQ3pDO1lBQ0Y7UUFDRjtRQUNBO1lBQUVuQyxPQUFPO1lBQU9pQyxNQUFNckQsMEZBQU9BO1lBQUVzRCxTQUFTLENBQUNDLE1BQVFwQixRQUFRdUIsR0FBRyxDQUFDLG1CQUFtQkg7UUFBSztLQUN0RjtJQUVELHFCQUNFLDhEQUFDSTtRQUFJQyxXQUFXeEQsaUZBQWdCOzswQkFDOUIsOERBQUNULGtEQUFJQTswQkFDSCw0RUFBQ21FOzhCQUFNOzs7Ozs7Ozs7OzswQkFFVCw4REFBQ0g7Z0JBQUlDLFdBQVd4RCw4RUFBYTswQkFDM0IsNEVBQUNILDhEQUFVQTtvQkFDVDZELE9BQU07b0JBQ05FLFVBQVM7b0JBQ1RDLGVBQWU7Ozs7Ozs7Ozs7OzBCQUduQiw4REFBQ047Z0JBQUlDLFdBQVd4RCw0RUFBVzs7a0NBQ3pCLDhEQUFDdUQ7d0JBQUlDLFdBQVd4RCwyRkFBMEI7a0NBQ3hDLDRFQUFDRixtRUFBZUE7NEJBQUNvQyxTQUFTckI7NEJBQWNrRCxnQkFBZ0I5Qjs7Ozs7Ozs7Ozs7a0NBRTFELDhEQUFDc0I7d0JBQUlDLFdBQVd4RCwwRkFBeUI7a0NBQ3RDVSxzQkFDQyw4REFBQ3NEO3NDQUFHdEQ7Ozs7O3NEQUVKLDhEQUFDaEIsa0VBQWNBOzRCQUFDb0MsTUFBTWM7NEJBQW1CQyxTQUFTQTs0QkFBU0csZUFBZUE7NEJBQWVpQixZQUFZOzs7Ozs7Ozs7Ozs7Ozs7OzswQkFJM0csOERBQUNsRSw4REFBVUE7Z0JBQ1QyRCxPQUFNO2dCQUNOUSxTQUFTdEIsa0JBQWtCdUIsTUFBTTs7Ozs7Ozs7Ozs7O0FBSXpDO0dBdEdNOUQ7O1FBSVdaLGtEQUFTQTs7O0tBSnBCWTtBQXdHTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9DdXN0b21lckxpc3QuanM/YjBiMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgVW5pdmVyc2FsVGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9Vbml2ZXJzYWxUYWJsZSc7XHJcbmltcG9ydCB7IEZhRWRpdCwgRmFUcmFzaCB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcclxuaW1wb3J0IExpc3RIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9MaXN0SGVhZGVyJztcclxuaW1wb3J0IEZpbHRlckNvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudCc7XHJcbmltcG9ydCBMaXN0Rm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvTGlzdEZvb3Rlcic7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL1JlbnRhbHNMaXN0Lm1vZHVsZS5jc3MnO1xyXG5cclxuY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAxJztcclxuXHJcbmNvbnN0IEN1c3RvbWVyc0xpc3QgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2N1c3RvbWVycywgc2V0Q3VzdG9tZXJzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbZmlsdGVyLCBzZXRGaWx0ZXJdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBbZmlsdGVyVmFsdWVzLCBzZXRGaWx0ZXJWYWx1ZXNdID0gdXNlU3RhdGUoe1xyXG4gICAgZmlyc3RfbmFtZTogeyBsYWJlbDogJ9ep150g16TXqNeY15knLCB0eXBlOiAndGV4dCcsIHZhbHVlOiAnJyB9LFxyXG4gICAgbGFzdF9uYW1lOiB7IGxhYmVsOiAn16nXnSDXntep16TXl9eUJywgdHlwZTogJ3RleHQnLCB2YWx1ZTogJycgfSxcclxuICAgIGNpdHk6IHsgbGFiZWw6ICfXoteZ16gnLCB0eXBlOiAndGV4dCcsIHZhbHVlOiAnJyB9LFxyXG4gICAgY291bnRyeTogeyBsYWJlbDogJ9ee15PXmdeg15QnLCB0eXBlOiAndGV4dCcsIHZhbHVlOiAnJyB9LFxyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hDdXN0b21lcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAke2FwaVVybH0vYXBpL2N1c3RvbWVyc2AsIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRDdXN0b21lcnMocmVzLmRhdGEpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBjdXN0b21lcnM6XCIsIGVycm9yKTtcclxuICAgICAgICBzZXRFcnJvcihcIkVycm9yIGZldGNoaW5nIGN1c3RvbWVyc1wiKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaEN1c3RvbWVycygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJTZWFyY2ggPSAoKSA9PiBzZXRGaWx0ZXIoXCJcIik7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUZpbHRlckNoYW5nZSA9IChmaWx0ZXJzKSA9PiB7XHJcbiAgICBzZXRGaWx0ZXJWYWx1ZXMoZmlsdGVycyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYXBwbHlGaWx0ZXJzID0gKGRhdGEsIGZpbHRlcnMpID0+IHtcclxuICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZmlsdGVycykuZXZlcnkoKGtleSkgPT4ge1xyXG4gICAgICAgIGlmICghZmlsdGVyc1trZXldLnZhbHVlKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gaXRlbVtrZXldICYmIFN0cmluZyhpdGVtW2tleV0pLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyc1trZXldLnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkQ3VzdG9tZXJzID0gYXBwbHlGaWx0ZXJzKGN1c3RvbWVycywgZmlsdGVyVmFsdWVzKTtcclxuXHJcbiAgY29uc3QgY29sdW1ucyA9IFtcclxuICAgIHsgSGVhZGVyOiAn16nXnSDXpNeo15jXmScsIGFjY2Vzc29yOiAnZmlyc3RfbmFtZScgfSxcclxuICAgIHsgSGVhZGVyOiAn16nXnSDXntep16TXl9eUJywgYWNjZXNzb3I6ICdsYXN0X25hbWUnIH0sXHJcbiAgICB7IEhlYWRlcjogJ9eY15zXpNeV158g16DXmdeZ15MnLCBhY2Nlc3NvcjogJ2NlbGxwaG9uZScgfSxcclxuICAgIHsgSGVhZGVyOiAn15PXldeQXCLXnCcsIGFjY2Vzc29yOiAnZW1haWwnIH0sXHJcbiAgICB7IEhlYWRlcjogJ9ei15nXqCcsIGFjY2Vzc29yOiAnY2l0eScgfSxcclxuICAgIHsgSGVhZGVyOiAn157Xk9eZ16DXlCcsIGFjY2Vzc29yOiAnY291bnRyeScgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBhY3Rpb25CdXR0b25zID0gW1xyXG4gICAgeyBcclxuICAgICAgbGFiZWw6ICfXlNem15LXlCcsIFxyXG4gICAgICBpY29uOiBGYUVkaXQsIFxyXG4gICAgICBvbkNsaWNrOiAocm93KSA9PiB7XHJcbiAgICAgICAgaWYgKHJvdyAmJiByb3cuY3VzdG9tZXJfaWQpIHtcclxuICAgICAgICAgIHJvdXRlci5wdXNoKGAvQ3VzdG9tZXJEZXRhaWxzLyR7cm93LmN1c3RvbWVyX2lkfWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3VzdG9tZXIgSUQgbm90IGZvdW5kXCIsIHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgeyBsYWJlbDogJ9ee15fXpycsIGljb246IEZhVHJhc2gsIG9uQ2xpY2s6IChyb3cpID0+IGNvbnNvbGUubG9nKCdEZWxldGUgY3VzdG9tZXInLCByb3cpIH1cclxuICBdO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICA8SGVhZD5cclxuICAgICAgICA8dGl0bGU+16jXqdeZ157XqiDXnNen15XXl9eV16o8L3RpdGxlPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaGVhZGVyfT5cclxuICAgICAgICA8TGlzdEhlYWRlclxyXG4gICAgICAgICAgdGl0bGU9XCLXqNep15nXnteqINec16fXldeX15XXqlwiXHJcbiAgICAgICAgICBzdWJ0aXRsZT1cIteo16nXmdee16og15TXnNen15XXl9eV16og15HXntei16jXm9eqXCJcclxuICAgICAgICAgIHNob3dTZWFyY2hCb3g9e2ZhbHNlfSAvLyDXlNeV16HXpNeqIHNob3dTZWFyY2hCb3g9e2ZhbHNlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJmaWx0ZXItY29udGFpbmVyXCJdfT5cclxuICAgICAgICAgIDxGaWx0ZXJDb21wb25lbnQgZmlsdGVycz17ZmlsdGVyVmFsdWVzfSBvbkZpbHRlckNoYW5nZT17aGFuZGxlRmlsdGVyQ2hhbmdlfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbXCJ0YWJsZS1jb250YWluZXJcIl19PlxyXG4gICAgICAgICAge2Vycm9yID8gKFxyXG4gICAgICAgICAgICA8cD57ZXJyb3J9PC9wPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFVuaXZlcnNhbFRhYmxlIGRhdGE9e2ZpbHRlcmVkQ3VzdG9tZXJzfSBjb2x1bW5zPXtjb2x1bW5zfSBhY3Rpb25CdXR0b25zPXthY3Rpb25CdXR0b25zfSBleHBhbmRhYmxlPXtmYWxzZX0gLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8TGlzdEZvb3RlclxyXG4gICAgICAgIHRpdGxlPSfXodeUXCLXmyDXnNen15XXl9eV16o6J1xyXG4gICAgICAgIGNvbnRlbnQ9e2ZpbHRlcmVkQ3VzdG9tZXJzLmxlbmd0aH1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21lcnNMaXN0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkhlYWQiLCJheGlvcyIsInVzZVJvdXRlciIsIlVuaXZlcnNhbFRhYmxlIiwiRmFFZGl0IiwiRmFUcmFzaCIsIkxpc3RIZWFkZXIiLCJGaWx0ZXJDb21wb25lbnQiLCJMaXN0Rm9vdGVyIiwic3R5bGVzIiwiYXBpVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJDdXN0b21lcnNMaXN0IiwiY3VzdG9tZXJzIiwic2V0Q3VzdG9tZXJzIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiZXJyb3IiLCJzZXRFcnJvciIsInJvdXRlciIsImZpbHRlclZhbHVlcyIsInNldEZpbHRlclZhbHVlcyIsImZpcnN0X25hbWUiLCJsYWJlbCIsInR5cGUiLCJ2YWx1ZSIsImxhc3RfbmFtZSIsImNpdHkiLCJjb3VudHJ5IiwiZmV0Y2hDdXN0b21lcnMiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJyZXMiLCJnZXQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImRhdGEiLCJjb25zb2xlIiwiY2xlYXJTZWFyY2giLCJoYW5kbGVGaWx0ZXJDaGFuZ2UiLCJmaWx0ZXJzIiwiYXBwbHlGaWx0ZXJzIiwiaXRlbSIsIk9iamVjdCIsImtleXMiLCJldmVyeSIsImtleSIsIlN0cmluZyIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJmaWx0ZXJlZEN1c3RvbWVycyIsImNvbHVtbnMiLCJIZWFkZXIiLCJhY2Nlc3NvciIsImFjdGlvbkJ1dHRvbnMiLCJpY29uIiwib25DbGljayIsInJvdyIsImN1c3RvbWVyX2lkIiwicHVzaCIsImxvZyIsImRpdiIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsInRpdGxlIiwiaGVhZGVyIiwic3VidGl0bGUiLCJzaG93U2VhcmNoQm94IiwibWFpbiIsIm9uRmlsdGVyQ2hhbmdlIiwicCIsImV4cGFuZGFibGUiLCJjb250ZW50IiwibGVuZ3RoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/CustomerList.js\n"));

/***/ })

});