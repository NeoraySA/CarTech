"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/Call/CallList",{

/***/ "./src/translations.js":
/*!*****************************!*\
  !*** ./src/translations.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\nconst labelTranslations = {\n    start_date: \"תאריך איסוף\",\n    fuel_pickup_level_description: \"דלק באיסוף\",\n    km_pickup: 'ק\"מ באיסוף',\n    end_date: \"תאריך החזרה\",\n    estimated_return: \"תאריך החזרה משוער\",\n    fuel_return_level_description: \"דלק בהחזרה\",\n    km_return: 'ק\"מ בהחזרה',\n    totalDays: 'סה\"כ ימים',\n    saturdaysAndHolidays: \"שבתות וחגים\",\n    weekdays: \"ימי חול\",\n    km_limit_per_unit: 'ק\"מ ליחידה',\n    km_units: 'יחידות ק\"מ',\n    total_km_limit: 'סה\"כ ק\"מ',\n    price_per_km: 'מחיר לק\"מ נוסף',\n    totalPrice: \"מחיר כולל\",\n    traffic_fee: \"עמלת כבישי אגרה\",\n    toll_fee: \"עמלת דוחות\",\n    specialRates: \"תעריפים מיוחדים\",\n    rateBreakdown: \"פירוט תעריפים\",\n    rateName: \"שם התעריף\",\n    rateType: \"סוג התעריף\",\n    dailyRate: \"תעריף יומי\",\n    quantity: \"כמות\",\n    vat_percentage: 'אחוז מע\"מ',\n    rate_name: \"שם תעריף\",\n    daily_rate: \"תעריף יומי\",\n    include_saturday_holiday: \"כולל שבת וחג\",\n    include_new_young_driver_on_saturday_holiday: \"תוספת נהג חדש/צעיר בשבתות וחגים\",\n    category_name: \"שם קטגוריה\",\n    description: \"תיאור\",\n    price_per_day: \"תעריף יומי\",\n    saturday_holiday_price: \"תעריף שבת / חג\",\n    extra_km_price: 'מחיר לק\"מ נוסף',\n    new_driver_price_increase: \"תוספת נהג חדש\",\n    young_driver_price_increase: \"תוספת נהג צעיר\",\n    price: \"מחיר\",\n    rate_type_id: \"סוג תעריף\",\n    saturday_km_included: 'ק\"מ בשבת וחג',\n    saturday_regular_charge: \"חיוב רגיל בשבת וחג\",\n    uniqueid: \"מזהה ייחודי\",\n    start: \"התחלה\",\n    end: \"סיום\",\n    duration: \"משך השיחה\",\n    callerid_external: \"מספר מתקשר חיצוני\",\n    callername: \"שם מתקשר\",\n    dnumber_name: \"שם עונה\",\n    recording: \"הקלטה\",\n    server: \"שרת\",\n    invoice: \"חשבונית\",\n    sname: \"שם מתקשר\",\n    snumber_display: \"מזהה מתקשר\",\n    snumber: \"מס' מתקשר\",\n    customer: \"לקוח\",\n    note: \"הערות\",\n    callid: \"מזהה שיחה\",\n    currency: \"מטבע\",\n    channel: \"ערוץ\",\n    media: \"מדיה\",\n    status: \"סטטוס\",\n    status_values: {\n        \"answer\": \"נענה\",\n        \"noanswer\": \"לא נענה\",\n        \"cancel\": \"בוטל\",\n        \"congestion\": \"לא זמין\",\n        \"busy\": \"תפוס\",\n        \"voicemail\": \"דואר קולי\"\n    },\n    stype_values: {\n        \"queue\": \"תור\",\n        \"ivr\": \"נתב שיחות\",\n        \"external\": \"חיצוני\",\n        \"url\": \"קישור\",\n        \"queue_exit\": \"יציאה מתור\"\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (labelTranslations);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHJhbnNsYXRpb25zLmpzIiwibWFwcGluZ3MiOiI7QUFBQSxNQUFNQSxvQkFBb0I7SUFDeEJDLFlBQVk7SUFDWkMsK0JBQStCO0lBQy9CQyxXQUFXO0lBQ1hDLFVBQVU7SUFDVkMsa0JBQWtCO0lBQ2xCQywrQkFBK0I7SUFDL0JDLFdBQVc7SUFDWEMsV0FBVztJQUNYQyxzQkFBc0I7SUFDdEJDLFVBQVU7SUFDVkMsbUJBQW1CO0lBQ25CQyxVQUFVO0lBQ1ZDLGdCQUFnQjtJQUNoQkMsY0FBYztJQUNkQyxZQUFZO0lBQ1pDLGFBQWE7SUFDYkMsVUFBVTtJQUNWQyxjQUFjO0lBQ2RDLGVBQWU7SUFDZkMsVUFBVTtJQUNWQyxVQUFVO0lBQ1ZDLFdBQVc7SUFDWEMsVUFBVTtJQUNWQyxnQkFBZ0I7SUFDaEJDLFdBQVc7SUFDWEMsWUFBWTtJQUNaQywwQkFBMEI7SUFDMUJDLDhDQUE4QztJQUM5Q0MsZUFBZTtJQUNmQyxhQUFhO0lBQ2JDLGVBQWU7SUFDZkMsd0JBQXdCO0lBQ3hCQyxnQkFBZ0I7SUFDaEJDLDJCQUEyQjtJQUMzQkMsNkJBQTZCO0lBQzdCQyxPQUFPO0lBQ1BDLGNBQWM7SUFDZEMsc0JBQXNCO0lBQ3RCQyx5QkFBeUI7SUFFekJDLFVBQVU7SUFDVkMsT0FBTztJQUNQQyxLQUFLO0lBQ0xDLFVBQVU7SUFDVkMsbUJBQW1CO0lBQ25CQyxZQUFZO0lBQ1pDLGNBQWM7SUFDZEMsV0FBVztJQUNYQyxRQUFRO0lBQ1JDLFNBQVM7SUFDVEMsT0FBTztJQUNQQyxpQkFBaUI7SUFDakJDLFNBQVM7SUFDVEMsVUFBVTtJQUNWQyxNQUFNO0lBQ05DLFFBQVE7SUFFUkMsVUFBVTtJQUNWQyxTQUFTO0lBQ1RDLE9BQU87SUFJUEMsUUFBUTtJQUNSQyxlQUFlO1FBQ2IsVUFBVTtRQUNWLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLFFBQVE7UUFDUixhQUFhO0lBRWY7SUFDQUMsY0FBYztRQUNaLFNBQVM7UUFDVCxPQUFPO1FBQ1AsWUFBWTtRQUNaLE9BQU87UUFDUCxjQUFjO0lBQ2hCO0FBQ0Y7QUFFQSwrREFBZTdELGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvdHJhbnNsYXRpb25zLmpzP2RlMzkiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbGFiZWxUcmFuc2xhdGlvbnMgPSB7XHJcbiAgc3RhcnRfZGF0ZTogJ9eq15DXqNeZ15og15DXmdeh15XXoycsXHJcbiAgZnVlbF9waWNrdXBfbGV2ZWxfZGVzY3JpcHRpb246ICfXk9ec16cg15HXkNeZ16HXldejJyxcclxuICBrbV9waWNrdXA6ICfXp1wi154g15HXkNeZ16HXldejJyxcclxuICBlbmRfZGF0ZTogJ9eq15DXqNeZ15og15TXl9eW16jXlCcsXHJcbiAgZXN0aW1hdGVkX3JldHVybjogJ9eq15DXqNeZ15og15TXl9eW16jXlCDXntep15XXoteoJyxcclxuICBmdWVsX3JldHVybl9sZXZlbF9kZXNjcmlwdGlvbjogJ9eT15zXpyDXkdeU15fXlteo15QnLFxyXG4gIGttX3JldHVybjogJ9enXCLXniDXkdeU15fXlteo15QnLFxyXG4gIHRvdGFsRGF5czogJ9eh15RcItebINeZ157XmdedJyxcclxuICBzYXR1cmRheXNBbmRIb2xpZGF5czogJ9ep15HXqteV16og15XXl9eS15nXnScsXHJcbiAgd2Vla2RheXM6ICfXmdee15kg15fXldecJyxcclxuICBrbV9saW1pdF9wZXJfdW5pdDogJ9enXCLXniDXnNeZ15fXmdeT15QnLFxyXG4gIGttX3VuaXRzOiAn15nXl9eZ15PXldeqINenXCLXnicsXHJcbiAgdG90YWxfa21fbGltaXQ6ICfXodeUXCLXmyDXp1wi154nLFxyXG4gIHByaWNlX3Blcl9rbTogJ9ee15fXmdeoINec16dcIteeINeg15XXodejJyxcclxuICB0b3RhbFByaWNlOiAn157Xl9eZ16gg15vXldec15wnLFxyXG4gIHRyYWZmaWNfZmVlOiAn16LXntec16og15vXkdeZ16nXmSDXkNeS16jXlCcsXHJcbiAgdG9sbF9mZWU6ICfXotee15zXqiDXk9eV15fXldeqJyxcclxuICBzcGVjaWFsUmF0ZXM6ICfXqtei16jXmdek15nXnSDXnteZ15XXl9eT15nXnScsXHJcbiAgcmF0ZUJyZWFrZG93bjogJ9ek15nXqNeV15gg16rXoteo15nXpNeZ150nLFxyXG4gIHJhdGVOYW1lOiAn16nXnSDXlNeq16LXqNeZ16MnLFxyXG4gIHJhdGVUeXBlOiAn16HXldeSINeU16rXoteo15nXoycsXHJcbiAgZGFpbHlSYXRlOiAn16rXoteo15nXoyDXmdeV157XmScsXHJcbiAgcXVhbnRpdHk6ICfXm9ee15XXqicsXHJcbiAgdmF0X3BlcmNlbnRhZ2U6ICfXkNeX15XXliDXnteiXCLXnicsXHJcbiAgcmF0ZV9uYW1lOiAn16nXnSDXqtei16jXmdejJyxcclxuICBkYWlseV9yYXRlOiAn16rXoteo15nXoyDXmdeV157XmScsXHJcbiAgaW5jbHVkZV9zYXR1cmRheV9ob2xpZGF5OiAn15vXldec15wg16nXkdeqINeV15fXkicsXHJcbiAgaW5jbHVkZV9uZXdfeW91bmdfZHJpdmVyX29uX3NhdHVyZGF5X2hvbGlkYXk6ICfXqteV16HXpNeqINeg15TXkiDXl9eT16kv16bXoteZ16gg15HXqdeR16rXldeqINeV15fXkteZ150nLFxyXG4gIGNhdGVnb3J5X25hbWU6ICfXqdedINen15jXkteV16jXmdeUJyxcclxuICBkZXNjcmlwdGlvbjogJ9eq15nXkNeV16gnLFxyXG4gIHByaWNlX3Blcl9kYXk6ICfXqtei16jXmdejINeZ15XXnteZJyxcclxuICBzYXR1cmRheV9ob2xpZGF5X3ByaWNlOiAn16rXoteo15nXoyDXqdeR16ogLyDXl9eSJyxcclxuICBleHRyYV9rbV9wcmljZTogJ9ee15fXmdeoINec16dcIteeINeg15XXodejJyxcclxuICBuZXdfZHJpdmVyX3ByaWNlX2luY3JlYXNlOiAn16rXldeh16TXqiDXoNeU15Ig15fXk9epJyxcclxuICB5b3VuZ19kcml2ZXJfcHJpY2VfaW5jcmVhc2U6ICfXqteV16HXpNeqINeg15TXkiDXptei15nXqCcsXHJcbiAgcHJpY2U6ICfXnteX15nXqCcsXHJcbiAgcmF0ZV90eXBlX2lkOiAn16HXldeSINeq16LXqNeZ16MnLFxyXG4gIHNhdHVyZGF5X2ttX2luY2x1ZGVkOiAn16dcIteeINeR16nXkdeqINeV15fXkicsXHJcbiAgc2F0dXJkYXlfcmVndWxhcl9jaGFyZ2U6ICfXl9eZ15XXkSDXqNeS15nXnCDXkdep15HXqiDXldeX15InLFxyXG5cclxuICB1bmlxdWVpZDogJ9ee15bXlNeUINeZ15nXl9eV15PXmScsXHJcbiAgc3RhcnQ6ICfXlNeq15fXnNeUJyxcclxuICBlbmQ6ICfXodeZ15XXnScsXHJcbiAgZHVyYXRpb246ICfXntep15og15TXqdeZ15fXlCcsXHJcbiAgY2FsbGVyaWRfZXh0ZXJuYWw6ICfXnteh16TXqCDXnteq16fXqdeoINeX15nXpteV16DXmScsXHJcbiAgY2FsbGVybmFtZTogJ9ep150g157Xqten16nXqCcsXHJcbiAgZG51bWJlcl9uYW1lOiAn16nXnSDXoteV16DXlCcsXHJcbiAgcmVjb3JkaW5nOiAn15TXp9ec15jXlCcsXHJcbiAgc2VydmVyOiAn16nXqNeqJyxcclxuICBpbnZvaWNlOiAn15fXqdeR15XXoNeZ16onLFxyXG4gIHNuYW1lOiAn16nXnSDXnteq16fXqdeoJyxcclxuICBzbnVtYmVyX2Rpc3BsYXk6ICfXnteW15TXlCDXnteq16fXqdeoJyxcclxuICBzbnVtYmVyOiAn157XoVxcJyDXnteq16fXqdeoJyxcclxuICBjdXN0b21lcjogJ9ec16fXldeXJyxcclxuICBub3RlOiAn15TXoteo15XXqicsXHJcbiAgY2FsbGlkOiAn157XlteU15Qg16nXmdeX15QnLFxyXG5cclxuICBjdXJyZW5jeTogJ9ee15jXkdeiJyxcclxuICBjaGFubmVsOiAn16LXqNeV16UnLFxyXG4gIG1lZGlhOiAn157Xk9eZ15QnLFxyXG5cclxuXHJcblxyXG4gIHN0YXR1czogJ9eh15jXmNeV16EnLFxyXG4gIHN0YXR1c192YWx1ZXM6IHtcclxuICAgICdhbnN3ZXInOiAn16DXoteg15QnLFxyXG4gICAgJ25vYW5zd2VyJzogJ9ec15Ag16DXoteg15QnLFxyXG4gICAgJ2NhbmNlbCc6ICfXkdeV15jXnCcsXHJcbiAgICAnY29uZ2VzdGlvbic6ICfXnNeQINeW157XmdefJyxcclxuICAgICdidXN5JzogJ9eq16TXldehJyxcclxuICAgICd2b2ljZW1haWwnOiAn15PXldeQ16gg16fXldec15knLFxyXG4gICAgLy8g15TXldeh16Mg16LXldeTINeq16jXkteV157XmdedINec16TXmSDXlNem15XXqNeaXHJcbiAgfSxcclxuICBzdHlwZV92YWx1ZXM6IHtcclxuICAgICdxdWV1ZSc6ICfXqteV16gnLFxyXG4gICAgJ2l2cic6ICfXoNeq15Eg16nXmdeX15XXqicsXHJcbiAgICAnZXh0ZXJuYWwnOiAn15fXmdem15XXoNeZJyxcclxuICAgICd1cmwnOiAn16fXmdep15XXqCcsXHJcbiAgICAncXVldWVfZXhpdCc6ICfXmdem15nXkNeUINee16rXldeoJ1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhYmVsVHJhbnNsYXRpb25zO1xyXG4iXSwibmFtZXMiOlsibGFiZWxUcmFuc2xhdGlvbnMiLCJzdGFydF9kYXRlIiwiZnVlbF9waWNrdXBfbGV2ZWxfZGVzY3JpcHRpb24iLCJrbV9waWNrdXAiLCJlbmRfZGF0ZSIsImVzdGltYXRlZF9yZXR1cm4iLCJmdWVsX3JldHVybl9sZXZlbF9kZXNjcmlwdGlvbiIsImttX3JldHVybiIsInRvdGFsRGF5cyIsInNhdHVyZGF5c0FuZEhvbGlkYXlzIiwid2Vla2RheXMiLCJrbV9saW1pdF9wZXJfdW5pdCIsImttX3VuaXRzIiwidG90YWxfa21fbGltaXQiLCJwcmljZV9wZXJfa20iLCJ0b3RhbFByaWNlIiwidHJhZmZpY19mZWUiLCJ0b2xsX2ZlZSIsInNwZWNpYWxSYXRlcyIsInJhdGVCcmVha2Rvd24iLCJyYXRlTmFtZSIsInJhdGVUeXBlIiwiZGFpbHlSYXRlIiwicXVhbnRpdHkiLCJ2YXRfcGVyY2VudGFnZSIsInJhdGVfbmFtZSIsImRhaWx5X3JhdGUiLCJpbmNsdWRlX3NhdHVyZGF5X2hvbGlkYXkiLCJpbmNsdWRlX25ld195b3VuZ19kcml2ZXJfb25fc2F0dXJkYXlfaG9saWRheSIsImNhdGVnb3J5X25hbWUiLCJkZXNjcmlwdGlvbiIsInByaWNlX3Blcl9kYXkiLCJzYXR1cmRheV9ob2xpZGF5X3ByaWNlIiwiZXh0cmFfa21fcHJpY2UiLCJuZXdfZHJpdmVyX3ByaWNlX2luY3JlYXNlIiwieW91bmdfZHJpdmVyX3ByaWNlX2luY3JlYXNlIiwicHJpY2UiLCJyYXRlX3R5cGVfaWQiLCJzYXR1cmRheV9rbV9pbmNsdWRlZCIsInNhdHVyZGF5X3JlZ3VsYXJfY2hhcmdlIiwidW5pcXVlaWQiLCJzdGFydCIsImVuZCIsImR1cmF0aW9uIiwiY2FsbGVyaWRfZXh0ZXJuYWwiLCJjYWxsZXJuYW1lIiwiZG51bWJlcl9uYW1lIiwicmVjb3JkaW5nIiwic2VydmVyIiwiaW52b2ljZSIsInNuYW1lIiwic251bWJlcl9kaXNwbGF5Iiwic251bWJlciIsImN1c3RvbWVyIiwibm90ZSIsImNhbGxpZCIsImN1cnJlbmN5IiwiY2hhbm5lbCIsIm1lZGlhIiwic3RhdHVzIiwic3RhdHVzX3ZhbHVlcyIsInN0eXBlX3ZhbHVlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/translations.js\n"));

/***/ })

});