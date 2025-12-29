

import axios from "axios";
import { retry } from "../utils/retry";


export async function fetchExternalProducts() {
  return retry(async () => {
    const res = await axios.get(process.env.API_URL!, { timeout: 2000 });
    return res.data;
  });
}
