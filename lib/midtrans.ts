import { MidtransClient } from "midtrans-node-client";

export const MidtransCore = new MidtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});
