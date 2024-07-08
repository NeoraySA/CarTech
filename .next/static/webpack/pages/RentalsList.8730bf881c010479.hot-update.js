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

/***/ "./pages/RentalsList.js":
/*!******************************!*\
  !*** ./pages/RentalsList.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var _components_UniversalTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/UniversalTable */ \"./components/UniversalTable.js\");\n/* harmony import */ var _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=FaEdit,FaTrash!=!react-icons/fa */ \"__barrel_optimize__?names=FaEdit,FaTrash!=!./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ListHeader */ \"./components/ListHeader.js\");\n/* harmony import */ var _utils_formatUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/formatUtils */ \"./utils/formatUtils.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n // ייבוא הפונקציות מהקובץ formatUtils\nconst apiUrl = \"http://localhost:3001\" || 0;\nconst RentalsList = ()=>{\n    _s();\n    const [rentals, setRentals] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // הוספת הגדרה של filter ו-setFilter\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchRentals = async ()=>{\n            const token = localStorage.getItem(\"token\");\n            try {\n                const res = await axios__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(`${apiUrl}/api/rentals`, {\n                    headers: {\n                        Authorization: `Bearer ${token}`\n                    }\n                });\n                setRentals(res.data);\n            } catch (error) {\n                console.error(\"Error fetching rentals:\", error);\n                setError(\"Error fetching rentals\");\n            }\n        };\n        fetchRentals();\n    }, []);\n    const clearSearch = ()=>setFilter(\"\");\n    const filteredRentals = filter.trim() ? rentals.filter((rental)=>Object.values(rental).some((value)=>String(value).toLowerCase().includes(filter.toLowerCase()))) : rentals;\n    const columns = [\n        {\n            Header: \"מזהה\",\n            accessor: \"rental_id\"\n        },\n        {\n            Header: \"שם הלקוח\",\n            accessor: \"customer_full_name\"\n        },\n        {\n            Header: \"מס רישוי\",\n            accessor: \"car_license_number\",\n            Cell: ({ value })=>(0,_utils_formatUtils__WEBPACK_IMPORTED_MODULE_5__.formatLicensePlate)(value)\n        },\n        {\n            Header: \"יצרן ודגם\",\n            accessor: \"car_make_model\"\n        },\n        {\n            Header: \"תאריך התחלה\",\n            accessor: \"start_date\",\n            Cell: ({ value })=>(0,_utils_formatUtils__WEBPACK_IMPORTED_MODULE_5__.formatDateTime)(value)\n        },\n        {\n            Header: \"תאריך סיום\",\n            accessor: \"end_date\",\n            Cell: ({ value })=>(0,_utils_formatUtils__WEBPACK_IMPORTED_MODULE_5__.formatDateTime)(value)\n        },\n        {\n            Header: \"סטטוס\",\n            accessor: \"status_name\"\n        },\n        {\n            Header: 'סה\"כ סכום',\n            accessor: \"total_amount\",\n            Cell: ({ value })=>(0,_utils_formatUtils__WEBPACK_IMPORTED_MODULE_5__.formatCurrency)(value)\n        }\n    ];\n    const actionButtons = [\n        {\n            label: \"ערוך\",\n            icon: _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_7__.FaEdit,\n            onClick: (row)=>console.log(\"Edit rental\", row)\n        },\n        {\n            label: \"מחק\",\n            icon: _barrel_optimize_names_FaEdit_FaTrash_react_icons_fa__WEBPACK_IMPORTED_MODULE_7__.FaTrash,\n            onClick: (row)=>console.log(\"Delete rental\", row)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"רשימת השכרות\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                    lineNumber: 68,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                lineNumber: 67,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                title: \"רשימת חוזה השכרה\",\n                subtitle: \"רשימת חוזה השכרה במערכת\",\n                filter: filter,\n                setFilter: setFilter,\n                clearSearch: clearSearch\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                lineNumber: 70,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: error ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: error\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                    lineNumber: 79,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UniversalTable__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    data: filteredRentals,\n                    columns: columns,\n                    actionButtons: actionButtons,\n                    imageAccessor: \"car_image_url\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                    lineNumber: 81,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalsList.js\",\n        lineNumber: 66,\n        columnNumber: 5\n    }, undefined);\n};\n_s(RentalsList, \"WWCDMqe0K44CpoNYXA5l2CqLaO8=\");\n_c = RentalsList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RentalsList);\nvar _c;\n$RefreshReg$(_c, \"RentalsList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O29CQUFDNEIsTUFBTUc7b0JBQWlCVSxTQUFTQTtvQkFBU0ksZUFBZUE7b0JBQWVVLGVBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSy9HO0dBckVNMUM7S0FBQUE7QUF1RU4sK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvUmVudGFsc0xpc3QuanM/NjExMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFVuaXZlcnNhbFRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvVW5pdmVyc2FsVGFibGUnO1xyXG5pbXBvcnQgeyBGYUVkaXQsIEZhVHJhc2ggfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XHJcbmltcG9ydCBMaXN0SGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvTGlzdEhlYWRlcic7XHJcbmltcG9ydCB7XHJcbiAgZm9ybWF0TnVtYmVyLFxyXG4gIGZvcm1hdEN1cnJlbmN5LFxyXG4gIGZvcm1hdERhdGVUaW1lLFxyXG4gIGZvcm1hdERhdGVPbmx5LFxyXG4gIGZvcm1hdExpY2Vuc2VQbGF0ZVxyXG59IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFV0aWxzJzsgLy8g15nXmdeR15XXkCDXlNek15XXoNen16bXmdeV16og157XlNen15XXkdelIGZvcm1hdFV0aWxzXHJcblxyXG5jb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjMwMDEnO1xyXG5cclxuY29uc3QgUmVudGFsc0xpc3QgPSAoKSA9PiB7XHJcbiAgY29uc3QgW3JlbnRhbHMsIHNldFJlbnRhbHNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtmaWx0ZXIsIHNldEZpbHRlcl0gPSB1c2VTdGF0ZShcIlwiKTsgLy8g15TXldeh16TXqiDXlNeS15PXqNeUINep15wgZmlsdGVyINeVLXNldEZpbHRlclxyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFJlbnRhbHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAke2FwaVVybH0vYXBpL3JlbnRhbHNgLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0UmVudGFscyhyZXMuZGF0YSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHJlbnRhbHM6XCIsIGVycm9yKTtcclxuICAgICAgICBzZXRFcnJvcihcIkVycm9yIGZldGNoaW5nIHJlbnRhbHNcIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZmV0Y2hSZW50YWxzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhclNlYXJjaCA9ICgpID0+IHNldEZpbHRlcihcIlwiKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWRSZW50YWxzID0gZmlsdGVyLnRyaW0oKSA/IHJlbnRhbHMuZmlsdGVyKHJlbnRhbCA9PiBcclxuICAgIE9iamVjdC52YWx1ZXMocmVudGFsKS5zb21lKHZhbHVlID0+IFxyXG4gICAgICBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnRvTG93ZXJDYXNlKCkpXHJcbiAgICApXHJcbiAgKSA6IHJlbnRhbHM7XHJcblxyXG4gIGNvbnN0IGNvbHVtbnMgPSBbXHJcbiAgICB7IEhlYWRlcjogJ9ee15bXlNeUJywgYWNjZXNzb3I6ICdyZW50YWxfaWQnIH0sXHJcbiAgICB7IEhlYWRlcjogJ9ep150g15TXnNen15XXlycsIGFjY2Vzc29yOiAnY3VzdG9tZXJfZnVsbF9uYW1lJyB9LFxyXG4gICAgeyBIZWFkZXI6ICfXntehINeo15nXqdeV15knLCBhY2Nlc3NvcjogJ2Nhcl9saWNlbnNlX251bWJlcicsIENlbGw6ICh7IHZhbHVlIH0pID0+IGZvcm1hdExpY2Vuc2VQbGF0ZSh2YWx1ZSkgfSxcclxuICAgIHsgSGVhZGVyOiAn15nXpteo158g15XXk9eS150nLCBhY2Nlc3NvcjogJ2Nhcl9tYWtlX21vZGVsJyB9LFxyXG4gICAgeyBIZWFkZXI6ICfXqteQ16jXmdeaINeU16rXl9ec15QnLCBhY2Nlc3NvcjogJ3N0YXJ0X2RhdGUnLCBDZWxsOiAoeyB2YWx1ZSB9KSA9PiBmb3JtYXREYXRlVGltZSh2YWx1ZSkgfSxcclxuICAgIHsgSGVhZGVyOiAn16rXkNeo15nXmiDXodeZ15XXnScsIGFjY2Vzc29yOiAnZW5kX2RhdGUnLCBDZWxsOiAoeyB2YWx1ZSB9KSA9PiBmb3JtYXREYXRlVGltZSh2YWx1ZSkgfSxcclxuICAgIHsgSGVhZGVyOiAn16HXmNeY15XXoScsIGFjY2Vzc29yOiAnc3RhdHVzX25hbWUnIH0sXHJcbiAgICB7IEhlYWRlcjogJ9eh15RcItebINeh15vXldedJywgYWNjZXNzb3I6ICd0b3RhbF9hbW91bnQnLCBDZWxsOiAoeyB2YWx1ZSB9KSA9PiBmb3JtYXRDdXJyZW5jeSh2YWx1ZSkgfVxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGFjdGlvbkJ1dHRvbnMgPSBbXHJcbiAgICB7IGxhYmVsOiAn16LXqNeV15onLCBpY29uOiBGYUVkaXQsIG9uQ2xpY2s6IChyb3cpID0+IGNvbnNvbGUubG9nKCdFZGl0IHJlbnRhbCcsIHJvdykgfSxcclxuICAgIHsgbGFiZWw6ICfXnteX16cnLCBpY29uOiBGYVRyYXNoLCBvbkNsaWNrOiAocm93KSA9PiBjb25zb2xlLmxvZygnRGVsZXRlIHJlbnRhbCcsIHJvdykgfVxyXG4gIF07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8SGVhZD5cclxuICAgICAgICA8dGl0bGU+16jXqdeZ157XqiDXlNep15vXqNeV16o8L3RpdGxlPlxyXG4gICAgICA8L0hlYWQ+XHJcbiAgICAgIDxMaXN0SGVhZGVyXHJcbiAgICAgICAgdGl0bGU9XCLXqNep15nXnteqINeX15XXlteUINeU16nXm9eo15RcIlxyXG4gICAgICAgIHN1YnRpdGxlPVwi16jXqdeZ157XqiDXl9eV15bXlCDXlNep15vXqNeUINeR157Xoteo15vXqlwiXHJcbiAgICAgICAgZmlsdGVyPXtmaWx0ZXJ9XHJcbiAgICAgICAgc2V0RmlsdGVyPXtzZXRGaWx0ZXJ9XHJcbiAgICAgICAgY2xlYXJTZWFyY2g9e2NsZWFyU2VhcmNofVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtlcnJvciA/IChcclxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxVbml2ZXJzYWxUYWJsZSBkYXRhPXtmaWx0ZXJlZFJlbnRhbHN9IGNvbHVtbnM9e2NvbHVtbnN9IGFjdGlvbkJ1dHRvbnM9e2FjdGlvbkJ1dHRvbnN9IGltYWdlQWNjZXNzb3I9XCJjYXJfaW1hZ2VfdXJsXCIgLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW50YWxzTGlzdDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJIZWFkIiwiYXhpb3MiLCJVbml2ZXJzYWxUYWJsZSIsIkZhRWRpdCIsIkZhVHJhc2giLCJMaXN0SGVhZGVyIiwiZm9ybWF0TnVtYmVyIiwiZm9ybWF0Q3VycmVuY3kiLCJmb3JtYXREYXRlVGltZSIsImZvcm1hdERhdGVPbmx5IiwiZm9ybWF0TGljZW5zZVBsYXRlIiwiYXBpVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJSZW50YWxzTGlzdCIsInJlbnRhbHMiLCJzZXRSZW50YWxzIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiZXJyb3IiLCJzZXRFcnJvciIsImZldGNoUmVudGFscyIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInJlcyIsImdldCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZGF0YSIsImNvbnNvbGUiLCJjbGVhclNlYXJjaCIsImZpbHRlcmVkUmVudGFscyIsInRyaW0iLCJyZW50YWwiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzb21lIiwidmFsdWUiLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiY29sdW1ucyIsIkhlYWRlciIsImFjY2Vzc29yIiwiQ2VsbCIsImFjdGlvbkJ1dHRvbnMiLCJsYWJlbCIsImljb24iLCJvbkNsaWNrIiwicm93IiwibG9nIiwiZGl2IiwidGl0bGUiLCJzdWJ0aXRsZSIsInAiLCJpbWFnZUFjY2Vzc29yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/RentalsList.js\n"));

/***/ })

});