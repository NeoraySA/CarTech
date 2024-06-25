"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/RentalAdd",{

/***/ "./pages/RentalAdd.js":
/*!****************************!*\
  !*** ./pages/RentalAdd.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_AddRentalForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/AddRentalForm */ \"./components/AddRentalForm.js\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ListHeader */ \"./components/ListHeader.js\");\n/* harmony import */ var _components_ModalComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ModalComponent */ \"./components/ModalComponent.js\");\n/* harmony import */ var _components_SearchDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/SearchDetails */ \"./components/SearchDetails.js\");\n/* harmony import */ var _components_CarAvailabilityList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/CarAvailabilityList */ \"./components/CarAvailabilityList.js\");\n/* harmony import */ var _styles_AddForm_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/AddForm.module.css */ \"./styles/AddForm.module.css\");\n/* harmony import */ var _styles_AddForm_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_AddForm_module_css__WEBPACK_IMPORTED_MODULE_9__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst apiUrl = \"http://localhost:3001\" || 0;\nfunction RentalAdd() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [availableCars, setAvailableCars] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [rentalDetails, setRentalDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleRentalSubmit = async (rentalDetails)=>{\n        try {\n            const token = localStorage.getItem(\"token\");\n            if (!token) {\n                throw new Error(\"Missing token in local storage\");\n            }\n            setRentalDetails(rentalDetails);\n            const response = await axios__WEBPACK_IMPORTED_MODULE_10__[\"default\"].post(`${apiUrl}/api/rentals/availability`, rentalDetails, {\n                headers: {\n                    Authorization: `Bearer ${token}`\n                }\n            });\n            setAvailableCars(response.data.cars);\n            setIsModalOpen(true);\n        } catch (error) {\n            console.error(\"Error fetching rental availability:\", error);\n            alert(\"Error fetching rental availability: \" + error.message);\n        }\n    };\n    const handleCarSelection = (selectedCar)=>{\n        setRentalDetails((prevDetails)=>({\n                ...prevDetails,\n                selected_car: selectedCar\n            }));\n        setIsModalOpen(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"הוספת השכרה חדשה\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                    lineNumber: 56,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                title: \"הוספת השכרה חדשה\",\n                subtitle: \"מילוי פרטי השכרה\",\n                showSearchBox: false\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                lineNumber: 58,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_AddForm_module_css__WEBPACK_IMPORTED_MODULE_9___default().container),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_AddForm_module_css__WEBPACK_IMPORTED_MODULE_9___default().formContainer),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AddRentalForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        onSubmit: handleRentalSubmit\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                        lineNumber: 65,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                    lineNumber: 64,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ModalComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                isOpen: isModalOpen,\n                onClose: ()=>setIsModalOpen(false),\n                title: \"בחירת רכב\",\n                children: rentalDetails && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_SearchDetails__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                            startDate: rentalDetails.startDate,\n                            endDate: rentalDetails.endDate,\n                            isNewDriver: rentalDetails.isNewDriver,\n                            isYoungDriver: rentalDetails.isYoungDriver\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                            lineNumber: 71,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CarAvailabilityList__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                            cars: availableCars,\n                            onSelectCar: handleCarSelection\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                            lineNumber: 77,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\RentalAdd.js\",\n        lineNumber: 54,\n        columnNumber: 5\n    }, this);\n}\n_s(RentalAdd, \"HTxZTav0N20ohK3JcrBGlKmBVas=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = RentalAdd;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RentalAdd);\nvar _c;\n$RefreshReg$(_c, \"RentalAdd\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9SZW50YWxBZGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNYO0FBQ0g7QUFDYztBQUNnQjtBQUNOO0FBQ1E7QUFDRjtBQUNZO0FBQ2xCO0FBRWxELE1BQU1XLFNBQVNDLHVCQUErQixJQUFJO0FBRWxELFNBQVNHOztJQUNQLE1BQU1DLFNBQVNaLHNEQUFTQTtJQUN4QixNQUFNLENBQUNhLGFBQWFDLGVBQWUsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ2tCLGVBQWVDLGlCQUFpQixHQUFHbkIsK0NBQVFBLENBQUMsRUFBRTtJQUNyRCxNQUFNLENBQUNvQixlQUFlQyxpQkFBaUIsR0FBR3JCLCtDQUFRQSxDQUFDO0lBRW5ELE1BQU1zQixxQkFBcUIsT0FBT0Y7UUFDaEMsSUFBSTtZQUNGLE1BQU1HLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQztZQUVuQyxJQUFJLENBQUNGLE9BQU87Z0JBQ1YsTUFBTSxJQUFJRyxNQUFNO1lBQ2xCO1lBRUFMLGlCQUFpQkQ7WUFFakIsTUFBTU8sV0FBVyxNQUFNekIsbURBQVUsQ0FBQyxDQUFDLEVBQUVRLE9BQU8seUJBQXlCLENBQUMsRUFBRVUsZUFBZTtnQkFDckZTLFNBQVM7b0JBQ1BDLGVBQWUsQ0FBQyxPQUFPLEVBQUVQLE1BQU0sQ0FBQztnQkFDbEM7WUFDRjtZQUVBSixpQkFBaUJRLFNBQVNJLElBQUksQ0FBQ0MsSUFBSTtZQUNuQ2YsZUFBZTtRQUVqQixFQUFFLE9BQU9nQixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyx1Q0FBdUNBO1lBQ3JERSxNQUFNLHlDQUF5Q0YsTUFBTUcsT0FBTztRQUM5RDtJQUNGO0lBRUEsTUFBTUMscUJBQXFCLENBQUNDO1FBQzFCakIsaUJBQWlCa0IsQ0FBQUEsY0FBZ0I7Z0JBQy9CLEdBQUdBLFdBQVc7Z0JBQ2RDLGNBQWNGO1lBQ2hCO1FBQ0FyQixlQUFlO0lBQ2pCO0lBRUEscUJBQ0UsOERBQUN3Qjs7MEJBQ0MsOERBQUN4QyxrREFBSUE7MEJBQ0gsNEVBQUN5Qzs4QkFBTTs7Ozs7Ozs7Ozs7MEJBRVQsOERBQUNyQyw4REFBVUE7Z0JBQ1RxQyxPQUFNO2dCQUNOQyxVQUFTO2dCQUNUQyxlQUFlOzs7Ozs7MEJBRWpCLDhEQUFDSDtnQkFBSUksV0FBV3BDLDZFQUFnQjswQkFDOUIsNEVBQUNnQztvQkFBSUksV0FBV3BDLGlGQUFvQjs4QkFDbEMsNEVBQUNMLGlFQUFhQTt3QkFBQzRDLFVBQVUxQjs7Ozs7Ozs7Ozs7Ozs7OzswQkFHN0IsOERBQUNoQixrRUFBY0E7Z0JBQUMyQyxRQUFRakM7Z0JBQWFrQyxTQUFTLElBQU1qQyxlQUFlO2dCQUFReUIsT0FBTTswQkFDOUV0QiwrQkFDQzs7c0NBQ0UsOERBQUNiLGlFQUFhQTs0QkFDWjRDLFdBQVcvQixjQUFjK0IsU0FBUzs0QkFDbENDLFNBQVNoQyxjQUFjZ0MsT0FBTzs0QkFDOUJDLGFBQWFqQyxjQUFjaUMsV0FBVzs0QkFDdENDLGVBQWVsQyxjQUFja0MsYUFBYTs7Ozs7O3NDQUU1Qyw4REFBQzlDLHVFQUFtQkE7NEJBQUN3QixNQUFNZDs0QkFBZXFDLGFBQWFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1uRTtHQXJFU3ZCOztRQUNRWCxrREFBU0E7OztLQURqQlc7QUF1RVQsK0RBQWVBLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvUmVudGFsQWRkLmpzPzdlNzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBBZGRSZW50YWxGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvQWRkUmVudGFsRm9ybSc7XHJcbmltcG9ydCBMaXN0SGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvTGlzdEhlYWRlcic7XHJcbmltcG9ydCBNb2RhbENvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcclxuaW1wb3J0IFNlYXJjaERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9TZWFyY2hEZXRhaWxzJztcclxuaW1wb3J0IENhckF2YWlsYWJpbGl0eUxpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9DYXJBdmFpbGFiaWxpdHlMaXN0JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvQWRkRm9ybS5tb2R1bGUuY3NzJztcclxuXHJcbmNvbnN0IGFwaVVybCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMSc7XHJcblxyXG5mdW5jdGlvbiBSZW50YWxBZGQoKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2lzTW9kYWxPcGVuLCBzZXRJc01vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2F2YWlsYWJsZUNhcnMsIHNldEF2YWlsYWJsZUNhcnNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtyZW50YWxEZXRhaWxzLCBzZXRSZW50YWxEZXRhaWxzXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBoYW5kbGVSZW50YWxTdWJtaXQgPSBhc3luYyAocmVudGFsRGV0YWlscykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuXHJcbiAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHRva2VuIGluIGxvY2FsIHN0b3JhZ2VcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFJlbnRhbERldGFpbHMocmVudGFsRGV0YWlscyk7XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoYCR7YXBpVXJsfS9hcGkvcmVudGFscy9hdmFpbGFiaWxpdHlgLCByZW50YWxEZXRhaWxzLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0QXZhaWxhYmxlQ2FycyhyZXNwb25zZS5kYXRhLmNhcnMpO1xyXG4gICAgICBzZXRJc01vZGFsT3Blbih0cnVlKTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyByZW50YWwgYXZhaWxhYmlsaXR5OicsIGVycm9yKTtcclxuICAgICAgYWxlcnQoJ0Vycm9yIGZldGNoaW5nIHJlbnRhbCBhdmFpbGFiaWxpdHk6ICcgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDYXJTZWxlY3Rpb24gPSAoc2VsZWN0ZWRDYXIpID0+IHtcclxuICAgIHNldFJlbnRhbERldGFpbHMocHJldkRldGFpbHMgPT4gKHtcclxuICAgICAgLi4ucHJldkRldGFpbHMsXHJcbiAgICAgIHNlbGVjdGVkX2Nhcjogc2VsZWN0ZWRDYXJcclxuICAgIH0pKTtcclxuICAgIHNldElzTW9kYWxPcGVuKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhlYWQ+XHJcbiAgICAgICAgPHRpdGxlPteU15XXodek16og15TXqdeb16jXlCDXl9eT16nXlDwvdGl0bGU+XHJcbiAgICAgIDwvSGVhZD5cclxuICAgICAgPExpc3RIZWFkZXJcclxuICAgICAgICB0aXRsZT1cIteU15XXodek16og15TXqdeb16jXlCDXl9eT16nXlFwiXHJcbiAgICAgICAgc3VidGl0bGU9XCLXnteZ15zXldeZINek16jXmNeZINeU16nXm9eo15RcIlxyXG4gICAgICAgIHNob3dTZWFyY2hCb3g9e2ZhbHNlfVxyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb3JtQ29udGFpbmVyfT5cclxuICAgICAgICAgIDxBZGRSZW50YWxGb3JtIG9uU3VibWl0PXtoYW5kbGVSZW50YWxTdWJtaXR9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8TW9kYWxDb21wb25lbnQgaXNPcGVuPXtpc01vZGFsT3Blbn0gb25DbG9zZT17KCkgPT4gc2V0SXNNb2RhbE9wZW4oZmFsc2UpfSB0aXRsZT1cIteR15fXmdeo16og16jXm9eRXCI+XHJcbiAgICAgICAge3JlbnRhbERldGFpbHMgJiYgKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAgPFNlYXJjaERldGFpbHMgXHJcbiAgICAgICAgICAgICAgc3RhcnREYXRlPXtyZW50YWxEZXRhaWxzLnN0YXJ0RGF0ZX1cclxuICAgICAgICAgICAgICBlbmREYXRlPXtyZW50YWxEZXRhaWxzLmVuZERhdGV9XHJcbiAgICAgICAgICAgICAgaXNOZXdEcml2ZXI9e3JlbnRhbERldGFpbHMuaXNOZXdEcml2ZXJ9XHJcbiAgICAgICAgICAgICAgaXNZb3VuZ0RyaXZlcj17cmVudGFsRGV0YWlscy5pc1lvdW5nRHJpdmVyfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8Q2FyQXZhaWxhYmlsaXR5TGlzdCBjYXJzPXthdmFpbGFibGVDYXJzfSBvblNlbGVjdENhcj17aGFuZGxlQ2FyU2VsZWN0aW9ufSAvPlxyXG4gICAgICAgICAgPC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9Nb2RhbENvbXBvbmVudD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlbnRhbEFkZDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJIZWFkIiwiYXhpb3MiLCJ1c2VSb3V0ZXIiLCJBZGRSZW50YWxGb3JtIiwiTGlzdEhlYWRlciIsIk1vZGFsQ29tcG9uZW50IiwiU2VhcmNoRGV0YWlscyIsIkNhckF2YWlsYWJpbGl0eUxpc3QiLCJzdHlsZXMiLCJhcGlVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsIlJlbnRhbEFkZCIsInJvdXRlciIsImlzTW9kYWxPcGVuIiwic2V0SXNNb2RhbE9wZW4iLCJhdmFpbGFibGVDYXJzIiwic2V0QXZhaWxhYmxlQ2FycyIsInJlbnRhbERldGFpbHMiLCJzZXRSZW50YWxEZXRhaWxzIiwiaGFuZGxlUmVudGFsU3VibWl0IiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiRXJyb3IiLCJyZXNwb25zZSIsInBvc3QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImRhdGEiLCJjYXJzIiwiZXJyb3IiLCJjb25zb2xlIiwiYWxlcnQiLCJtZXNzYWdlIiwiaGFuZGxlQ2FyU2VsZWN0aW9uIiwic2VsZWN0ZWRDYXIiLCJwcmV2RGV0YWlscyIsInNlbGVjdGVkX2NhciIsImRpdiIsInRpdGxlIiwic3VidGl0bGUiLCJzaG93U2VhcmNoQm94IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiZm9ybUNvbnRhaW5lciIsIm9uU3VibWl0IiwiaXNPcGVuIiwib25DbG9zZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJpc05ld0RyaXZlciIsImlzWW91bmdEcml2ZXIiLCJvblNlbGVjdENhciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/RentalAdd.js\n"));

/***/ })

});