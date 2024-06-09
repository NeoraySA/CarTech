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

/***/ "./pages/rentals/[id].js":
/*!*******************************!*\
  !*** ./pages/rentals/[id].js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _services_rentalService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/rentalService */ \"./services/rentalService.js\");\n/* harmony import */ var _components_RentalDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/RentalDetails */ \"./components/RentalDetails.js\");\n/* harmony import */ var _components_UniversalTabsComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/UniversalTabsComponent */ \"./components/UniversalTabsComponent.js\");\n/* harmony import */ var _components_DetailsSummaryComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/DetailsSummaryComponent */ \"./components/DetailsSummaryComponent.js\");\n/* harmony import */ var _components_ListHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/ListHeader */ \"./components/ListHeader.js\");\n/* harmony import */ var _components_Notification__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Notification */ \"./components/Notification.js\");\n/* harmony import */ var _components_ModalComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ModalComponent */ \"./components/ModalComponent.js\");\n/* harmony import */ var _components_EditDetailsForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/EditDetailsForm */ \"./components/EditDetailsForm.js\");\n/* harmony import */ var _components_ProcessTracker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/ProcessTracker */ \"./components/ProcessTracker.js\");\n/* harmony import */ var _styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../styles/DetailsPage.module.css */ \"./styles/DetailsPage.module.css\");\n/* harmony import */ var _styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13__);\n\nvar _s = $RefreshSig$();\n\n\n\n // שימוש בשירות שיצרנו\n\n\n\n\n\n\n\n\n\nconst RentalDetailsPage = ()=>{\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { id } = router.query;\n    const [rentalDetails, setRentalDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [notification, setNotification] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        message: \"\",\n        type: \"\",\n        onConfirm: null\n    });\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isEditModalOpen, setIsEditModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [editGroupTitle, setEditGroupTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (id) {\n            setLoading(true);\n            const token = localStorage.getItem(\"token\");\n            (0,_services_rentalService__WEBPACK_IMPORTED_MODULE_4__.fetchRentalDetails)(id, token).then((data)=>{\n                setRentalDetails(data);\n                setLoading(false);\n            }).catch((err)=>{\n                setError(\"Failed to fetch rental details\");\n                setLoading(false);\n            });\n        }\n    }, [\n        id\n    ]);\n    const openEditModal = (groupTitle)=>{\n        setEditGroupTitle(groupTitle);\n        setIsEditModalOpen(true);\n    };\n    const closeEditModal = ()=>{\n        setIsEditModalOpen(false);\n        setEditGroupTitle(\"\");\n    };\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n        lineNumber: 51,\n        columnNumber: 23\n    }, undefined);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            \"Error: \",\n            error\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n        lineNumber: 52,\n        columnNumber: 21\n    }, undefined);\n    if (!id) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"טוען...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n        lineNumber: 53,\n        columnNumber: 19\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"חוזה השכרה\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                    lineNumber: 58,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Notification__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                message: notification.message,\n                type: notification.type,\n                onClose: ()=>setNotification({\n                        message: \"\",\n                        type: \"\",\n                        onConfirm: null\n                    }),\n                onConfirm: notification.onConfirm\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ListHeader__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                title: \"חוזה השכרה\",\n                subtitle: \"צפיה בחוזה ההשכרה\",\n                showSearchBox: false\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13___default().container),\n                children: rentalDetails && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13___default().formContainer),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_RentalDetails__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    rentalId: id,\n                                    rentalDetails: rentalDetails,\n                                    setRentalDetails: setRentalDetails\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                                    lineNumber: 76,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13___default().section),\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UniversalTabsComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                        rentalDetails: rentalDetails,\n                                        customerId: rentalDetails.rental.customer_id\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                                        lineNumber: 78,\n                                        columnNumber: 17\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                                    lineNumber: 77,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                            lineNumber: 75,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_styles_DetailsPage_module_css__WEBPACK_IMPORTED_MODULE_13___default().summaryContainer),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ProcessTracker__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                                    steps: steps,\n                                    currentStep: currentStep - 1\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                                    lineNumber: 82,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_DetailsSummaryComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                    summaryData: rentalDetails.rental,\n                                    summaryGroups: summaryGroups,\n                                    onEdit: openEditModal\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                                    lineNumber: 83,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                            lineNumber: 81,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                lineNumber: 72,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ModalComponent__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                isOpen: isEditModalOpen,\n                onClose: closeEditModal,\n                title: `ערוך ${editGroupTitle}`,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_EditDetailsForm__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n                    rentalDetails: rentalDetails?.rental,\n                    groupTitle: editGroupTitle,\n                    onClose: closeEditModal,\n                    onSave: setRentalDetails,\n                    summaryGroups: SummaryGroups\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                    lineNumber: 97,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n                lineNumber: 92,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\rentals\\\\[id].js\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, undefined);\n};\n_s(RentalDetailsPage, \"QxVXUOVwo3Btsp1ARsE46c1hZho=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = RentalDetailsPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RentalDetailsPage);\nvar _c;\n$RefreshReg$(_c, \"RentalDetailsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGNBQWNvQyxNQUFNO29DQUNqQ00sZUFBZUE7b0NBQ2ZDLFFBQVFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFNbEIsOERBQUM5QixtRUFBY0E7Z0JBQ2JvRCxRQUFRakM7Z0JBQ1JnQixTQUFTSDtnQkFDVEUsT0FBTyxDQUFDLEtBQUssRUFBRWIsZUFBZSxDQUFDOzBCQUUvQiw0RUFBQ3BCLG9FQUFlQTtvQkFDZE8sZUFBZUEsZUFBZW9DO29CQUM5QmIsWUFBWVY7b0JBQ1pjLFNBQVNIO29CQUNUcUIsUUFBUTVDO29CQUNSeUMsZUFBZUk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3pCO0dBNUZNbEQ7O1FBQ1daLGtEQUFTQTs7O0tBRHBCWTtBQThGTiwrREFBZUEsaUJBQWlCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3JlbnRhbHMvW2lkXS5qcz83ZWZkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XHJcbmltcG9ydCB7IGZldGNoUmVudGFsRGV0YWlscyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlbnRhbFNlcnZpY2UnOyAvLyDXqdeZ157XldepINeR16nXmdeo15XXqiDXqdeZ16bXqNeg15VcclxuaW1wb3J0IFJlbnRhbERldGFpbHNGb3JtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUmVudGFsRGV0YWlscyc7XHJcbmltcG9ydCBVbml2ZXJzYWxUYWJzQ29tcG9uZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVW5pdmVyc2FsVGFic0NvbXBvbmVudCc7XHJcbmltcG9ydCBEZXRhaWxzU3VtbWFyeUNvbXBvbmVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RldGFpbHNTdW1tYXJ5Q29tcG9uZW50JztcclxuaW1wb3J0IExpc3RIZWFkZXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9MaXN0SGVhZGVyJztcclxuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL05vdGlmaWNhdGlvbic7XHJcbmltcG9ydCBNb2RhbENvbXBvbmVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL01vZGFsQ29tcG9uZW50JztcclxuaW1wb3J0IEVkaXREZXRhaWxzRm9ybSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0VkaXREZXRhaWxzRm9ybSc7XHJcbmltcG9ydCBQcm9jZXNzVHJhY2tlciBmcm9tICcuLi8uLi9jb21wb25lbnRzL1Byb2Nlc3NUcmFja2VyJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi9zdHlsZXMvRGV0YWlsc1BhZ2UubW9kdWxlLmNzcyc7XHJcblxyXG5jb25zdCBSZW50YWxEZXRhaWxzUGFnZSA9ICgpID0+IHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCB7IGlkIH0gPSByb3V0ZXIucXVlcnk7XHJcbiAgY29uc3QgW3JlbnRhbERldGFpbHMsIHNldFJlbnRhbERldGFpbHNdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW25vdGlmaWNhdGlvbiwgc2V0Tm90aWZpY2F0aW9uXSA9IHVzZVN0YXRlKHsgbWVzc2FnZTogJycsIHR5cGU6ICcnLCBvbkNvbmZpcm06IG51bGwgfSk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2lzRWRpdE1vZGFsT3Blbiwgc2V0SXNFZGl0TW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZWRpdEdyb3VwVGl0bGUsIHNldEVkaXRHcm91cFRpdGxlXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpZCkge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgICBmZXRjaFJlbnRhbERldGFpbHMoaWQsIHRva2VuKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgc2V0UmVudGFsRGV0YWlscyhkYXRhKTtcclxuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGZldGNoIHJlbnRhbCBkZXRhaWxzJyk7XHJcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9LCBbaWRdKTtcclxuXHJcbiAgY29uc3Qgb3BlbkVkaXRNb2RhbCA9IChncm91cFRpdGxlKSA9PiB7XHJcbiAgICBzZXRFZGl0R3JvdXBUaXRsZShncm91cFRpdGxlKTtcclxuICAgIHNldElzRWRpdE1vZGFsT3Blbih0cnVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjbG9zZUVkaXRNb2RhbCA9ICgpID0+IHtcclxuICAgIHNldElzRWRpdE1vZGFsT3BlbihmYWxzZSk7XHJcbiAgICBzZXRFZGl0R3JvdXBUaXRsZSgnJyk7XHJcbiAgfTtcclxuXHJcbiAgaWYgKGxvYWRpbmcpIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XHJcbiAgaWYgKGVycm9yKSByZXR1cm4gPGRpdj5FcnJvcjoge2Vycm9yfTwvZGl2PjtcclxuICBpZiAoIWlkKSByZXR1cm4gPGRpdj7XmNeV16LXny4uLjwvZGl2PjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDx0aXRsZT7Xl9eV15bXlCDXlNep15vXqNeUPC90aXRsZT5cclxuICAgICAgPC9IZWFkPlxyXG4gICAgICA8Tm90aWZpY2F0aW9uXHJcbiAgICAgICAgbWVzc2FnZT17bm90aWZpY2F0aW9uLm1lc3NhZ2V9XHJcbiAgICAgICAgdHlwZT17bm90aWZpY2F0aW9uLnR5cGV9XHJcbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0Tm90aWZpY2F0aW9uKHsgbWVzc2FnZTogJycsIHR5cGU6ICcnLCBvbkNvbmZpcm06IG51bGwgfSl9XHJcbiAgICAgICAgb25Db25maXJtPXtub3RpZmljYXRpb24ub25Db25maXJtfVxyXG4gICAgICAvPlxyXG4gICAgICA8TGlzdEhlYWRlclxyXG4gICAgICAgIHRpdGxlPVwi15fXldeW15Qg15TXqdeb16jXlFwiXHJcbiAgICAgICAgc3VidGl0bGU9XCLXptek15nXlCDXkdeX15XXlteUINeU15TXqdeb16jXlFwiXHJcbiAgICAgICAgc2hvd1NlYXJjaEJveD17ZmFsc2V9XHJcbiAgICAgIC8+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgICAge3JlbnRhbERldGFpbHMgJiYgKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5mb3JtQ29udGFpbmVyfT5cclxuICAgICAgICAgICAgICA8UmVudGFsRGV0YWlsc0Zvcm0gcmVudGFsSWQ9e2lkfSByZW50YWxEZXRhaWxzPXtyZW50YWxEZXRhaWxzfSBzZXRSZW50YWxEZXRhaWxzPXtzZXRSZW50YWxEZXRhaWxzfSAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc2VjdGlvbn0+XHJcbiAgICAgICAgICAgICAgICA8VW5pdmVyc2FsVGFic0NvbXBvbmVudCByZW50YWxEZXRhaWxzPXtyZW50YWxEZXRhaWxzfSBjdXN0b21lcklkPXtyZW50YWxEZXRhaWxzLnJlbnRhbC5jdXN0b21lcl9pZH0gLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc3VtbWFyeUNvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgPFByb2Nlc3NUcmFja2VyIHN0ZXBzPXtzdGVwc30gY3VycmVudFN0ZXA9e2N1cnJlbnRTdGVwIC0gMX0gLz5cclxuICAgICAgICAgICAgICA8RGV0YWlsc1N1bW1hcnlDb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHN1bW1hcnlEYXRhPXtyZW50YWxEZXRhaWxzLnJlbnRhbH1cclxuICAgICAgICAgICAgICAgIHN1bW1hcnlHcm91cHM9e3N1bW1hcnlHcm91cHN9XHJcbiAgICAgICAgICAgICAgICBvbkVkaXQ9e29wZW5FZGl0TW9kYWx9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPE1vZGFsQ29tcG9uZW50XHJcbiAgICAgICAgaXNPcGVuPXtpc0VkaXRNb2RhbE9wZW59XHJcbiAgICAgICAgb25DbG9zZT17Y2xvc2VFZGl0TW9kYWx9XHJcbiAgICAgICAgdGl0bGU9e2DXoteo15XXmiAke2VkaXRHcm91cFRpdGxlfWB9XHJcbiAgICAgID5cclxuICAgICAgICA8RWRpdERldGFpbHNGb3JtXHJcbiAgICAgICAgICByZW50YWxEZXRhaWxzPXtyZW50YWxEZXRhaWxzPy5yZW50YWx9XHJcbiAgICAgICAgICBncm91cFRpdGxlPXtlZGl0R3JvdXBUaXRsZX1cclxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlRWRpdE1vZGFsfVxyXG4gICAgICAgICAgb25TYXZlPXtzZXRSZW50YWxEZXRhaWxzfVxyXG4gICAgICAgICAgc3VtbWFyeUdyb3Vwcz17U3VtbWFyeUdyb3Vwc31cclxuICAgICAgICAvPlxyXG4gICAgICA8L01vZGFsQ29tcG9uZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlbnRhbERldGFpbHNQYWdlO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIkhlYWQiLCJmZXRjaFJlbnRhbERldGFpbHMiLCJSZW50YWxEZXRhaWxzRm9ybSIsIlVuaXZlcnNhbFRhYnNDb21wb25lbnQiLCJEZXRhaWxzU3VtbWFyeUNvbXBvbmVudCIsIkxpc3RIZWFkZXIiLCJOb3RpZmljYXRpb24iLCJNb2RhbENvbXBvbmVudCIsIkVkaXREZXRhaWxzRm9ybSIsIlByb2Nlc3NUcmFja2VyIiwic3R5bGVzIiwiUmVudGFsRGV0YWlsc1BhZ2UiLCJyb3V0ZXIiLCJpZCIsInF1ZXJ5IiwicmVudGFsRGV0YWlscyIsInNldFJlbnRhbERldGFpbHMiLCJub3RpZmljYXRpb24iLCJzZXROb3RpZmljYXRpb24iLCJtZXNzYWdlIiwidHlwZSIsIm9uQ29uZmlybSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsImlzRWRpdE1vZGFsT3BlbiIsInNldElzRWRpdE1vZGFsT3BlbiIsImVkaXRHcm91cFRpdGxlIiwic2V0RWRpdEdyb3VwVGl0bGUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0aGVuIiwiZGF0YSIsImNhdGNoIiwiZXJyIiwib3BlbkVkaXRNb2RhbCIsImdyb3VwVGl0bGUiLCJjbG9zZUVkaXRNb2RhbCIsImRpdiIsInRpdGxlIiwib25DbG9zZSIsInN1YnRpdGxlIiwic2hvd1NlYXJjaEJveCIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImZvcm1Db250YWluZXIiLCJyZW50YWxJZCIsInNlY3Rpb24iLCJjdXN0b21lcklkIiwicmVudGFsIiwiY3VzdG9tZXJfaWQiLCJzdW1tYXJ5Q29udGFpbmVyIiwic3RlcHMiLCJjdXJyZW50U3RlcCIsInN1bW1hcnlEYXRhIiwic3VtbWFyeUdyb3VwcyIsIm9uRWRpdCIsImlzT3BlbiIsIm9uU2F2ZSIsIlN1bW1hcnlHcm91cHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/rentals/[id].js\n"));

/***/ })

});