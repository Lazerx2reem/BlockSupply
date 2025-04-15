import { Web3Storage } from "web3.storage";

const token = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
const client = new Web3Storage({ token });

export async function uploadFile(file) {
  const cid = await client.put([file]);
  return cid;
}
