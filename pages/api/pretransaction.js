import { requestAsyncStorage } from "next/dist/client/components/request-async-storage.external";

const https = require("https");

const PaytmChecksum = require("paytmchecksum");

export default async function handler(req, res) {
	if (req.method === "POST") {

		// Insert an entry in the orders table with status as pending
		var paytmParams = {};

		paytmParams.body = {
			requestType: "Payment",
			mid: process.env.NEXT_PUBLIC_PAYTM_MID,
			websiteName: "YOUR_WEBSITE_NAME", // TODO: this add the website name here
			orderId: req.body.oid,
			callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
			txnAmount: {
				value: req.body.subTotal,
				currency: "INR",
			},
			userInfo: {
				custId: req.body.email,
			},
		};

		const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY) // TODO: add key in env once we get from paytm
			paytmParams.head = {
				signature: checksum,
			};

			var post_data = JSON.stringify(paytmParams);

			// It should be bloacking function so we are not using async instead we use promises
			const requestAsync = ()=>{
				return new Promise((resolve, reject)=>{
					var options = {
						/* for Staging */
						// hostname: "securegw-stage.paytm.in" /* for Production */, 
						hostname: 'securegw.paytm.in',
		
						port: 443,
						path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Content-Length": post_data.length,
						},
					};
		
					var response = "";
					var post_req = https.request(options, function (post_res) {
						post_res.on("data", function (chunk) {
							response += chunk;
						});
		
						post_res.on("end", function () {
							console.log("Response: ", response);
							resolve(JSON.parse(resolve).body) // resolve the response 
						});
					});
		
					post_req.write(post_data);
					post_req.end();
				})
			}

			let myResponse = await requestAsync()
			res.status(200).json(myResponse)
		
	}
}