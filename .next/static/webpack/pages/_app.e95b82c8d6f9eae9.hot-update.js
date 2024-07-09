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

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ \"./components/Header.js\");\n/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Footer */ \"./components/Footer.js\");\n/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Sidebar */ \"./components/Sidebar.js\");\n/* harmony import */ var _components_Notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Notification */ \"./components/Notification.js\");\n/* harmony import */ var _context_SettingsContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/SettingsContext */ \"./context/SettingsContext.js\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/index.css */ \"./styles/index.css\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_index_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _styles_Header_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/Header.css */ \"./styles/Header.css\");\n/* harmony import */ var _styles_Header_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_Header_css__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _styles_Footer_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/Footer.css */ \"./styles/Footer.css\");\n/* harmony import */ var _styles_Footer_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_Footer_css__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _styles_Sidebar_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/Sidebar.css */ \"./styles/Sidebar.css\");\n/* harmony import */ var _styles_Sidebar_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_Sidebar_css__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/App.css */ \"./styles/App.css\");\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_App_css__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _styles_CarsList_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../styles/CarsList.css */ \"./styles/CarsList.css\");\n/* harmony import */ var _styles_CarsList_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_styles_CarsList_css__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _styles_CarTable_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../styles/CarTable.css */ \"./styles/CarTable.css\");\n/* harmony import */ var _styles_CarTable_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_CarTable_css__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _styles_ListFooter_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../styles/ListFooter.css */ \"./styles/ListFooter.css\");\n/* harmony import */ var _styles_ListFooter_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_styles_ListFooter_css__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _styles_Dashboard_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../styles/Dashboard.css */ \"./styles/Dashboard.css\");\n/* harmony import */ var _styles_Dashboard_css__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_styles_Dashboard_css__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _styles_ListHeader_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../styles/ListHeader.css */ \"./styles/ListHeader.css\");\n/* harmony import */ var _styles_ListHeader_css__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_styles_ListHeader_css__WEBPACK_IMPORTED_MODULE_17__);\n// pages/_app.js\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n // Import the SettingsProvider\n\n\n\n\n\n\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [isSidebarOpen, setIsSidebarOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const companyId = 1; // Define companyId\n    const branchId = 1; // Define branchId\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const token = localStorage.getItem(\"token\");\n        if (!token && router.pathname !== \"/Login\") {\n            router.push(\"/Login\");\n        }\n        const handleStart = (url)=>{\n            if (url !== router.pathname) {\n                setLoading(true);\n            }\n        };\n        const handleComplete = ()=>{\n            setLoading(false);\n        };\n        router.events.on(\"routeChangeStart\", handleStart);\n        router.events.on(\"routeChangeComplete\", handleComplete);\n        router.events.on(\"routeChangeError\", handleComplete);\n        return ()=>{\n            router.events.off(\"routeChangeStart\", handleStart);\n            router.events.off(\"routeChangeComplete\", handleComplete);\n            router.events.off(\"routeChangeError\", handleComplete);\n        };\n    }, [\n        router\n    ]);\n    const toggleSidebar = ()=>setIsSidebarOpen(!isSidebarOpen);\n    const toggleMobileMenu = ()=>setIsMobileMenuOpen(!isMobileMenuOpen);\n    const showMenus = router.pathname !== \"/Login\";\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_SettingsContext__WEBPACK_IMPORTED_MODULE_7__.SettingsProvider, {\n        companyId: companyId,\n        branchId: branchId,\n        children: [\n            showMenus && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        toggleSidebar: toggleSidebar,\n                        toggleMobileMenu: toggleMobileMenu\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                        lineNumber: 65,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Sidebar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        isSidebarOpen: isSidebarOpen,\n                        toggleSidebar: toggleSidebar\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                        lineNumber: 66,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: `content ${isMobileMenuOpen ? \"mobile-menu-open\" : \"\"}`,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                    lineNumber: 70,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                lineNumber: 69,\n                columnNumber: 7\n            }, this),\n            showMenus && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Footer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                lineNumber: 72,\n                columnNumber: 21\n            }, this),\n            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Notification__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                message: \"טוען...\",\n                type: \"info\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n                lineNumber: 73,\n                columnNumber: 19\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\USER\\\\Documents\\\\פרוייקטים\\\\CarTech\\\\pages\\\\_app.js\",\n        lineNumber: 62,\n        columnNumber: 5\n    }, this);\n}\n_s(MyApp, \"elbIPlGqoZAodc/xBD6ifyaklzE=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = MyApp;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);\nvar _c;\n$RefreshReg$(_c, \"MyApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCOzs7QUFDbUM7QUFDWDtBQUNFO0FBQ0E7QUFDRTtBQUNVO0FBQ1EsQ0FBQyw4QkFBOEI7QUFFaEU7QUFDQztBQUNBO0FBQ0M7QUFDSjtBQUNLO0FBQ0E7QUFDRTtBQUNEO0FBQ0M7QUFFbEMsU0FBU1MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTs7SUFDckMsTUFBTUMsU0FBU1Qsc0RBQVNBO0lBQ3hCLE1BQU0sQ0FBQ1UsZUFBZUMsaUJBQWlCLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ25ELE1BQU0sQ0FBQ2Esa0JBQWtCQyxvQkFBb0IsR0FBR2QsK0NBQVFBLENBQUM7SUFDekQsTUFBTSxDQUFDZSxTQUFTQyxXQUFXLEdBQUdoQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNaUIsWUFBWSxHQUFHLG1CQUFtQjtJQUN4QyxNQUFNQyxXQUFXLEdBQUcsa0JBQWtCO0lBRXRDbkIsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0IsUUFBUUMsYUFBYUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQ0YsU0FBU1QsT0FBT1ksUUFBUSxLQUFLLFVBQVU7WUFDMUNaLE9BQU9hLElBQUksQ0FBQztRQUNkO1FBRUEsTUFBTUMsY0FBYyxDQUFDQztZQUNuQixJQUFJQSxRQUFRZixPQUFPWSxRQUFRLEVBQUU7Z0JBQzNCTixXQUFXO1lBQ2I7UUFDRjtRQUVBLE1BQU1VLGlCQUFpQjtZQUNyQlYsV0FBVztRQUNiO1FBRUFOLE9BQU9pQixNQUFNLENBQUNDLEVBQUUsQ0FBQyxvQkFBb0JKO1FBQ3JDZCxPQUFPaUIsTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCRjtRQUN4Q2hCLE9BQU9pQixNQUFNLENBQUNDLEVBQUUsQ0FBQyxvQkFBb0JGO1FBRXJDLE9BQU87WUFDTGhCLE9BQU9pQixNQUFNLENBQUNFLEdBQUcsQ0FBQyxvQkFBb0JMO1lBQ3RDZCxPQUFPaUIsTUFBTSxDQUFDRSxHQUFHLENBQUMsdUJBQXVCSDtZQUN6Q2hCLE9BQU9pQixNQUFNLENBQUNFLEdBQUcsQ0FBQyxvQkFBb0JIO1FBQ3hDO0lBQ0YsR0FBRztRQUFDaEI7S0FBTztJQUVYLE1BQU1vQixnQkFBZ0IsSUFBTWxCLGlCQUFpQixDQUFDRDtJQUM5QyxNQUFNb0IsbUJBQW1CLElBQU1qQixvQkFBb0IsQ0FBQ0Q7SUFFcEQsTUFBTW1CLFlBQVl0QixPQUFPWSxRQUFRLEtBQUs7SUFFdEMscUJBQ0UsOERBQUNoQixzRUFBZ0JBO1FBQUNXLFdBQVdBO1FBQVdDLFVBQVVBOztZQUMvQ2MsMkJBQ0M7O2tDQUNFLDhEQUFDOUIsMERBQU1BO3dCQUFDNEIsZUFBZUE7d0JBQWVDLGtCQUFrQkE7Ozs7OztrQ0FDeEQsOERBQUMzQiwyREFBT0E7d0JBQUNPLGVBQWVBO3dCQUFlbUIsZUFBZUE7Ozs7Ozs7OzBCQUcxRCw4REFBQ0c7Z0JBQUlDLFdBQVcsQ0FBQyxRQUFRLEVBQUVyQixtQkFBbUIscUJBQXFCLEdBQUcsQ0FBQzswQkFDckUsNEVBQUNMO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O1lBRXpCdUIsMkJBQWEsOERBQUM3QiwwREFBTUE7Ozs7O1lBQ3BCWSx5QkFBVyw4REFBQ1YsZ0VBQVlBO2dCQUFDOEIsU0FBUTtnQkFBVUMsTUFBSzs7Ozs7Ozs7Ozs7O0FBR3ZEO0dBdkRTN0I7O1FBQ1FOLGtEQUFTQTs7O0tBRGpCTTtBQXlEVCwrREFBZUEsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvX2FwcC5qc1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyJztcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlcic7XHJcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4uL2NvbXBvbmVudHMvU2lkZWJhcic7XHJcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9Ob3RpZmljYXRpb24nO1xyXG5pbXBvcnQgeyBTZXR0aW5nc1Byb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9TZXR0aW5nc0NvbnRleHQnOyAvLyBJbXBvcnQgdGhlIFNldHRpbmdzUHJvdmlkZXJcclxuXHJcbmltcG9ydCAnLi4vc3R5bGVzL2luZGV4LmNzcyc7XHJcbmltcG9ydCAnLi4vc3R5bGVzL0hlYWRlci5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9Gb290ZXIuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvU2lkZWJhci5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9BcHAuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvQ2Fyc0xpc3QuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvQ2FyVGFibGUuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvTGlzdEZvb3Rlci5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9EYXNoYm9hcmQuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvTGlzdEhlYWRlci5jc3MnO1xyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2lzU2lkZWJhck9wZW4sIHNldElzU2lkZWJhck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc01vYmlsZU1lbnVPcGVuLCBzZXRJc01vYmlsZU1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgY29tcGFueUlkID0gMTsgLy8gRGVmaW5lIGNvbXBhbnlJZFxyXG4gIGNvbnN0IGJyYW5jaElkID0gMTsgLy8gRGVmaW5lIGJyYW5jaElkXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKCF0b2tlbiAmJiByb3V0ZXIucGF0aG5hbWUgIT09ICcvTG9naW4nKSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvTG9naW4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVTdGFydCA9ICh1cmwpID0+IHtcclxuICAgICAgaWYgKHVybCAhPT0gcm91dGVyLnBhdGhuYW1lKSB7XHJcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDb21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJvdXRlci5ldmVudHMub24oJ3JvdXRlQ2hhbmdlU3RhcnQnLCBoYW5kbGVTdGFydCk7XHJcbiAgICByb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgaGFuZGxlQ29tcGxldGUpO1xyXG4gICAgcm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsIGhhbmRsZUNvbXBsZXRlKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZigncm91dGVDaGFuZ2VTdGFydCcsIGhhbmRsZVN0YXJ0KTtcclxuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBoYW5kbGVDb21wbGV0ZSk7XHJcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKCdyb3V0ZUNoYW5nZUVycm9yJywgaGFuZGxlQ29tcGxldGUpO1xyXG4gICAgfTtcclxuICB9LCBbcm91dGVyXSk7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZVNpZGViYXIgPSAoKSA9PiBzZXRJc1NpZGViYXJPcGVuKCFpc1NpZGViYXJPcGVuKTtcclxuICBjb25zdCB0b2dnbGVNb2JpbGVNZW51ID0gKCkgPT4gc2V0SXNNb2JpbGVNZW51T3BlbighaXNNb2JpbGVNZW51T3Blbik7XHJcblxyXG4gIGNvbnN0IHNob3dNZW51cyA9IHJvdXRlci5wYXRobmFtZSAhPT0gJy9Mb2dpbic7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8U2V0dGluZ3NQcm92aWRlciBjb21wYW55SWQ9e2NvbXBhbnlJZH0gYnJhbmNoSWQ9e2JyYW5jaElkfT5cclxuICAgICAge3Nob3dNZW51cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIZWFkZXIgdG9nZ2xlU2lkZWJhcj17dG9nZ2xlU2lkZWJhcn0gdG9nZ2xlTW9iaWxlTWVudT17dG9nZ2xlTW9iaWxlTWVudX0gLz5cclxuICAgICAgICAgIDxTaWRlYmFyIGlzU2lkZWJhck9wZW49e2lzU2lkZWJhck9wZW59IHRvZ2dsZVNpZGViYXI9e3RvZ2dsZVNpZGViYXJ9IC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGVudCAke2lzTW9iaWxlTWVudU9wZW4gPyAnbW9iaWxlLW1lbnUtb3BlbicgOiAnJ31gfT5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7c2hvd01lbnVzICYmIDxGb290ZXIgLz59XHJcbiAgICAgIHtsb2FkaW5nICYmIDxOb3RpZmljYXRpb24gbWVzc2FnZT1cIteY15XXotefLi4uXCIgdHlwZT1cImluZm9cIiAvPn1cclxuICAgIDwvU2V0dGluZ3NQcm92aWRlcj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJIZWFkZXIiLCJGb290ZXIiLCJTaWRlYmFyIiwiTm90aWZpY2F0aW9uIiwiU2V0dGluZ3NQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiaXNTaWRlYmFyT3BlbiIsInNldElzU2lkZWJhck9wZW4iLCJpc01vYmlsZU1lbnVPcGVuIiwic2V0SXNNb2JpbGVNZW51T3BlbiIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiY29tcGFueUlkIiwiYnJhbmNoSWQiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXRobmFtZSIsInB1c2giLCJoYW5kbGVTdGFydCIsInVybCIsImhhbmRsZUNvbXBsZXRlIiwiZXZlbnRzIiwib24iLCJvZmYiLCJ0b2dnbGVTaWRlYmFyIiwidG9nZ2xlTW9iaWxlTWVudSIsInNob3dNZW51cyIsImRpdiIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJ0eXBlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n"));

/***/ })

});