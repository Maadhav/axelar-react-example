"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./hooks/useAxelar.js":
/*!****************************!*\
  !*** ./hooks/useAxelar.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n/* harmony import */ var _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @axelar-network/axelarjs-sdk */ \"./node_modules/@axelar-network/axelarjs-sdk/dist/src/index.js\");\n/* harmony import */ var _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _abis_usdc_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abis/usdc.json */ \"./abis/usdc.json\");\n/* harmony import */ var _abis_fvm_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abis/fvm.json */ \"./abis/fvm.json\");\n/* harmony import */ var _abis_eth_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abis/eth.json */ \"./abis/eth.json\");\n\n\n\n\n\nconst FVM_USDC_ADDRESS = \"0x40721AE051B1D20c12038d7c408454B3Ca310Ea1\";\nconst FVM_CONTRACT_ADDRESS = \"0xb7ff4e2dbe970f94ca08083db9cb073266e3c357\";\nconst ETH_USDC_ADDRESS = \"0x220BdcCa5adA47b0c7d2723355161611411Bd834\";\nconst ETH_CONTRACT_ADDRESS = \"0x0aC2C6391264Fb640266567E17F1A6fE4242e1D5\";\nconst api = new _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.AxelarQueryAPI({\n    environment: _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.Environment.TESTNET\n});\nconst sdk = new _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.AxelarGMPRecoveryAPI({\n    environment: _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.Environment.TESTNET\n});\nasync function waitForTransaction(provider, txnHash) {\n    let receipt = await provider.waitForTransaction(txnHash, 1);\n    return receipt;\n}\nconst useAxelar = ()=>{\n    const execute = async ()=>{\n        var _txStatus_gasPaidInfo;\n        const ethereum = window.ethereum;\n        ethereum.request({\n            method: \"eth_requestAccounts\",\n            params: []\n        });\n        try {\n            await ethereum.request({\n                method: \"wallet_switchEthereumChain\",\n                params: [\n                    {\n                        chainId: \"0xc45\"\n                    }\n                ]\n            });\n        } catch (switchError) {\n            // This error code indicates that the chain has not been added to MetaMask.\n            if (switchError.code === 4902) {\n                try {\n                    await ethereum.request({\n                        method: \"wallet_addEthereumChain\",\n                        params: [\n                            {\n                                chainId: \"0xc45\",\n                                chainName: \"Filecoin - Hyperspace testnet\",\n                                rpcUrls: [\n                                    \"https://filecoin-hyperspace.chainup.net/rpc/v1\"\n                                ]\n                            }\n                        ]\n                    });\n                } catch (addError) {\n                    console.log(addError);\n                }\n            }\n        }\n        const provider = new ethers__WEBPACK_IMPORTED_MODULE_4__.ethers.providers.Web3Provider(ethereum);\n        const signer = provider.getSigner();\n        // initialize contracts using address and ABI\n        const fvmUSDC = new ethers__WEBPACK_IMPORTED_MODULE_4__.ethers.Contract(FVM_USDC_ADDRESS, _abis_usdc_json__WEBPACK_IMPORTED_MODULE_1__, signer);\n        const fvmContract = new ethers__WEBPACK_IMPORTED_MODULE_4__.ethers.Contract(FVM_CONTRACT_ADDRESS, _abis_fvm_json__WEBPACK_IMPORTED_MODULE_2__, signer);\n        // set the recipient address\n        const reciever = await signer.getAddress();\n        // set the amount of USDC to send\n        const amount = ethers__WEBPACK_IMPORTED_MODULE_4__.ethers.utils.parseUnits(\"1\", 6);\n        // STEP 1: Allow the FVM contract to spend USDC on your behalf\n        const fvmUSDCWithSigner = fvmUSDC.connect(signer);\n        const approveTx = await fvmUSDCWithSigner.approve(FVM_CONTRACT_ADDRESS, amount);\n        const approveTxReceipt = await waitForTransaction(provider, approveTx.hash);\n        console.log(\"ApproveTxReceipt: \", approveTxReceipt);\n        // STEP 2: Call the FVM contract to send USDC to the Axelar network\n        const fee = await api.estimateGasFee(_axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.CHAINS.TESTNET.FILECOIN, _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.CHAINS.TESTNET.ETHEREUM, \"aUSDC\", undefined, 1.1);\n        console.log(\"Fee: \", fee);\n        const fvmContractWithSigner = fvmContract.connect(signer);\n        const sendTx = await fvmContractWithSigner.send(ETH_CONTRACT_ADDRESS, reciever, amount, {\n            value: fee\n        });\n        const sendTxReceipt = await waitForTransaction(provider, sendTx.hash);\n        console.log(\"SendTxReceipt: \", sendTxReceipt);\n        // STEP 3: Query the Axelar network for the transaction status\n        console.log(\"View Status At: https://testnet.axelarscan.io/gmp/\" + sendTx.hash);\n        let txStatus = await sdk.queryTransactionStatus(sendTx.hash);\n        while(txStatus.status !== _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.GMPStatus.DEST_EXECUTED){\n            var _txStatus_gasPaidInfo1;\n            var _txStatus_gasPaidInfo_status;\n            console.log(\"Tx Status: \", txStatus.status, \"\\nGas Status: \", (_txStatus_gasPaidInfo_status = (_txStatus_gasPaidInfo1 = txStatus.gasPaidInfo) === null || _txStatus_gasPaidInfo1 === void 0 ? void 0 : _txStatus_gasPaidInfo1.status) !== null && _txStatus_gasPaidInfo_status !== void 0 ? _txStatus_gasPaidInfo_status : _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.GasPaidStatus.GAS_UNPAID);\n            txStatus = await sdk.queryTransactionStatus(sendTx.hash);\n            if (txStatus.error) {\n                console.error(\"Error: \", txStatus.error);\n                break;\n            }\n        }\n        var _txStatus_gasPaidInfo_status1;\n        console.log(\"Tx Status: \", txStatus.status, \"\\nGas Status: \", (_txStatus_gasPaidInfo_status1 = (_txStatus_gasPaidInfo = txStatus.gasPaidInfo) === null || _txStatus_gasPaidInfo === void 0 ? void 0 : _txStatus_gasPaidInfo.status) !== null && _txStatus_gasPaidInfo_status1 !== void 0 ? _txStatus_gasPaidInfo_status1 : _axelar_network_axelarjs_sdk__WEBPACK_IMPORTED_MODULE_0__.GasPaidStatus.GAS_UNPAID);\n        console.log(\"Bidging Completed: https://goerli.etherscan.io/tx/\" + txStatus.executed.transactionHash);\n    };\n    return {\n        execute\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useAxelar);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFzQixDQUFDSixPQUFPTCxJQUFJO1FBQzNELE1BQU8vQixTQUFTeUMsTUFBTSxLQUFLNUQsaUZBQXVCLENBQUU7Z0JBS2hEbUI7Z0JBQUFBO1lBSkZZLFFBQVFDLEdBQUcsQ0FDVCxlQUNBYixTQUFTeUMsTUFBTSxFQUNmLGtCQUNBekMsQ0FBQUEsK0JBQUFBLENBQUFBLHlCQUFBQSxTQUFTMkMsV0FBVyxjQUFwQjNDLG9DQUFBQSxLQUFBQSxJQUFBQSx1QkFBc0J5QyxNQUFNLGNBQTVCekMsMENBQUFBLCtCQUFnQ2xCLGtGQUF3QjtZQUUxRGtCLFdBQVcsTUFBTVAsSUFBSStDLHNCQUFzQixDQUFDSixPQUFPTCxJQUFJO1lBQ3ZELElBQUkvQixTQUFTNkMsS0FBSyxFQUFFO2dCQUNsQmpDLFFBQVFpQyxLQUFLLENBQUMsV0FBVzdDLFNBQVM2QyxLQUFLO2dCQUN2QyxLQUFNO1lBQ1IsQ0FBQztRQUNIO1lBS0U3QztRQUpGWSxRQUFRQyxHQUFHLENBQ1QsZUFDQWIsU0FBU3lDLE1BQU0sRUFDZixrQkFDQXpDLENBQUFBLGdDQUFBQSxDQUFBQSx3QkFBQUEsU0FBUzJDLFdBQVcsY0FBcEIzQyxtQ0FBQUEsS0FBQUEsSUFBQUEsc0JBQXNCeUMsTUFBTSxjQUE1QnpDLDJDQUFBQSxnQ0FBZ0NsQixrRkFBd0I7UUFFMUQ4QixRQUFRQyxHQUFHLENBQ1QsdURBQ0ViLFNBQVM4QyxRQUFRLENBQUNDLGVBQWU7SUFFdkM7SUFFQSxPQUFPO1FBQUVoRDtJQUFRO0FBQ25CO0FBRUEsK0RBQWVELFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vaG9va3MvdXNlQXhlbGFyLmpzP2QxMDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSBcImV0aGVyc1wiO1xuaW1wb3J0IHtcbiAgQXhlbGFyUXVlcnlBUEksXG4gIEVudmlyb25tZW50LFxuICBDSEFJTlMsXG4gIEF4ZWxhckdNUFJlY292ZXJ5QVBJLFxuICBHTVBTdGF0dXMsXG4gIEdhc1BhaWRTdGF0dXMsXG59IGZyb20gXCJAYXhlbGFyLW5ldHdvcmsvYXhlbGFyanMtc2RrXCI7XG5cbmltcG9ydCB1c2RjQWJpIGZyb20gXCIuLi9hYmlzL3VzZGMuanNvblwiO1xuaW1wb3J0IGZ2bUFiaSBmcm9tIFwiLi4vYWJpcy9mdm0uanNvblwiO1xuaW1wb3J0IGV0aEFiaSBmcm9tIFwiLi4vYWJpcy9ldGguanNvblwiO1xuXG5jb25zdCBGVk1fVVNEQ19BRERSRVNTID0gXCIweDQwNzIxQUUwNTFCMUQyMGMxMjAzOGQ3YzQwODQ1NEIzQ2EzMTBFYTFcIjtcbmNvbnN0IEZWTV9DT05UUkFDVF9BRERSRVNTID0gXCIweGI3ZmY0ZTJkYmU5NzBmOTRjYTA4MDgzZGI5Y2IwNzMyNjZlM2MzNTdcIjtcbmNvbnN0IEVUSF9VU0RDX0FERFJFU1MgPSBcIjB4MjIwQmRjQ2E1YWRBNDdiMGM3ZDI3MjMzNTUxNjE2MTE0MTFCZDgzNFwiO1xuY29uc3QgRVRIX0NPTlRSQUNUX0FERFJFU1MgPSBcIjB4MGFDMkM2MzkxMjY0RmI2NDAyNjY1NjdFMTdGMUE2ZkU0MjQyZTFENVwiO1xuY29uc3QgYXBpID0gbmV3IEF4ZWxhclF1ZXJ5QVBJKHsgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50LlRFU1RORVQgfSk7XG5jb25zdCBzZGsgPSBuZXcgQXhlbGFyR01QUmVjb3ZlcnlBUEkoe1xuICBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQuVEVTVE5FVCxcbn0pO1xuYXN5bmMgZnVuY3Rpb24gd2FpdEZvclRyYW5zYWN0aW9uKHByb3ZpZGVyLCB0eG5IYXNoKSB7XG4gIGxldCByZWNlaXB0ID0gYXdhaXQgcHJvdmlkZXIud2FpdEZvclRyYW5zYWN0aW9uKHR4bkhhc2gsIDEpO1xuXG4gIHJldHVybiByZWNlaXB0O1xufVxuXG5jb25zdCB1c2VBeGVsYXIgPSAoKSA9PiB7XG4gIGNvbnN0IGV4ZWN1dGUgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZXRoZXJldW0gPSB3aW5kb3cuZXRoZXJldW07XG5cbiAgICBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgcGFyYW1zOiBbXSB9KTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiBcIndhbGxldF9zd2l0Y2hFdGhlcmV1bUNoYWluXCIsXG4gICAgICAgIHBhcmFtczogW3sgY2hhaW5JZDogXCIweGM0NVwiIH1dLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoc3dpdGNoRXJyb3IpIHtcbiAgICAgIC8vIFRoaXMgZXJyb3IgY29kZSBpbmRpY2F0ZXMgdGhhdCB0aGUgY2hhaW4gaGFzIG5vdCBiZWVuIGFkZGVkIHRvIE1ldGFNYXNrLlxuICAgICAgaWYgKHN3aXRjaEVycm9yLmNvZGUgPT09IDQ5MDIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJ3YWxsZXRfYWRkRXRoZXJldW1DaGFpblwiLFxuICAgICAgICAgICAgcGFyYW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjaGFpbklkOiBcIjB4YzQ1XCIsXG4gICAgICAgICAgICAgICAgY2hhaW5OYW1lOiBcIkZpbGVjb2luIC0gSHlwZXJzcGFjZSB0ZXN0bmV0XCIsXG4gICAgICAgICAgICAgICAgcnBjVXJsczogW1wiaHR0cHM6Ly9maWxlY29pbi1oeXBlcnNwYWNlLmNoYWludXAubmV0L3JwYy92MVwiXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGFkZEVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYWRkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5XZWIzUHJvdmlkZXIoZXRoZXJldW0pO1xuXG4gICAgY29uc3Qgc2lnbmVyID0gcHJvdmlkZXIuZ2V0U2lnbmVyKCk7XG5cbiAgICAvLyBpbml0aWFsaXplIGNvbnRyYWN0cyB1c2luZyBhZGRyZXNzIGFuZCBBQklcbiAgICBjb25zdCBmdm1VU0RDID0gbmV3IGV0aGVycy5Db250cmFjdChGVk1fVVNEQ19BRERSRVNTLCB1c2RjQWJpLCBzaWduZXIpO1xuXG4gICAgY29uc3QgZnZtQ29udHJhY3QgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KFxuICAgICAgRlZNX0NPTlRSQUNUX0FERFJFU1MsXG4gICAgICBmdm1BYmksXG4gICAgICBzaWduZXJcbiAgICApO1xuXG4gICAgLy8gc2V0IHRoZSByZWNpcGllbnQgYWRkcmVzc1xuICAgIGNvbnN0IHJlY2lldmVyID0gYXdhaXQgc2lnbmVyLmdldEFkZHJlc3MoKTtcblxuICAgIC8vIHNldCB0aGUgYW1vdW50IG9mIFVTREMgdG8gc2VuZFxuICAgIGNvbnN0IGFtb3VudCA9IGV0aGVycy51dGlscy5wYXJzZVVuaXRzKFwiMVwiLCA2KTtcblxuICAgIC8vIFNURVAgMTogQWxsb3cgdGhlIEZWTSBjb250cmFjdCB0byBzcGVuZCBVU0RDIG9uIHlvdXIgYmVoYWxmXG4gICAgY29uc3QgZnZtVVNEQ1dpdGhTaWduZXIgPSBmdm1VU0RDLmNvbm5lY3Qoc2lnbmVyKTtcbiAgICBjb25zdCBhcHByb3ZlVHggPSBhd2FpdCBmdm1VU0RDV2l0aFNpZ25lci5hcHByb3ZlKFxuICAgICAgRlZNX0NPTlRSQUNUX0FERFJFU1MsXG4gICAgICBhbW91bnRcbiAgICApO1xuICAgIGNvbnN0IGFwcHJvdmVUeFJlY2VpcHQgPSBhd2FpdCB3YWl0Rm9yVHJhbnNhY3Rpb24ocHJvdmlkZXIsIGFwcHJvdmVUeC5oYXNoKTtcbiAgICBjb25zb2xlLmxvZyhcIkFwcHJvdmVUeFJlY2VpcHQ6IFwiLCBhcHByb3ZlVHhSZWNlaXB0KTtcblxuICAgIC8vIFNURVAgMjogQ2FsbCB0aGUgRlZNIGNvbnRyYWN0IHRvIHNlbmQgVVNEQyB0byB0aGUgQXhlbGFyIG5ldHdvcmtcbiAgICBjb25zdCBmZWUgPSBhd2FpdCBhcGkuZXN0aW1hdGVHYXNGZWUoXG4gICAgICBDSEFJTlMuVEVTVE5FVFtcIkZJTEVDT0lOXCJdLFxuICAgICAgQ0hBSU5TLlRFU1RORVRbXCJFVEhFUkVVTVwiXSxcbiAgICAgIFwiYVVTRENcIixcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIDEuMVxuICAgICk7XG4gICAgY29uc29sZS5sb2coXCJGZWU6IFwiLCBmZWUpO1xuXG4gICAgY29uc3QgZnZtQ29udHJhY3RXaXRoU2lnbmVyID0gZnZtQ29udHJhY3QuY29ubmVjdChzaWduZXIpO1xuICAgIGNvbnN0IHNlbmRUeCA9IGF3YWl0IGZ2bUNvbnRyYWN0V2l0aFNpZ25lci5zZW5kKFxuICAgICAgRVRIX0NPTlRSQUNUX0FERFJFU1MsXG4gICAgICByZWNpZXZlcixcbiAgICAgIGFtb3VudCxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGZlZSxcbiAgICAgIH1cbiAgICApO1xuICAgIGNvbnN0IHNlbmRUeFJlY2VpcHQgPSBhd2FpdCB3YWl0Rm9yVHJhbnNhY3Rpb24ocHJvdmlkZXIsIHNlbmRUeC5oYXNoKTtcbiAgICBjb25zb2xlLmxvZyhcIlNlbmRUeFJlY2VpcHQ6IFwiLCBzZW5kVHhSZWNlaXB0KTtcblxuICAgIC8vIFNURVAgMzogUXVlcnkgdGhlIEF4ZWxhciBuZXR3b3JrIGZvciB0aGUgdHJhbnNhY3Rpb24gc3RhdHVzXG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlZpZXcgU3RhdHVzIEF0OiBodHRwczovL3Rlc3RuZXQuYXhlbGFyc2Nhbi5pby9nbXAvXCIgKyBzZW5kVHguaGFzaFxuICAgICk7XG4gICAgbGV0IHR4U3RhdHVzID0gYXdhaXQgc2RrLnF1ZXJ5VHJhbnNhY3Rpb25TdGF0dXMoc2VuZFR4Lmhhc2gpO1xuICAgIHdoaWxlICh0eFN0YXR1cy5zdGF0dXMgIT09IEdNUFN0YXR1cy5ERVNUX0VYRUNVVEVEKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJUeCBTdGF0dXM6IFwiLFxuICAgICAgICB0eFN0YXR1cy5zdGF0dXMsXG4gICAgICAgIFwiXFxuR2FzIFN0YXR1czogXCIsXG4gICAgICAgIHR4U3RhdHVzLmdhc1BhaWRJbmZvPy5zdGF0dXMgPz8gR2FzUGFpZFN0YXR1cy5HQVNfVU5QQUlEXG4gICAgICApO1xuICAgICAgdHhTdGF0dXMgPSBhd2FpdCBzZGsucXVlcnlUcmFuc2FjdGlvblN0YXR1cyhzZW5kVHguaGFzaCk7XG4gICAgICBpZiAodHhTdGF0dXMuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBcIiwgdHhTdGF0dXMuZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIlR4IFN0YXR1czogXCIsXG4gICAgICB0eFN0YXR1cy5zdGF0dXMsXG4gICAgICBcIlxcbkdhcyBTdGF0dXM6IFwiLFxuICAgICAgdHhTdGF0dXMuZ2FzUGFpZEluZm8/LnN0YXR1cyA/PyBHYXNQYWlkU3RhdHVzLkdBU19VTlBBSURcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJCaWRnaW5nIENvbXBsZXRlZDogaHR0cHM6Ly9nb2VybGkuZXRoZXJzY2FuLmlvL3R4L1wiICtcbiAgICAgICAgdHhTdGF0dXMuZXhlY3V0ZWQudHJhbnNhY3Rpb25IYXNoXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4geyBleGVjdXRlIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VBeGVsYXI7XG4iXSwibmFtZXMiOlsiZXRoZXJzIiwiQXhlbGFyUXVlcnlBUEkiLCJFbnZpcm9ubWVudCIsIkNIQUlOUyIsIkF4ZWxhckdNUFJlY292ZXJ5QVBJIiwiR01QU3RhdHVzIiwiR2FzUGFpZFN0YXR1cyIsInVzZGNBYmkiLCJmdm1BYmkiLCJldGhBYmkiLCJGVk1fVVNEQ19BRERSRVNTIiwiRlZNX0NPTlRSQUNUX0FERFJFU1MiLCJFVEhfVVNEQ19BRERSRVNTIiwiRVRIX0NPTlRSQUNUX0FERFJFU1MiLCJhcGkiLCJlbnZpcm9ubWVudCIsIlRFU1RORVQiLCJzZGsiLCJ3YWl0Rm9yVHJhbnNhY3Rpb24iLCJwcm92aWRlciIsInR4bkhhc2giLCJyZWNlaXB0IiwidXNlQXhlbGFyIiwiZXhlY3V0ZSIsInR4U3RhdHVzIiwiZXRoZXJldW0iLCJ3aW5kb3ciLCJyZXF1ZXN0IiwibWV0aG9kIiwicGFyYW1zIiwiY2hhaW5JZCIsInN3aXRjaEVycm9yIiwiY29kZSIsImNoYWluTmFtZSIsInJwY1VybHMiLCJhZGRFcnJvciIsImNvbnNvbGUiLCJsb2ciLCJwcm92aWRlcnMiLCJXZWIzUHJvdmlkZXIiLCJzaWduZXIiLCJnZXRTaWduZXIiLCJmdm1VU0RDIiwiQ29udHJhY3QiLCJmdm1Db250cmFjdCIsInJlY2lldmVyIiwiZ2V0QWRkcmVzcyIsImFtb3VudCIsInV0aWxzIiwicGFyc2VVbml0cyIsImZ2bVVTRENXaXRoU2lnbmVyIiwiY29ubmVjdCIsImFwcHJvdmVUeCIsImFwcHJvdmUiLCJhcHByb3ZlVHhSZWNlaXB0IiwiaGFzaCIsImZlZSIsImVzdGltYXRlR2FzRmVlIiwidW5kZWZpbmVkIiwiZnZtQ29udHJhY3RXaXRoU2lnbmVyIiwic2VuZFR4Iiwic2VuZCIsInZhbHVlIiwic2VuZFR4UmVjZWlwdCIsInF1ZXJ5VHJhbnNhY3Rpb25TdGF0dXMiLCJzdGF0dXMiLCJERVNUX0VYRUNVVEVEIiwiZ2FzUGFpZEluZm8iLCJHQVNfVU5QQUlEIiwiZXJyb3IiLCJleGVjdXRlZCIsInRyYW5zYWN0aW9uSGFzaCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./hooks/useAxelar.js\n"));

/***/ })

});