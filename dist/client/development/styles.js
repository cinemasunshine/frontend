(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/lib/loader.js?!./src/styles.scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/hataguchi/Desktop/workspace/Cinema Sunshine/frontend/node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!C:/Users/hataguchi/Desktop/workspace/Cinema Sunshine/frontend/node_modules/postcss-loader/src??embedded!C:/Users/hataguchi/Desktop/workspace/Cinema Sunshine/frontend/node_modules/sass-loader/lib/loader.js??ref--14-3!./src/styles.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "@charset \"UTF-8\";\nhtml, body, div, span, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code,\ndel, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var,\nb, i,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline; }\nbody {\n  line-height: 1; }\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\na {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent; }\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #cccccc;\n  margin: 1em 0;\n  padding: 0; }\ninput, select {\n  vertical-align: middle; }\nol, ul, li {\n  list-style: none; }\nimg {\n  vertical-align: top;\n  font-size: 0;\n  line-height: 0; }\n* {\n  box-sizing: border-box; }\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table; }\n.clearfix:after {\n  clear: both; }\n.clearfix {\n  *zoom: 1; }\nhtml {\n  width: 100%;\n  min-width: 320px;\n  height: 100%;\n  position: relative; }\nbody {\n  font-weight: 500;\n  -webkit-text-size-adjust: 100%;\n  width: 100%;\n  font-family: \"Lucida Grande\", \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic ProN\", \"游ゴシック\", \"メイリオ\", Meiryo, Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  color: #333;\n  background-color: #E2E1E0; }\n@media screen and (max-width: 1024px) {\n    body {\n      font-weight: normal;\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; } }\n@media screen and (max-width: 767px) {\n    body {\n      font-size: 14px; } }\ninput[type=text],\ninput[type=number],\ninput[type=password],\ninput[type=tel],\ninput[type=email],\ninput[type=number],\ninput[type=submit],\ntextarea,\nselect,\noption,\nbutton,\nlabel {\n  font-weight: 500;\n  font-family: \"Lucida Grande\", \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic ProN\", \"游ゴシック\", \"メイリオ\", Meiryo, Helvetica, Arial, sans-serif;\n  border-radius: 0;\n  border: none;\n  background: none;\n  padding: 0;\n  margin: 0;\n  font-size: 16px; }\n@media screen and (max-width: 1024px) {\n    input[type=text],\n    input[type=number],\n    input[type=password],\n    input[type=tel],\n    input[type=email],\n    input[type=number],\n    input[type=submit],\n    textarea,\n    select,\n    option,\n    button,\n    label {\n      font-weight: normal; } }\n@media screen and (max-width: 767px) {\n    input[type=text],\n    input[type=number],\n    input[type=password],\n    input[type=tel],\n    input[type=email],\n    input[type=number],\n    input[type=submit],\n    textarea,\n    select,\n    option,\n    button,\n    label {\n      font-size: 14px; } }\ninput[type=submit],\nbutton {\n  cursor: pointer; }\ninput[type=\"number\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button {\n  -webkit-appearance: none; }\ninput[type=\"number\"] {\n  -moz-appearance: textfield; }\ninput[type=text],\ninput[type=number],\ninput[type=password],\ninput[type=tel],\ninput[type=email],\ninput[type=number] {\n  width: 100%;\n  border: 1px solid #989898;\n  padding: 0 10px;\n  background-color: #FFF;\n  border-radius: 3px;\n  line-height: 44px;\n  height: 44px;\n  outline: none; }\ninput[type=text]:focus,\n  input[type=number]:focus,\n  input[type=password]:focus,\n  input[type=tel]:focus,\n  input[type=email]:focus,\n  input[type=number]:focus {\n    border: 2px solid #707070; }\ntextarea {\n  width: 100%;\n  border: 1px solid #989898;\n  padding: 8px 10px;\n  background-color: #FFF;\n  border-radius: 3px; }\nselect {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  overflow: hidden;\n  border: 1px solid #989898;\n  padding: 0 54px 0 10px;\n  height: 44px;\n  border-radius: 3px;\n  position: relative;\n  background-color: #FFF;\n  background-image: url(/assets/images/common/select_box.svg);\n  background-repeat: no-repeat;\n  background-size: 44px;\n  background-position: right center;\n  outline: none; }\nselect:focus {\n    padding: 0 53px 0 9px;\n    border: 2px solid #707070; }\n/*　IE11,IE10　*/\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  select:not(:target) {\n    background-image: url(/assets/images/common/select_box.png); }\n  select::-ms-expand {\n    display: none; } }\ninput[type=checkbox] {\n  opacity: 0;\n  margin: 0;\n  position: absolute; }\nlabel {\n  position: relative;\n  padding-left: 30px;\n  cursor: pointer;\n  display: inline-block;\n  margin-bottom: 10px; }\nlabel.validation {\n    border-color: transparent !important;\n    background-color: transparent !important; }\nlabel.validation:before {\n      border-color: #C30D23 !important;\n      background-color: #ffe8eb !important; }\nlabel:before {\n    content: '';\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    top: 50%;\n    left: 0;\n    margin-top: -10px;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    background-color: #FFF; }\nlabel:after {\n    content: '';\n    width: 0;\n    height: 20px;\n    position: absolute;\n    top: 50%;\n    left: 0;\n    margin-top: -10px;\n    background-image: url(/assets/images/icon/icon_check.svg);\n    background-size: 20px 20px; }\nlabel:last-child {\n    margin-bottom: 0; }\ninput:checked + label:after {\n  width: 20px;\n  transition: width 0.1s; }\np {\n  line-height: 1.5; }\na {\n  text-decoration: none;\n  cursor: pointer; }\np a {\n  color: #019fe8;\n  text-decoration: underline; }\n.not-display {\n  display: none; }\n.d-table {\n  display: table;\n  width: 100%; }\n.d-tr {\n  display: table-row-group; }\n.d-td {\n  display: table-cell;\n  vertical-align: middle; }\n.d-ib {\n  display: inline-block;\n  vertical-align: middle; }\n.device-type-sp {\n  display: none; }\n@media screen and (max-width: 767px) {\n  .device-type-sp {\n    display: block; }\n  .device-type-pc {\n    display: none; } }\n.text-left {\n  text-align: left; }\n.text-right {\n  text-align: right; }\n.text-center {\n  text-align: center; }\n.red-text {\n  color: #C30D23; }\n.small-text {\n  font-size: 14px; }\n@media screen and (max-width: 767px) {\n    .small-text {\n      font-size: 14px; } }\n.small-x-text {\n  font-size: 12px; }\n@media screen and (max-width: 767px) {\n    .small-x-text {\n      font-size: 12px; } }\n.large-text {\n  font-size: 20px; }\n@media screen and (max-width: 767px) {\n    .large-text {\n      font-size: 18px; } }\n.large-x-text {\n  font-size: 24px; }\n.mb-xx-large {\n  margin-bottom: 50px !important; }\n.mb-x-large {\n  margin-bottom: 40px !important; }\n.mb-large {\n  margin-bottom: 30px !important; }\n.mb-middle {\n  margin-bottom: 20px !important; }\n.mb-small {\n  margin-bottom: 15px !important; }\n.mb-x-small {\n  margin-bottom: 10px !important; }\n.mb-xx-small {\n  margin-bottom: 5px !important; }\n.width-small {\n  width: 108px; }\n@media screen and (max-width: 767px) {\n    .width-small {\n      width: 54px; } }\n.width-medium {\n  width: 380px; }\n@media screen and (max-width: 767px) {\n    .width-medium {\n      width: 190px; } }\n.width-large {\n  width: 600px; }\n@media screen and (max-width: 767px) {\n    .width-large {\n      width: 300px; } }\n.bg-white {\n  background-color: #FFF; }\n.bg-ultra-light-gray {\n  background-color: #F5F7F7; }\n.bg-light-gray {\n  background-color: #eeeef0; }\n.bg-gray {\n  background-color: #727272; }\n.bg-pink {\n  background-color: #ffe8eb; }\n.bg-dark-blue {\n  background-color: #036db7; }\n.border-bottom-dot {\n  position: relative;\n  min-height: 1px; }\n.border-bottom-dot:after {\n    content: '';\n    display: block;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 3px;\n    background-image: url(/assets/images/common/line_dotte.png);\n    background-size: contain; }\n.radius {\n  border-radius: 4px; }\n.not-radius {\n  border-radius: 0 !important; }\n.image img {\n  width: 100%; }\n.box {\n  overflow: hidden;\n  padding: 20px; }\n@media screen and (max-width: 767px) {\n    .box {\n      padding: 20px 10px; } }\n.box:last-child {\n    margin-bottom: 0; }\n.box .box-ttl {\n    background-color: #B2B2B2;\n    color: #FFF;\n    padding: 10px 20px;\n    margin: 0 -20px 20px; }\n.box .box-ttl:first-child {\n      margin-top: -20px; }\n.box li {\n    padding: 0 0 20px;\n    margin-bottom: 20px;\n    position: relative; }\n.box li:after {\n      content: '';\n      display: block;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 3px;\n      background-image: url(/assets/images/common/line_dotte.png);\n      background-size: contain; }\n.box li:last-child {\n      border: none;\n      margin: 0;\n      padding: 0; }\n.box li:last-child:after {\n        background-image: none; }\n.box dl {\n    margin-bottom: 10px; }\n.box dl:last-child {\n      margin-bottom: 0; }\n.box dl dt {\n      margin-bottom: 10px; }\n.box dl dd {\n      margin-bottom: 10px; }\n.box dl dd:last-child {\n        margin-bottom: 0; }\n.form-layout dl {\n  margin-bottom: 0;\n  display: flex; }\n@media screen and (max-width: 767px) {\n    .form-layout dl {\n      display: block;\n      width: auto;\n      max-width: 100%;\n      margin-bottom: 10px; }\n      .form-layout dl:last-child {\n        margin-bottom: 0; } }\n.form-layout dl dt {\n    margin-bottom: 0;\n    width: 180px;\n    font-weight: bold; }\n@media screen and (max-width: 767px) {\n      .form-layout dl dt {\n        line-height: 1;\n        width: auto;\n        margin-bottom: 10px; } }\n.form-layout dl dd {\n    width: calc(100% - 180px); }\n@media screen and (max-width: 767px) {\n      .form-layout dl dd {\n        width: auto; } }\n.text-icon-dark-blue {\n  background-color: #036db7;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 5px;\n  color: #FFF;\n  font-weight: normal; }\n.text-icon-red {\n  background-color: #C30D23;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 5px;\n  color: #FFF;\n  font-weight: normal; }\n.center-button {\n  margin-left: auto;\n  margin-right: auto;\n  width: 300px; }\n@media screen and (max-width: 767px) {\n    .center-button {\n      width: auto; } }\n.disabled {\n  position: relative;\n  cursor: default !important; }\n.disabled:after {\n    content: '';\n    display: block !important;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100% !important;\n    height: 100% !important;\n    z-index: 1; }\n.button a, .button button, .button label {\n  line-height: 1;\n  display: block;\n  padding: 15px 0;\n  text-align: center;\n  width: 100%;\n  border-radius: 5px;\n  position: relative;\n  cursor: pointer; }\n.button a:hover, .button button:hover, .button label:hover {\n    transition: opacity 0.25s;\n    opacity: 0.75; }\n@media screen and (max-width: 1024px) {\n      .button a:hover, .button button:hover, .button label:hover {\n        opacity: 1; } }\n.button.blue-button a, .button.blue-button button, .button.blue-button label {\n  background-color: #019fe8;\n  color: #FFF;\n  box-shadow: 0 3px 0 #0084b2; }\n.button.dark-blue-button a, .button.dark-blue-button button, .button.dark-blue-button label {\n  background-color: #036db7;\n  color: #FFF; }\n.button.gray-button a, .button.gray-button button, .button.gray-button label {\n  background-color: #595758;\n  color: #FFF; }\n.button.light-gray-button a, .button.light-gray-button button, .button.light-gray-button label {\n  background-color: #727272;\n  color: #FFF; }\n.button.white-button a, .button.white-button button, .button.white-button label {\n  background-color: #FFF; }\n.ghost-button a, .ghost-button button, .ghost-button label {\n  line-height: 1;\n  display: block;\n  padding: 15px 0;\n  text-align: center;\n  width: 100%;\n  border-radius: 5px;\n  border: 1px solid #FFF;\n  color: #FFF;\n  position: relative;\n  cursor: pointer; }\n.ghost-button a:hover, .ghost-button button:hover, .ghost-button label:hover {\n    transition: opacity 0.25s;\n    opacity: 0.75; }\n@media screen and (max-width: 1024px) {\n      .ghost-button a:hover, .ghost-button button:hover, .ghost-button label:hover {\n        opacity: 1; } }\n.ghost-button.blue-button a, .ghost-button.blue-button button, .ghost-button.blue-button label {\n  border-color: #019fe8;\n  color: #019fe8;\n  background-color: #FFF; }\n.ghost-button.dark-blue-button a, .ghost-button.dark-blue-button button, .ghost-button.dark-blue-button label {\n  border-color: #036db7;\n  color: #036db7; }\n.ghost-button.gray-button a, .ghost-button.gray-button button, .ghost-button.gray-button label {\n  border-color: #595758;\n  color: #595758; }\n.ghost-button.yellow-button a, .ghost-button.yellow-button button, .ghost-button.yellow-button label {\n  border-color: #C4C43A;\n  color: #333; }\n.ghost-button.black-button a, .ghost-button.black-button button, .ghost-button.black-button label {\n  border-color: #333;\n  color: #333; }\n.close-link {\n  text-align: center; }\n.close-link a, .close-link button {\n    font-size: 16px;\n    font-weight: bold;\n    color: #333;\n    position: relative;\n    padding-left: 20px;\n    text-decoration: underline; }\n.page-ttl {\n  line-height: 1;\n  font-weight: bold;\n  font-size: 20px;\n  margin-bottom: 20px;\n  text-align: center;\n  position: relative; }\n.read {\n  margin-bottom: 20px;\n  text-align: center; }\n@media screen and (max-width: 767px) {\n    .read {\n      text-align: left; } }\n.section-ttl {\n  line-height: 1;\n  font-size: 18px;\n  font-weight: bold;\n  margin: 0 0 10px;\n  position: relative; }\n.validation {\n  border-color: #C30D23 !important;\n  background-color: #ffe8eb !important; }\n.validation-text {\n  margin: 0 0 5px;\n  color: #C30D23;\n  font-weight: bold; }\n.validation-text:last-child {\n    margin-bottom: 0; }\n.wrapper {\n  width: 940px;\n  margin: 0 auto;\n  padding: 30px 0; }\n@media screen and (max-width: 1024px) {\n    .wrapper {\n      width: auto;\n      padding: 15px; } }\n@media screen and (max-width: 767px) {\n    .wrapper {\n      width: auto;\n      padding: 10px; } }\n.noscript {\n  padding: 10px 0; }\n.contents {\n  background-color: #FFF;\n  padding: 40px 120px 60px; }\n@media screen and (max-width: 1024px) {\n    .contents {\n      padding: 40px 60px 60px; } }\n@media screen and (max-width: 767px) {\n    .contents {\n      padding: 20px 15px 50px; } }\n.blur {\n  -webkit-filter: blur(5px);\n          filter: blur(5px); }\n.position-center {\n  width: 100%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%); }\n@-webkit-keyframes zoom {\n  0% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n@keyframes zoom {\n  0% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n@-webkit-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n@keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n@-webkit-keyframes fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n@keyframes fadeout {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n@media print {\n  .not-print {\n    display: none; } }\n.ticket-app-show {\n  display: none; }\n.ticket-app {\n  padding-top: 54px;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  margin-top: 0; }\n.ticket-app .ticket-app-show {\n    display: block; }\n.ticket-app .ticket-app-hide {\n    display: none; }\n.ticket-app .ticket-app-header {\n    position: fixed;\n    z-index: 20;\n    top: 0;\n    left: 0;\n    width: 100%;\n    background-color: #000;\n    border-radius: 0;\n    border: none;\n    padding: 0; }\n.ticket-app .ticket-app-header .close a {\n      display: inline-block;\n      padding: 15px;\n      color: #FFF; }\n.ticket-app .footer {\n    display: none; }\n.ticket-app .site-seal {\n    display: none; }\n.ticket-app .prev-button button, .ticket-app .prev-button a, .ticket-app .next-button button, .ticket-app .next-button a, .ticket-app .blue-button button, .ticket-app .blue-button a, .ticket-app .gray-button button, .ticket-app .gray-button a, .ticket-app .light-gray-button button, .ticket-app .light-gray-button a {\n    border-radius: 0;\n    box-shadow: none; }\n.ticket-app .prev-button .icon-prev-white:before, .ticket-app .next-button .icon-prev-white:before, .ticket-app .blue-button .icon-prev-white:before, .ticket-app .gray-button .icon-prev-white:before, .ticket-app .light-gray-button .icon-prev-white:before {\n    display: none; }\n.ticket-app .prev-button .icon-next-white:before, .ticket-app .next-button .icon-next-white:before, .ticket-app .blue-button .icon-next-white:before, .ticket-app .gray-button .icon-next-white:before, .ticket-app .light-gray-button .icon-next-white:before {\n    display: none; }\n.member-show {\n  display: none; }\n.member .member-show {\n  display: block; }\n.member .member-hide {\n  display: none; }\n.screen-01-025 .column-object, .screen-01-035 .column-object {\n  top: 200px !important; }\n.screen-01-025 .line-object-0, .screen-01-035 .line-object-0 {\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jbGllbnQvc3JjL3N0eWxlcy5zY3NzIiwic3JjL2NsaWVudC9zcmMvQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZW1hIFN1bnNoaW5lXFxmcm9udGVuZC9zcmNcXGNsaWVudFxcc3JjXFxhc3NldHNcXHNjc3NcXF9yZXNldC5zY3NzIiwic3JjL2NsaWVudC9zcmMvQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZW1hIFN1bnNoaW5lXFxmcm9udGVuZC9zcmNcXGNsaWVudFxcc3JjXFxhc3NldHNcXHNjc3NcXF9jb21tb24uc2NzcyIsInNyYy9jbGllbnQvc3JjL0M6XFxVc2Vyc1xcaGF0YWd1Y2hpXFxEZXNrdG9wXFx3b3Jrc3BhY2VcXENpbmVtYSBTdW5zaGluZVxcZnJvbnRlbmQvc3JjXFxjbGllbnRcXHNyY1xcYXNzZXRzXFxzY3NzXFxfdGlja2V0QXBwLnNjc3MiLCJzcmMvY2xpZW50L3NyYy9DOlxcVXNlcnNcXGhhdGFndWNoaVxcRGVza3RvcFxcd29ya3NwYWNlXFxDaW5lbWEgU3Vuc2hpbmVcXGZyb250ZW5kL3NyY1xcY2xpZW50XFxzcmNcXGFzc2V0c1xcc2Nzc1xcX21lbWJlci5zY3NzIiwic3JjL2NsaWVudC9zcmMvQzpcXFVzZXJzXFxoYXRhZ3VjaGlcXERlc2t0b3BcXHdvcmtzcGFjZVxcQ2luZW1hIFN1bnNoaW5lXFxmcm9udGVuZC9zcmNcXGNsaWVudFxcc3JjXFxhc3NldHNcXHNjc3NcXF9zY3JlZW4uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNBaEI7Ozs7Ozs7Ozs7OztFQVlFLFNBQVE7RUFDUixVQUFTO0VBQ1QsU0FBUTtFQUNSLFVBQVM7RUFDVCxlQUFjO0VBQ2Qsd0JBQXVCLEVBQUE7QUFHekI7RUFDRSxjQUFhLEVBQUE7QUFHZjs7RUFFRSxjQUFhLEVBQUE7QUFHZjtFQUNFLFNBQVE7RUFDUixVQUFTO0VBQ1QsZUFB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YUFBYSxFQUFBO0FBSmpCO0lBTVEsY0FBYyxFQUFBO0FBTnRCO0lBU1EsYUFBYSxFQUFBO0FBVHJCO0lBWVEsZUFBZTtJQUNmLFdBQVc7SUFDWCxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixVQUFVLEVBQUE7QUFwQmxCO01BdUJnQixxQkFBcUI7TUFDckIsYUFBYTtNQUNiLFdBQVcsRUFBQTtBQXpCM0I7SUE4QlEsYUFBYSxFQUFBO0FBOUJyQjtJQWlDUSxhQUFhLEVBQUE7QUFqQ3JCO0lBcUNZLGdCQUFnQjtJQUNoQixnQkFBZ0IsRUFBQTtBQXRDNUI7SUF5Q1ksYUFBYSxFQUFBO0FBekN6QjtJQTRDWSxhQUFhLEVBQUE7QUMvQ3pCO0VBQ0ksYUFBYSxFQUFBO0FBRWpCO0VBRVEsY0FBYyxFQUFBO0FBRnRCO0VBS1EsYUFBYSxFQUFBO0FDUHJCO0VBRVEscUJBQXFCLEVBQUE7QUFGN0I7RUFLUSxhQUFZLEVBQUEiLCJmaWxlIjoic3JjL2NsaWVudC9zcmMvc3R5bGVzLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIG9iamVjdCwgaWZyYW1lLFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxuYWJiciwgYWRkcmVzcywgY2l0ZSwgY29kZSxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgc2FtcCxcbnNtYWxsLCBzdHJvbmcsIHN1Yiwgc3VwLCB2YXIsXG5iLCBpLFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24sIHN1bW1hcnksXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogMDtcbiAgZm9udC1zaXplOiAxMDAlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cblxuYm9keSB7XG4gIGxpbmUtaGVpZ2h0OiAxOyB9XG5cbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xuICBkaXNwbGF5OiBibG9jazsgfVxuXG5hIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBmb250LXNpemU6IDEwMCU7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cblxudGFibGUge1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICBib3JkZXItc3BhY2luZzogMDsgfVxuXG5ociB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDFweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2NjY2NjYztcbiAgbWFyZ2luOiAxZW0gMDtcbiAgcGFkZGluZzogMDsgfVxuXG5pbnB1dCwgc2VsZWN0IHtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG5vbCwgdWwsIGxpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTsgfVxuXG5pbWcge1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBmb250LXNpemU6IDA7XG4gIGxpbmUtaGVpZ2h0OiAwOyB9XG5cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG5cbi5jbGVhcmZpeDpiZWZvcmUsXG4uY2xlYXJmaXg6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogdGFibGU7IH1cblxuLmNsZWFyZml4OmFmdGVyIHtcbiAgY2xlYXI6IGJvdGg7IH1cblxuLmNsZWFyZml4IHtcbiAgKnpvb206IDE7IH1cblxuaHRtbCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4td2lkdGg6IDMyMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuXG5ib2R5IHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1mYW1pbHk6IFwiTHVjaWRhIEdyYW5kZVwiLCBcIuODkuODqeOCruODjuinkuOCtCBQcm9OIFczXCIsIFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvTlwiLCBcIua4uOOCtOOCt+ODg+OCr1wiLCBcIuODoeOCpOODquOCqlwiLCBNZWlyeW8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICMzMzM7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFMkUxRTA7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgYm9keSB7XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgIGJvZHkge1xuICAgICAgZm9udC1zaXplOiAxNHB4OyB9IH1cblxuaW5wdXRbdHlwZT10ZXh0XSxcbmlucHV0W3R5cGU9bnVtYmVyXSxcbmlucHV0W3R5cGU9cGFzc3dvcmRdLFxuaW5wdXRbdHlwZT10ZWxdLFxuaW5wdXRbdHlwZT1lbWFpbF0sXG5pbnB1dFt0eXBlPW51bWJlcl0sXG5pbnB1dFt0eXBlPXN1Ym1pdF0sXG50ZXh0YXJlYSxcbnNlbGVjdCxcbm9wdGlvbixcbmJ1dHRvbixcbmxhYmVsIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1mYW1pbHk6IFwiTHVjaWRhIEdyYW5kZVwiLCBcIuODkuODqeOCruODjuinkuOCtCBQcm9OIFczXCIsIFwiSGlyYWdpbm8gS2FrdSBHb3RoaWMgUHJvTlwiLCBcIua4uOOCtOOCt+ODg+OCr1wiLCBcIuODoeOCpOODquOCqlwiLCBNZWlyeW8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IDE2cHg7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgaW5wdXRbdHlwZT10ZXh0XSxcbiAgICBpbnB1dFt0eXBlPW51bWJlcl0sXG4gICAgaW5wdXRbdHlwZT1wYXNzd29yZF0sXG4gICAgaW5wdXRbdHlwZT10ZWxdLFxuICAgIGlucHV0W3R5cGU9ZW1haWxdLFxuICAgIGlucHV0W3R5cGU9bnVtYmVyXSxcbiAgICBpbnB1dFt0eXBlPXN1Ym1pdF0sXG4gICAgdGV4dGFyZWEsXG4gICAgc2VsZWN0LFxuICAgIG9wdGlvbixcbiAgICBidXR0b24sXG4gICAgbGFiZWwge1xuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfSB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgaW5wdXRbdHlwZT10ZXh0XSxcbiAgICBpbnB1dFt0eXBlPW51bWJlcl0sXG4gICAgaW5wdXRbdHlwZT1wYXNzd29yZF0sXG4gICAgaW5wdXRbdHlwZT10ZWxdLFxuICAgIGlucHV0W3R5cGU9ZW1haWxdLFxuICAgIGlucHV0W3R5cGU9bnVtYmVyXSxcbiAgICBpbnB1dFt0eXBlPXN1Ym1pdF0sXG4gICAgdGV4dGFyZWEsXG4gICAgc2VsZWN0LFxuICAgIG9wdGlvbixcbiAgICBidXR0b24sXG4gICAgbGFiZWwge1xuICAgICAgZm9udC1zaXplOiAxNHB4OyB9IH1cblxuaW5wdXRbdHlwZT1zdWJtaXRdLFxuYnV0dG9uIHtcbiAgY3Vyc29yOiBwb2ludGVyOyB9XG5cbmlucHV0W3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyB9XG5cbmlucHV0W3R5cGU9XCJudW1iZXJcIl0ge1xuICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgfVxuXG5pbnB1dFt0eXBlPXRleHRdLFxuaW5wdXRbdHlwZT1udW1iZXJdLFxuaW5wdXRbdHlwZT1wYXNzd29yZF0sXG5pbnB1dFt0eXBlPXRlbF0sXG5pbnB1dFt0eXBlPWVtYWlsXSxcbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjOTg5ODk4O1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgbGluZS1oZWlnaHQ6IDQ0cHg7XG4gIGhlaWdodDogNDRweDtcbiAgb3V0bGluZTogbm9uZTsgfVxuICBpbnB1dFt0eXBlPXRleHRdOmZvY3VzLFxuICBpbnB1dFt0eXBlPW51bWJlcl06Zm9jdXMsXG4gIGlucHV0W3R5cGU9cGFzc3dvcmRdOmZvY3VzLFxuICBpbnB1dFt0eXBlPXRlbF06Zm9jdXMsXG4gIGlucHV0W3R5cGU9ZW1haWxdOmZvY3VzLFxuICBpbnB1dFt0eXBlPW51bWJlcl06Zm9jdXMge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICM3MDcwNzA7IH1cblxudGV4dGFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzk4OTg5ODtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gIGJvcmRlci1yYWRpdXM6IDNweDsgfVxuXG5zZWxlY3Qge1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzk4OTg5ODtcbiAgcGFkZGluZzogMCA1NHB4IDAgMTBweDtcbiAgaGVpZ2h0OiA0NHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9zZWxlY3RfYm94LnN2Zyk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogNDRweDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xuICBvdXRsaW5lOiBub25lOyB9XG4gIHNlbGVjdDpmb2N1cyB7XG4gICAgcGFkZGluZzogMCA1M3B4IDAgOXB4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICM3MDcwNzA7IH1cblxuLyrjgIBJRTExLElFMTDjgIAqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpLCAoLW1zLWhpZ2gtY29udHJhc3Q6IG5vbmUpIHtcbiAgc2VsZWN0Om5vdCg6dGFyZ2V0KSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9zZWxlY3RfYm94LnBuZyk7IH1cbiAgc2VsZWN0OjotbXMtZXhwYW5kIHtcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cblxuaW5wdXRbdHlwZT1jaGVja2JveF0ge1xuICBvcGFjaXR5OiAwO1xuICBtYXJnaW46IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTsgfVxuXG5sYWJlbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxuICBsYWJlbC52YWxpZGF0aW9uIHtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsgfVxuICAgIGxhYmVsLnZhbGlkYXRpb246YmVmb3JlIHtcbiAgICAgIGJvcmRlci1jb2xvcjogI0MzMEQyMyAhaW1wb3J0YW50O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZThlYiAhaW1wb3J0YW50OyB9XG4gIGxhYmVsOmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiAwO1xuICAgIG1hcmdpbi10b3A6IC0xMHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOyB9XG4gIGxhYmVsOmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDA7XG4gICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2ljb24vaWNvbl9jaGVjay5zdmcpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4OyB9XG4gIGxhYmVsOmxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cblxuaW5wdXQ6Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHtcbiAgd2lkdGg6IDIwcHg7XG4gIHRyYW5zaXRpb246IHdpZHRoIDAuMXM7IH1cblxucCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7IH1cblxuYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyOyB9XG5cbnAgYSB7XG4gIGNvbG9yOiAjMDE5ZmU4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxuXG4ubm90LWRpc3BsYXkge1xuICBkaXNwbGF5OiBub25lOyB9XG5cbi5kLXRhYmxlIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5kLXRyIHtcbiAgZGlzcGxheTogdGFibGUtcm93LWdyb3VwOyB9XG5cbi5kLXRkIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4uZC1pYiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxuXG4uZGV2aWNlLXR5cGUtc3Age1xuICBkaXNwbGF5OiBub25lOyB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5kZXZpY2UtdHlwZS1zcCB7XG4gICAgZGlzcGxheTogYmxvY2s7IH1cbiAgLmRldmljZS10eXBlLXBjIHtcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cblxuLnRleHQtbGVmdCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7IH1cblxuLnRleHQtcmlnaHQge1xuICB0ZXh0LWFsaWduOiByaWdodDsgfVxuXG4udGV4dC1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuLnJlZC10ZXh0IHtcbiAgY29sb3I6ICNDMzBEMjM7IH1cblxuLnNtYWxsLXRleHQge1xuICBmb250LXNpemU6IDE0cHg7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAuc21hbGwtdGV4dCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7IH0gfVxuXG4uc21hbGwteC10ZXh0IHtcbiAgZm9udC1zaXplOiAxMnB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLnNtYWxsLXgtdGV4dCB7XG4gICAgICBmb250LXNpemU6IDEycHg7IH0gfVxuXG4ubGFyZ2UtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMjBweDsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgIC5sYXJnZS10ZXh0IHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDsgfSB9XG5cbi5sYXJnZS14LXRleHQge1xuICBmb250LXNpemU6IDI0cHg7IH1cblxuLm1iLXh4LWxhcmdlIHtcbiAgbWFyZ2luLWJvdHRvbTogNTBweCAhaW1wb3J0YW50OyB9XG5cbi5tYi14LWxhcmdlIHtcbiAgbWFyZ2luLWJvdHRvbTogNDBweCAhaW1wb3J0YW50OyB9XG5cbi5tYi1sYXJnZSB7XG4gIG1hcmdpbi1ib3R0b206IDMwcHggIWltcG9ydGFudDsgfVxuXG4ubWItbWlkZGxlIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50OyB9XG5cbi5tYi1zbWFsbCB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHggIWltcG9ydGFudDsgfVxuXG4ubWIteC1zbWFsbCB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHggIWltcG9ydGFudDsgfVxuXG4ubWIteHgtc21hbGwge1xuICBtYXJnaW4tYm90dG9tOiA1cHggIWltcG9ydGFudDsgfVxuXG4ud2lkdGgtc21hbGwge1xuICB3aWR0aDogMTA4cHg7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAud2lkdGgtc21hbGwge1xuICAgICAgd2lkdGg6IDU0cHg7IH0gfVxuXG4ud2lkdGgtbWVkaXVtIHtcbiAgd2lkdGg6IDM4MHB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLndpZHRoLW1lZGl1bSB7XG4gICAgICB3aWR0aDogMTkwcHg7IH0gfVxuXG4ud2lkdGgtbGFyZ2Uge1xuICB3aWR0aDogNjAwcHg7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAud2lkdGgtbGFyZ2Uge1xuICAgICAgd2lkdGg6IDMwMHB4OyB9IH1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjsgfVxuXG4uYmctdWx0cmEtbGlnaHQtZ3JheSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGNUY3Rjc7IH1cblxuLmJnLWxpZ2h0LWdyYXkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWYwOyB9XG5cbi5iZy1ncmF5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzcyNzI3MjsgfVxuXG4uYmctcGluayB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmU4ZWI7IH1cblxuLmJnLWRhcmstYmx1ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzZkYjc7IH1cblxuLmJvcmRlci1ib3R0b20tZG90IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtaW4taGVpZ2h0OiAxcHg7IH1cbiAgLmJvcmRlci1ib3R0b20tZG90OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAzcHg7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9saW5lX2RvdHRlLnBuZyk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluOyB9XG5cbi5yYWRpdXMge1xuICBib3JkZXItcmFkaXVzOiA0cHg7IH1cblxuLm5vdC1yYWRpdXMge1xuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7IH1cblxuLmltYWdlIGltZyB7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5ib3gge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAyMHB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLmJveCB7XG4gICAgICBwYWRkaW5nOiAyMHB4IDEwcHg7IH0gfVxuICAuYm94Omxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cbiAgLmJveCAuYm94LXR0bCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0IyQjJCMjtcbiAgICBjb2xvcjogI0ZGRjtcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgbWFyZ2luOiAwIC0yMHB4IDIwcHg7IH1cbiAgICAuYm94IC5ib3gtdHRsOmZpcnN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi10b3A6IC0yMHB4OyB9XG4gIC5ib3ggbGkge1xuICAgIHBhZGRpbmc6IDAgMCAyMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4gICAgLmJveCBsaTphZnRlciB7XG4gICAgICBjb250ZW50OiAnJztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9pbWFnZXMvY29tbW9uL2xpbmVfZG90dGUucG5nKTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjsgfVxuICAgIC5ib3ggbGk6bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwOyB9XG4gICAgICAuYm94IGxpOmxhc3QtY2hpbGQ6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lOyB9XG4gIC5ib3ggZGwge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cbiAgICAuYm94IGRsOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxuICAgIC5ib3ggZGwgZHQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxuICAgIC5ib3ggZGwgZGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxuICAgICAgLmJveCBkbCBkZDpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDsgfVxuXG4uZm9ybS1sYXlvdXQgZGwge1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICBkaXNwbGF5OiBmbGV4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLmZvcm0tbGF5b3V0IGRsIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XG4gICAgICAuZm9ybS1sYXlvdXQgZGw6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7IH0gfVxuICAuZm9ybS1sYXlvdXQgZGwgZHQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgd2lkdGg6IDE4MHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgIC5mb3JtLWxheW91dCBkbCBkdCB7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDsgfSB9XG4gIC5mb3JtLWxheW91dCBkbCBkZCB7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4MHB4KTsgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgICAuZm9ybS1sYXlvdXQgZGwgZGQge1xuICAgICAgICB3aWR0aDogYXV0bzsgfSB9XG5cbi50ZXh0LWljb24tZGFyay1ibHVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzNmRiNztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBwYWRkaW5nOiA1cHg7XG4gIGNvbG9yOiAjRkZGO1xuICBmb250LXdlaWdodDogbm9ybWFsOyB9XG5cbi50ZXh0LWljb24tcmVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0MzMEQyMztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBwYWRkaW5nOiA1cHg7XG4gIGNvbG9yOiAjRkZGO1xuICBmb250LXdlaWdodDogbm9ybWFsOyB9XG5cbi5jZW50ZXItYnV0dG9uIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgd2lkdGg6IDMwMHB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLmNlbnRlci1idXR0b24ge1xuICAgICAgd2lkdGg6IGF1dG87IH0gfVxuXG4uZGlzYWJsZWQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50OyB9XG4gIC5kaXNhYmxlZDphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgei1pbmRleDogMTsgfVxuXG4uYnV0dG9uIGEsIC5idXR0b24gYnV0dG9uLCAuYnV0dG9uIGxhYmVsIHtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAxNXB4IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgLmJ1dHRvbiBhOmhvdmVyLCAuYnV0dG9uIGJ1dHRvbjpob3ZlciwgLmJ1dHRvbiBsYWJlbDpob3ZlciB7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cztcbiAgICBvcGFjaXR5OiAwLjc1OyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgICAuYnV0dG9uIGE6aG92ZXIsIC5idXR0b24gYnV0dG9uOmhvdmVyLCAuYnV0dG9uIGxhYmVsOmhvdmVyIHtcbiAgICAgICAgb3BhY2l0eTogMTsgfSB9XG5cbi5idXR0b24uYmx1ZS1idXR0b24gYSwgLmJ1dHRvbi5ibHVlLWJ1dHRvbiBidXR0b24sIC5idXR0b24uYmx1ZS1idXR0b24gbGFiZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDE5ZmU4O1xuICBjb2xvcjogI0ZGRjtcbiAgYm94LXNoYWRvdzogMCAzcHggMCAjMDA4NGIyOyB9XG5cbi5idXR0b24uZGFyay1ibHVlLWJ1dHRvbiBhLCAuYnV0dG9uLmRhcmstYmx1ZS1idXR0b24gYnV0dG9uLCAuYnV0dG9uLmRhcmstYmx1ZS1idXR0b24gbGFiZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM2ZGI3O1xuICBjb2xvcjogI0ZGRjsgfVxuXG4uYnV0dG9uLmdyYXktYnV0dG9uIGEsIC5idXR0b24uZ3JheS1idXR0b24gYnV0dG9uLCAuYnV0dG9uLmdyYXktYnV0dG9uIGxhYmVsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU5NTc1ODtcbiAgY29sb3I6ICNGRkY7IH1cblxuLmJ1dHRvbi5saWdodC1ncmF5LWJ1dHRvbiBhLCAuYnV0dG9uLmxpZ2h0LWdyYXktYnV0dG9uIGJ1dHRvbiwgLmJ1dHRvbi5saWdodC1ncmF5LWJ1dHRvbiBsYWJlbCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3MjcyNzI7XG4gIGNvbG9yOiAjRkZGOyB9XG5cbi5idXR0b24ud2hpdGUtYnV0dG9uIGEsIC5idXR0b24ud2hpdGUtYnV0dG9uIGJ1dHRvbiwgLmJ1dHRvbi53aGl0ZS1idXR0b24gbGFiZWwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOyB9XG5cbi5naG9zdC1idXR0b24gYSwgLmdob3N0LWJ1dHRvbiBidXR0b24sIC5naG9zdC1idXR0b24gbGFiZWwge1xuICBsaW5lLWhlaWdodDogMTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDE1cHggMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjRkZGO1xuICBjb2xvcjogI0ZGRjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgLmdob3N0LWJ1dHRvbiBhOmhvdmVyLCAuZ2hvc3QtYnV0dG9uIGJ1dHRvbjpob3ZlciwgLmdob3N0LWJ1dHRvbiBsYWJlbDpob3ZlciB7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cztcbiAgICBvcGFjaXR5OiAwLjc1OyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgICAuZ2hvc3QtYnV0dG9uIGE6aG92ZXIsIC5naG9zdC1idXR0b24gYnV0dG9uOmhvdmVyLCAuZ2hvc3QtYnV0dG9uIGxhYmVsOmhvdmVyIHtcbiAgICAgICAgb3BhY2l0eTogMTsgfSB9XG5cbi5naG9zdC1idXR0b24uYmx1ZS1idXR0b24gYSwgLmdob3N0LWJ1dHRvbi5ibHVlLWJ1dHRvbiBidXR0b24sIC5naG9zdC1idXR0b24uYmx1ZS1idXR0b24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICMwMTlmZTg7XG4gIGNvbG9yOiAjMDE5ZmU4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGOyB9XG5cbi5naG9zdC1idXR0b24uZGFyay1ibHVlLWJ1dHRvbiBhLCAuZ2hvc3QtYnV0dG9uLmRhcmstYmx1ZS1idXR0b24gYnV0dG9uLCAuZ2hvc3QtYnV0dG9uLmRhcmstYmx1ZS1idXR0b24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICMwMzZkYjc7XG4gIGNvbG9yOiAjMDM2ZGI3OyB9XG5cbi5naG9zdC1idXR0b24uZ3JheS1idXR0b24gYSwgLmdob3N0LWJ1dHRvbi5ncmF5LWJ1dHRvbiBidXR0b24sIC5naG9zdC1idXR0b24uZ3JheS1idXR0b24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICM1OTU3NTg7XG4gIGNvbG9yOiAjNTk1NzU4OyB9XG5cbi5naG9zdC1idXR0b24ueWVsbG93LWJ1dHRvbiBhLCAuZ2hvc3QtYnV0dG9uLnllbGxvdy1idXR0b24gYnV0dG9uLCAuZ2hvc3QtYnV0dG9uLnllbGxvdy1idXR0b24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICNDNEM0M0E7XG4gIGNvbG9yOiAjMzMzOyB9XG5cbi5naG9zdC1idXR0b24uYmxhY2stYnV0dG9uIGEsIC5naG9zdC1idXR0b24uYmxhY2stYnV0dG9uIGJ1dHRvbiwgLmdob3N0LWJ1dHRvbi5ibGFjay1idXR0b24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICMzMzM7XG4gIGNvbG9yOiAjMzMzOyB9XG5cbi5jbG9zZS1saW5rIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIC5jbG9zZS1saW5rIGEsIC5jbG9zZS1saW5rIGJ1dHRvbiB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiAjMzMzO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cblxuLnBhZ2UtdHRsIHtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5yZWFkIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLnJlYWQge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDsgfSB9XG5cbi5zZWN0aW9uLXR0bCB7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW46IDAgMCAxMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cblxuLnZhbGlkYXRpb24ge1xuICBib3JkZXItY29sb3I6ICNDMzBEMjMgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZThlYiAhaW1wb3J0YW50OyB9XG5cbi52YWxpZGF0aW9uLXRleHQge1xuICBtYXJnaW46IDAgMCA1cHg7XG4gIGNvbG9yOiAjQzMwRDIzO1xuICBmb250LXdlaWdodDogYm9sZDsgfVxuICAudmFsaWRhdGlvbi10ZXh0Omxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cblxuLndyYXBwZXIge1xuICB3aWR0aDogOTQwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAzMHB4IDA7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgLndyYXBwZXIge1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBwYWRkaW5nOiAxNXB4OyB9IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAud3JhcHBlciB7XG4gICAgICB3aWR0aDogYXV0bztcbiAgICAgIHBhZGRpbmc6IDEwcHg7IH0gfVxuXG4ubm9zY3JpcHQge1xuICBwYWRkaW5nOiAxMHB4IDA7IH1cblxuLmNvbnRlbnRzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgcGFkZGluZzogNDBweCAxMjBweCA2MHB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMjRweCkge1xuICAgIC5jb250ZW50cyB7XG4gICAgICBwYWRkaW5nOiA0MHB4IDYwcHggNjBweDsgfSB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLmNvbnRlbnRzIHtcbiAgICAgIHBhZGRpbmc6IDIwcHggMTVweCA1MHB4OyB9IH1cblxuLmJsdXIge1xuICBmaWx0ZXI6IGJsdXIoNXB4KTsgfVxuXG4ucG9zaXRpb24tY2VudGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IH1cblxuQGtleWZyYW1lcyB6b29tIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTsgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cblxuQGtleWZyYW1lcyBmYWRlaW4ge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDsgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxOyB9IH1cblxuQGtleWZyYW1lcyBmYWRlb3V0IHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7IH1cbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMDsgfSB9XG5cbkBtZWRpYSBwcmludCB7XG4gIC5ub3QtcHJpbnQge1xuICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxuXG4udGlja2V0LWFwcC1zaG93IHtcbiAgZGlzcGxheTogbm9uZTsgfVxuXG4udGlja2V0LWFwcCB7XG4gIHBhZGRpbmctdG9wOiA1NHB4O1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIG1hcmdpbi10b3A6IDA7IH1cbiAgLnRpY2tldC1hcHAgLnRpY2tldC1hcHAtc2hvdyB7XG4gICAgZGlzcGxheTogYmxvY2s7IH1cbiAgLnRpY2tldC1hcHAgLnRpY2tldC1hcHAtaGlkZSB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuICAudGlja2V0LWFwcCAudGlja2V0LWFwcC1oZWFkZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAyMDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmc6IDA7IH1cbiAgICAudGlja2V0LWFwcCAudGlja2V0LWFwcC1oZWFkZXIgLmNsb3NlIGEge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgIGNvbG9yOiAjRkZGOyB9XG4gIC50aWNrZXQtYXBwIC5mb290ZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7IH1cbiAgLnRpY2tldC1hcHAgLnNpdGUtc2VhbCB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuICAudGlja2V0LWFwcCAucHJldi1idXR0b24gYnV0dG9uLCAudGlja2V0LWFwcCAucHJldi1idXR0b24gYSwgLnRpY2tldC1hcHAgLm5leHQtYnV0dG9uIGJ1dHRvbiwgLnRpY2tldC1hcHAgLm5leHQtYnV0dG9uIGEsIC50aWNrZXQtYXBwIC5ibHVlLWJ1dHRvbiBidXR0b24sIC50aWNrZXQtYXBwIC5ibHVlLWJ1dHRvbiBhLCAudGlja2V0LWFwcCAuZ3JheS1idXR0b24gYnV0dG9uLCAudGlja2V0LWFwcCAuZ3JheS1idXR0b24gYSwgLnRpY2tldC1hcHAgLmxpZ2h0LWdyYXktYnV0dG9uIGJ1dHRvbiwgLnRpY2tldC1hcHAgLmxpZ2h0LWdyYXktYnV0dG9uIGEge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYm94LXNoYWRvdzogbm9uZTsgfVxuICAudGlja2V0LWFwcCAucHJldi1idXR0b24gLmljb24tcHJldi13aGl0ZTpiZWZvcmUsIC50aWNrZXQtYXBwIC5uZXh0LWJ1dHRvbiAuaWNvbi1wcmV2LXdoaXRlOmJlZm9yZSwgLnRpY2tldC1hcHAgLmJsdWUtYnV0dG9uIC5pY29uLXByZXYtd2hpdGU6YmVmb3JlLCAudGlja2V0LWFwcCAuZ3JheS1idXR0b24gLmljb24tcHJldi13aGl0ZTpiZWZvcmUsIC50aWNrZXQtYXBwIC5saWdodC1ncmF5LWJ1dHRvbiAuaWNvbi1wcmV2LXdoaXRlOmJlZm9yZSB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuICAudGlja2V0LWFwcCAucHJldi1idXR0b24gLmljb24tbmV4dC13aGl0ZTpiZWZvcmUsIC50aWNrZXQtYXBwIC5uZXh0LWJ1dHRvbiAuaWNvbi1uZXh0LXdoaXRlOmJlZm9yZSwgLnRpY2tldC1hcHAgLmJsdWUtYnV0dG9uIC5pY29uLW5leHQtd2hpdGU6YmVmb3JlLCAudGlja2V0LWFwcCAuZ3JheS1idXR0b24gLmljb24tbmV4dC13aGl0ZTpiZWZvcmUsIC50aWNrZXQtYXBwIC5saWdodC1ncmF5LWJ1dHRvbiAuaWNvbi1uZXh0LXdoaXRlOmJlZm9yZSB7XG4gICAgZGlzcGxheTogbm9uZTsgfVxuXG4ubWVtYmVyLXNob3cge1xuICBkaXNwbGF5OiBub25lOyB9XG5cbi5tZW1iZXIgLm1lbWJlci1zaG93IHtcbiAgZGlzcGxheTogYmxvY2s7IH1cblxuLm1lbWJlciAubWVtYmVyLWhpZGUge1xuICBkaXNwbGF5OiBub25lOyB9XG5cbi5zY3JlZW4tMDEtMDI1IC5jb2x1bW4tb2JqZWN0LCAuc2NyZWVuLTAxLTAzNSAuY29sdW1uLW9iamVjdCB7XG4gIHRvcDogMjAwcHggIWltcG9ydGFudDsgfVxuXG4uc2NyZWVuLTAxLTAyNSAubGluZS1vYmplY3QtMCwgLnNjcmVlbi0wMS0wMzUgLmxpbmUtb2JqZWN0LTAge1xuICBkaXNwbGF5OiBub25lOyB9XG4iLCJodG1sLCBib2R5LCBkaXYsIHNwYW4sIG9iamVjdCwgaWZyYW1lLFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxuYWJiciwgYWRkcmVzcywgY2l0ZSwgY29kZSxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgc2FtcCxcbnNtYWxsLCBzdHJvbmcsIHN1Yiwgc3VwLCB2YXIsXG5iLCBpLFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24sIHN1bW1hcnksXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xuICBtYXJnaW46MDtcbiAgcGFkZGluZzowO1xuICBib3JkZXI6MDtcbiAgb3V0bGluZTowO1xuICBmb250LXNpemU6MTAwJTtcbiAgdmVydGljYWwtYWxpZ246YmFzZWxpbmU7XG59XG5cbmJvZHkge1xuICBsaW5lLWhlaWdodDoxO1xufVxuXG5hcnRpY2xlLGFzaWRlLGRldGFpbHMsZmlnY2FwdGlvbixmaWd1cmUsXG5mb290ZXIsaGVhZGVyLGhncm91cCxtZW51LG5hdixzZWN0aW9uIHtcbiAgZGlzcGxheTpibG9jaztcbn1cblxuYSB7XG4gIG1hcmdpbjowO1xuICBwYWRkaW5nOjA7XG4gIGZvbnQtc2l6ZToxMDAlO1xuICB2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTtcbiAgYmFja2dyb3VuZDp0cmFuc3BhcmVudDtcbn1cblxudGFibGUge1xuICBib3JkZXItY29sbGFwc2U6Y29sbGFwc2U7XG4gIGJvcmRlci1zcGFjaW5nOjA7XG59XG5cbmhyIHtcbiAgZGlzcGxheTpibG9jaztcbiAgaGVpZ2h0OjFweDtcbiAgYm9yZGVyOjA7XG4gIGJvcmRlci10b3A6MXB4IHNvbGlkICNjY2NjY2M7XG4gIG1hcmdpbjoxZW0gMDtcbiAgcGFkZGluZzowO1xufVxuXG5pbnB1dCwgc2VsZWN0IHtcbiAgdmVydGljYWwtYWxpZ246bWlkZGxlO1xufVxuXG5vbCwgdWwsIGxpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuaW1nIHtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgZm9udC1zaXplOjA7XG4gIGxpbmUtaGVpZ2h0OiAwO1xufVxuIiwiJHRhYmxldDogMTAyNHB4O1xuJG1vYmlsZTogNzY3cHg7XG5cbiRmb250LWZhbWlseTogJ0x1Y2lkYSBHcmFuZGUnLCfjg5Ljg6njgq7jg47op5LjgrQgUHJvTiBXMycsJ0hpcmFnaW5vIEtha3UgR290aGljIFByb04nLCfmuLjjgrTjgrfjg4Pjgq8nLCfjg6HjgqTjg6rjgqonLE1laXJ5byxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcblxuKiB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNsZWFyZml4OmJlZm9yZSxcbi5jbGVhcmZpeDphZnRlciB7XG4gICAgY29udGVudDogXCIgXCI7XG4gICAgZGlzcGxheTogdGFibGU7XG59XG5cbi5jbGVhcmZpeDphZnRlciB7XG4gICAgY2xlYXI6IGJvdGg7XG59XG5cbi5jbGVhcmZpeCB7XG4gICAgKnpvb206IDE7XG59XG5cbmh0bWwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi13aWR0aDogMzIwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuYm9keSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6ICMzMzM7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0UyRTFFMDtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0KXtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSl7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG59XG5cbmlucHV0W3R5cGU9dGV4dF0sXG5pbnB1dFt0eXBlPW51bWJlcl0sXG5pbnB1dFt0eXBlPXBhc3N3b3JkXSxcbmlucHV0W3R5cGU9dGVsXSxcbmlucHV0W3R5cGU9ZW1haWxdLFxuaW5wdXRbdHlwZT1udW1iZXJdLFxuaW5wdXRbdHlwZT1zdWJtaXRdLFxudGV4dGFyZWEsXG5zZWxlY3QsXG5vcHRpb24sXG5idXR0b24sXG5sYWJlbCB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR0YWJsZXQpe1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKXtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbn1cblxuaW5wdXRbdHlwZT1zdWJtaXRdLFxuYnV0dG9uIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmlucHV0W3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG5pbnB1dFt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbmlucHV0W3R5cGU9XCJudW1iZXJcIl0ge1xuICAgIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG5pbnB1dFt0eXBlPXRleHRdLFxuaW5wdXRbdHlwZT1udW1iZXJdLFxuaW5wdXRbdHlwZT1wYXNzd29yZF0sXG5pbnB1dFt0eXBlPXRlbF0sXG5pbnB1dFt0eXBlPWVtYWlsXSxcbmlucHV0W3R5cGU9bnVtYmVyXSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk4OTg5ODtcbiAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgbGluZS1oZWlnaHQ6IDQ0cHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgJjpmb2N1cyB7XG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICM3MDcwNzA7XG4gICAgfVxufVxuXG50ZXh0YXJlYSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzk4OTg5ODtcbiAgICBwYWRkaW5nOiA4cHggMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuc2VsZWN0IHtcbiAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTg5ODk4O1xuICAgIHBhZGRpbmc6IDAgNTRweCAwIDEwcHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2Fzc2V0cy9pbWFnZXMvY29tbW9uL3NlbGVjdF9ib3guc3ZnKTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogNDRweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICAmOmZvY3VzIHtcbiAgICAgICAgcGFkZGluZzogMCA1M3B4IDAgOXB4O1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjNzA3MDcwO1xuICAgIH1cbn1cblxuLyrjgIBJRTExLElFMTDjgIAqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpLCAoLW1zLWhpZ2gtY29udHJhc3Q6IG5vbmUpIHtcbiAgICBzZWxlY3Q6bm90KDp0YXJnZXQpIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9zZWxlY3RfYm94LnBuZyk7XG4gICAgfVxuICAgIHNlbGVjdDo6LW1zLWV4cGFuZCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuXG5pbnB1dFt0eXBlPWNoZWNrYm94XSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICBtYXJnaW46IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxubGFiZWwge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICYudmFsaWRhdGlvbiB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjQzMwRDIzICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlOGViICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gICAgfVxuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgbWFyZ2luLXRvcDogLTEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvYXNzZXRzL2ltYWdlcy9pY29uL2ljb25fY2hlY2suc3ZnKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XG4gICAgICAgIFxuICAgIH1cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbn1cbmlucHV0OmNoZWNrZWQrbGFiZWwge1xuICAgICY6YWZ0ZXIge1xuICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4xcztcbiAgICB9XG59XG5cbnAge1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbmEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbnAge1xuICAgIGEge1xuICAgICAgICBjb2xvcjogIzAxOWZlODtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxufVxuXG4ubm90LWRpc3BsYXkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5kLXRhYmxlIHtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmQtdHIge1xuICAgIGRpc3BsYXk6IHRhYmxlLXJvdy1ncm91cDtcbn1cblxuLmQtdGQge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmQtaWIge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uZGV2aWNlLXR5cGUtc3Age1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgLmRldmljZS10eXBlLXNwIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIC5kZXZpY2UtdHlwZS1wYyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufVxuXG5cblxuLnRleHQtbGVmdCB7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLnRleHQtcmlnaHQge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4udGV4dC1jZW50ZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnJlZC10ZXh0IHtcbiAgICBjb2xvcjogI0MzMEQyMztcbn1cblxuLnNtYWxsLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKXtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbn1cblxuLnNtYWxsLXgtdGV4dCB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpe1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxufVxuXG4ubGFyZ2UtdGV4dCB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpe1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxufVxuXG4ubGFyZ2UteC10ZXh0IHtcbiAgICBmb250LXNpemU6IDI0cHg7XG59XG5cbi5tYi14eC1sYXJnZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogNTBweCAhaW1wb3J0YW50O1xufVxuXG4ubWIteC1sYXJnZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogNDBweCAhaW1wb3J0YW50O1xufVxuXG4ubWItbGFyZ2Uge1xuICAgIG1hcmdpbi1ib3R0b206IDMwcHggIWltcG9ydGFudDtcbn1cblxuLm1iLW1pZGRsZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ubWItc21hbGwge1xuICAgIG1hcmdpbi1ib3R0b206IDE1cHggIWltcG9ydGFudDtcbn1cblxuLm1iLXgtc21hbGwge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHggIWltcG9ydGFudDtcbn1cblxuLm1iLXh4LXNtYWxsIHtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHggIWltcG9ydGFudDtcbn1cblxuLndpZHRoLXNtYWxsIHtcbiAgICB3aWR0aDogMTA4cHg7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSl7XG4gICAgICAgIHdpZHRoOiA1NHB4O1xuICAgIH1cbn1cblxuXG5cbi53aWR0aC1tZWRpdW0ge1xuICAgIHdpZHRoOiAzODBweDtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKXtcbiAgICAgICAgd2lkdGg6IDE5MHB4O1xuICAgIH1cbn1cblxuLndpZHRoLWxhcmdlIHtcbiAgICB3aWR0aDogNjAwcHg7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSl7XG4gICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICB9XG59XG5cbi5iZy13aGl0ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbn1cblxuLmJnLXVsdHJhLWxpZ2h0LWdyYXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNUY3Rjc7XG59XG5cbi5iZy1saWdodC1ncmF5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWYwO1xufVxuXG4uYmctZ3JheSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcyNzI3Mjtcbn1cblxuLmJnLXBpbmsge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmU4ZWJcbn1cblxuLmJnLWRhcmstYmx1ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAzNmRiN1xufVxuXG4uYm9yZGVyLWJvdHRvbS1kb3Qge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtaW4taGVpZ2h0OiAxcHg7XG4gICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDNweDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9saW5lX2RvdHRlLnBuZyk7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICB9XG59XG5cbi5yYWRpdXMge1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLm5vdC1yYWRpdXMge1xuICAgIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcbn1cblxuLmltYWdlIHtcbiAgICBpbWcge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG59XG5cbi5ib3gge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKSB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggMTBweDtcbiAgICB9XG4gICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gICAgLmJveC10dGwge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQjJCMkIyO1xuICAgICAgICBjb2xvcjogI0ZGRjtcbiAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgICBtYXJnaW46IDAgLTIwcHggMjBweDtcbiAgICAgICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtMjBweDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaSB7XG4gICAgICAgIHBhZGRpbmc6IDAgMCAyMHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogM3B4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9hc3NldHMvaW1hZ2VzL2NvbW1vbi9saW5lX2RvdHRlLnBuZyk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICAgIH1cbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgICAgZHQge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgfVxuICAgICAgICBkZCB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuLmZvcm0tbGF5b3V0IHtcbiAgICBkbCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGR0IHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgICB3aWR0aDogMTgwcHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpIHtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRkIHtcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxODBweCk7XG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKXtcbiAgICAgICAgICAgICAgICB3aWR0aDogYXV0bzsgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLnRleHQtaWNvbi1kYXJrLWJsdWUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMzZkYjc7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgcGFkZGluZzogNXB4O1xuICAgIGNvbG9yOiAjRkZGO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi50ZXh0LWljb24tcmVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQzMwRDIzO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBjb2xvcjogI0ZGRjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuXG5cblxuLmNlbnRlci1idXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJG1vYmlsZSkge1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICB9XG59XG5cbi5kaXNhYmxlZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50O1xuICAgICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgIH1cbn1cblxuLmJ1dHRvbiB7XG4gICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZzogMTVweCAwO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4yNXM7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLjc1O1xuICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHRhYmxldCkge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgJi5ibHVlLWJ1dHRvbiB7XG4gICAgICAgIGEsIGJ1dHRvbiwgbGFiZWwge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAxOWZlODtcbiAgICAgICAgICAgIGNvbG9yOiAjRkZGO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMCAjMDA4NGIyO1xuICAgICAgICB9XG4gICAgfVxuICAgICYuZGFyay1ibHVlLWJ1dHRvbiB7XG4gICAgICAgIGEsIGJ1dHRvbiwgbGFiZWwge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAzNmRiNztcbiAgICAgICAgICAgIGNvbG9yOiAjRkZGO1xuICAgICAgICB9XG4gICAgfVxuICAgICYuZ3JheS1idXR0b24ge1xuICAgICAgICBhLCBidXR0b24sIGxhYmVsIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1OTU3NTg7XG4gICAgICAgICAgICBjb2xvcjogI0ZGRjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmLmxpZ2h0LWdyYXktYnV0dG9uIHtcbiAgICAgICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzI3MjcyO1xuICAgICAgICAgICAgY29sb3I6ICNGRkY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgJi53aGl0ZS1idXR0b24ge1xuICAgICAgICBhLCBidXR0b24sIGxhYmVsIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5naG9zdC1idXR0b24ge1xuICAgIGEsIGJ1dHRvbiwgbGFiZWwge1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDE1cHggMDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjRkZGO1xuICAgICAgICBjb2xvcjogI0ZGRjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjI1cztcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNzU7XG4gICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0KSB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAmLmJsdWUtYnV0dG9uIHtcbiAgICAgICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICMwMTlmZTg7XG4gICAgICAgICAgICBjb2xvcjogIzAxOWZlODtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJi5kYXJrLWJsdWUtYnV0dG9uIHtcbiAgICAgICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICMwMzZkYjc7XG4gICAgICAgICAgICBjb2xvcjogIzAzNmRiNztcbiAgICAgICAgfVxuICAgIH1cbiAgICAmLmdyYXktYnV0dG9uIHtcbiAgICAgICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICM1OTU3NTg7XG4gICAgICAgICAgICBjb2xvcjogIzU5NTc1ODtcbiAgICAgICAgfVxuICAgIH1cbiAgICAmLnllbGxvdy1idXR0b24ge1xuICAgICAgICBhLCBidXR0b24sIGxhYmVsIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogI0M0QzQzQTtcbiAgICAgICAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgICB9XG4gICAgfVxuICAgICYuYmxhY2stYnV0dG9uIHtcbiAgICAgICAgYSwgYnV0dG9uLCBsYWJlbCB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICMzMzM7XG4gICAgICAgICAgICBjb2xvcjogIzMzMztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmNsb3NlLWxpbmsge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBhLCBidXR0b24ge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBjb2xvcjogIzMzMztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIH1cbn1cblxuLnBhZ2UtdHRsIHtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDsgXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnJlYWQge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpe1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cbn1cblxuLnNlY3Rpb24tdHRsIHtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luOiAwIDAgMTBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi52YWxpZGF0aW9uIHtcbiAgICBib3JkZXItY29sb3I6ICNDMzBEMjMgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlOGViICFpbXBvcnRhbnQ7XG59XG5cbi52YWxpZGF0aW9uLXRleHQge1xuICAgIG1hcmdpbjogMCAwIDVweDtcbiAgICBjb2xvcjogI0MzMEQyMztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbn1cblxuLndyYXBwZXIge1xuICAgIHdpZHRoOiA5NDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAzMHB4IDA7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHRhYmxldCl7XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICBwYWRkaW5nOiAxNXB4O1xuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkbW9iaWxlKXtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgfVxufVxuXG4ubm9zY3JpcHQge1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbn1cblxuLmNvbnRlbnRzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICAgIHBhZGRpbmc6IDQwcHggMTIwcHggNjBweDtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAkdGFibGV0KXtcbiAgICAgICAgcGFkZGluZzogNDBweCA2MHB4IDYwcHg7XG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRtb2JpbGUpe1xuICAgICAgICBwYWRkaW5nOiAyMHB4IDE1cHggNTBweDtcbiAgICB9XG59XG5cbi5ibHVyIHtcbiAgICBmaWx0ZXI6IGJsdXIoNXB4KTtcbn1cblxuLnBvc2l0aW9uLWNlbnRlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLC01MCUpO1xufVxuXG5Aa2V5ZnJhbWVzIHpvb20ge1xuICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XG4gICAgfVxuXG4gICAgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxufVxuXG5cbkBrZXlmcmFtZXMgZmFkZWluIHtcbiAgICAwJSB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cblxuXG5Aa2V5ZnJhbWVzIGZhZGVvdXQge1xuICAgIDAlIHtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxufVxuXG5AbWVkaWEgcHJpbnQge1xuICAgIC5ub3QtcHJpbnQge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbn0iLCIudGlja2V0LWFwcC1zaG93IHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuLnRpY2tldC1hcHAge1xuICAgIHBhZGRpbmctdG9wOiA1NHB4O1xuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgLnRpY2tldC1hcHAtc2hvdyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICAudGlja2V0LWFwcC1oaWRlIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLnRpY2tldC1hcHAtaGVhZGVyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB6LWluZGV4OiAyMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAuY2xvc2Uge1xuICAgICAgICAgICAgYSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDE1cHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNGRkY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmZvb3RlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5zaXRlLXNlYWwge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAucHJldi1idXR0b24sIC5uZXh0LWJ1dHRvbiwgLmJsdWUtYnV0dG9uLCAuZ3JheS1idXR0b24sIC5saWdodC1ncmF5LWJ1dHRvbiB7XG4gICAgICAgIGJ1dHRvbiwgYSB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAuaWNvbi1wcmV2LXdoaXRlOmJlZm9yZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9IFxuICAgICAgICAuaWNvbi1uZXh0LXdoaXRlOmJlZm9yZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgfVxufSIsIi5tZW1iZXItc2hvdyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5tZW1iZXIge1xyXG4gICAgLm1lbWJlci1zaG93IHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5tZW1iZXItaGlkZSB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxufSIsIi8vIOOCueOCr+ODquODvOODs+WbuuacieOCueOCv+OCpOODq1xuLnNjcmVlbi0wMS0wMjUsIC5zY3JlZW4tMDEtMDM1IHtcbiAgICAuY29sdW1uLW9iamVjdCB7IFxuICAgICAgICB0b3A6IDIwMHB4ICFpbXBvcnRhbnQ7XG4gICAgIH0gXG4gICAgLmxpbmUtb2JqZWN0LTAgeyBcbiAgICAgICAgZGlzcGxheTpub25lO1xuICAgICB9XG59Il19 */", '', '']]

/***/ }),

/***/ "../../node_modules/style-loader/lib/addStyles.js":
/*!****************************************************************************************************************!*\
  !*** C:/Users/hataguchi/Desktop/workspace/Cinema Sunshine/frontend/node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../node_modules/style-loader/lib/urls.js":
/*!***********************************************************************************************************!*\
  !*** C:/Users/hataguchi/Desktop/workspace/Cinema Sunshine/frontend/node_modules/style-loader/lib/urls.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../../node_modules/postcss-loader/src??embedded!../../../node_modules/sass-loader/lib/loader.js??ref--14-3!./styles.scss */ "../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/sass-loader/lib/loader.js?!./src/styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./src/styles.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\hataguchi\Desktop\workspace\Cinema Sunshine\frontend\src\client\src\styles.scss */"./src/styles.scss");


/***/ })

},[[3,"runtime"]]]);
//# sourceMappingURL=styles.js.map