import {PrismaClient, Products} from '@prisma/client'
import {ProductListParams} from '../interfaces/modules.interfaces';
import jwt, {JwtPayload} from 'jsonwebtoken';
const prisma = new PrismaClient()
//{ log: ['query', 'info', 'warn', 'error']}


export const productsList = async (params: ProductListParams): Promise<Products[]> => {
    const {title, description, price: [priceGt, priceLte ]} = params;

    return prisma.products.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            title: {
                                contains: title
                            }
                        },
                        {
                            description: {
                                contains: description
                            },
                        }
                    ]
                },
                {
                    price: {
                        gt: priceGt,
                        lte: priceLte
                    }
                }
            ]


        }
    });
}

export const productCreate = async (params: Products): Promise<Products> => {
    const {id, ...data} = params

    return prisma.products.create({
        data
    });
}

export const getProduct = async (id: number): Promise<Products> => {
    return prisma.products.findUnique({
        where: {
            id: id
        }
    });
}

export const productUpdate = async ( id: number, data: Products): Promise<Products> => {

    const {id: productId, ...productData} = data;
    return prisma.products.update({
        where: {
            id: id,
        },
        data: productData,
    });
}

export const productDelete = async (id: number): Promise<boolean> => {

    try{
            await prisma.products.delete({
                where: {
                    id: id
                }
            });

    } catch (RecordNotFound) {
        return false;
    }

    return true;

}
