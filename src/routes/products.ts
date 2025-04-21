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
 *         example: bot
 *       - name: priceFrom
 *         description: Prices range from
 *         in: query
 *         required: false
 *         type: string
 *       - name: priceTo
 *         description: Prices range to
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: list of found products
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/Product'
 */

productsRouter.get('/', async <Send>(req: Request, res: Response): Promise<void> => {
    try{
        const { searchText, priceFrom, priceTo } = req.query

        const products: Products[]  = await productsList({
            title: searchText.toString(),
            description: searchText.toString(),
            price: [Number(priceFrom), Number(priceTo)]
        })
        res.json(products);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid request body' });
    }
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
        res.json(product);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid request body' });
    }
});

/**
 * @swagger
 * /api/products/{id}:
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
 *         in: path
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


productsRouter.get('/:id', async <Send>(req: Request, res: Response): Promise<void> => {
    res.setHeader('Content-Type', 'application/json')
    try{
        const { id } =  req.params
        const product: Products  = await getProduct(Number(id))
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid query' });
    }
});


/**
 * @swagger
 * /api/products/{id}:
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
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Updated Product object
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Products'
 *       404:
 *         description: Product not found
 */

productsRouter.post('/:id', async <Send>(req: Request, res: Response): Promise<void> => {
    res.setHeader('Content-Type', 'application/json')
    try{
        const { id } =  req.params
        const product: Products  = await productUpdate(Number(id), req.body)
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }

    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid request body' });
    }
});


/**
 * @swagger
 * /api/products/delete/{id}:
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
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Product is deleted
 *       404:
 *         description: Product not found
 *
 */



productsRouter.get('/delete/:id', async <Send>(req: Request, res: Response): Promise<void> => {
    try{
        const { id } =  req.params
        const  result  = await productDelete(Number(id));
        if(result)  {
            res.status(200).json({ message: 'Record deleted.' });
        } else {
            res.status(404).json({ message: 'Record not found.' });
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Invalid request body' });
    }

});

