import {Router, Request, Response } from 'express';
import {getProduct, productCreate, productDelete, productsList, productUpdate} from "../modules/products";
export const productsRouter = Router();
import {Products} from '@prisma/client'


/**
 * @swagger
 * definitions:
 *   Product:
 *     required:
 *       - title
 *       - price
 *     properties:
 *       id:
 *          type: number
 *       title:
 *          type: string
 *       description:
 *          type: string
 *       price:
 *          type: number
 *       count:
 *          type: number
 *
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     security:
 *       - api_key: string
 *     description: List of products with search and paginate
 *     tags: [Products]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: searchText
 *         description: Text search in Product
 *         in: query
 *         required: false
 *         type: string
 *         example: admin
 *       - name: searchPrice
 *         description: Prices range
 *         in: query
 *         required: false
 *         type: array
 *         items:
 *              type: number
 *         default: [0,10000000]
 *     responses:
 *       200:
 *         description: list of found products
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/Product'
 */

productsRouter.get('/', async <Send>(req: Request, res: Response): Promise<void> => {

    const { search, price } = req.query
    const products: Products[]  = await productsList({
        title: search.toString(),
        description: search.toString(),
        price: []
    })

    res.json(products);
});

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     security:
 *       - api_key: string
 *     description: Create product
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Created Product object
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Product'
 */


productsRouter.post('/create', async <Send>(req: Request, res: Response): Promise<void> => {
    res.setHeader('Content-Type', 'application/json')
    try{
        const data: Products = req.body
        const product: Products  = await productCreate(data)
        console.log(product)
        res.json(product);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid request body' });
    }
});

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     security:
 *       - api_key: string
 *     description: Get Product info
 *     tags: [Products]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  Product id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: list of found products
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/Product'
 */


productsRouter.get('/product/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    const product: Products  = await getProduct(Number(id))

    res.json(product);
});


/**
 * @swagger
 * /api/product/{id}:
 *   post:
 *     security:
 *       - api_key: string
 *     description: Update product
 *     tags: [Products]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         description: Product object
 *         schema:
 *            $ref: '#/definitions/Products'
 *     responses:
 *       200:
 *         description: Updated Product object
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Products'
 */

productsRouter.post('/product/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    req.body
    const product: Products  = await productUpdate(Number(id), req.body)

    res.json(product);
});


/**
 * @swagger
 * /api/product/delete/{id}:
 *   get:
 *     security:
 *       - api_key: string
 *     description: Delete Product
 *     tags: [Products]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  Product id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Product is deleted
 *
 */



productsRouter.get('/delete/:id', async <Send>(req: Request, res: Response): Promise<void> => {

    const { id } =  req.params
    const  result  = await productDelete(Number(id));
    if(result)  {
        res.status(200).json({ message: 'Record deleted.' });
    } else {
        res.status(404).json({ message: 'Record not found.' });
    }

});

