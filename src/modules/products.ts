import {PrismaClient, Products} from '@prisma/client'
import {ProductListParams} from '../interfaces/modules.interfaces';
import jwt, {JwtPayload} from 'jsonwebtoken';
const prisma = new PrismaClient()


export const productsList = async (params: ProductListParams): Promise<Products[]> => {
    const {title, description, price: [priceGt, priceLte ]} = params
    return prisma.products.findMany({
        where: {
            title: {
                contains: title
            },
            description: {
                contains: description
            },
            price: {
                gt: Number(priceGt),
                lte: Number(priceLte)
            }
        }
    });
}

export const productCreate = async (params: Products): Promise<Products> => {
    const {id, ...data} = params
    console.log(data)
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
    return prisma.products.update({
        where: {
            id: id,
        },
        data: data,
    });
}

export const productDelete = async (id: number): Promise<boolean> => {

    try{
            prisma.products.delete({
                where: {
                    id: id
                }
            });

    } catch (RecordNotFound) {
        return false;
    }

    return true;

}
