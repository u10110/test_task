import {Router, Request, Response, NextFunction } from 'express';
import {getProduct, productCreate, productDelete, productsList, productUpdate} from "../modules/products";
export const authRouter = Router();
import {Products} from '@prisma/client'


authRouter.get('/', async <Send>(req: Request, res: Response): Promise<void> => {

    const { search, price } = req.query
    const products: Products[]  = await productsList({
        title: search.toString(),
        description: search.toString(),
        price: []
    })

    res.json(products);
});

authRouter.post('/product/create', async <Send>(req: Request, res: Response): Promise<void> => {

    const data: Products = req.body
    const products: Products  = await productCreate(data)

    res.json(products);
});


authRouter.get('/product/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    const product: Products  = await getProduct(Number(id))

    res.json(product);
});

authRouter.post('/product/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    req.body
    const product: Products  = await productUpdate(Number(id), req.body)

    res.json(product);
});





authRouter.get('/product/delete/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    const  result  = await productDelete(Number(id));
    if(result)  {
        res.status(200).json({ message: 'Record deleted.' });
    } else {
        res.status(404).json({ message: 'Record not found.' });
    }

});

