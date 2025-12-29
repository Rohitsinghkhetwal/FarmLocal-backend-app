import { Request, Response } from "express";
import { getProducts } from "../../products/product.service";
import {
  getCachedProducts,
  setCachedProducts,
} from "../../products/product.cache";

const products = async (req: Request, res: Response) => {
  try {
    console.log("this is req query ", req.query)
    const key = `products:${JSON.stringify(req.query)}`;
    const cached = await getCachedProducts(key);
    if (cached) return res.json(cached);

    const data = await getProducts(req.query);
    await setCachedProducts(key, data);

    return res.json(data);
  } catch (err) {
    return res.status(400).json({error: "Something went wrong !"})
  }
};

export { products}
