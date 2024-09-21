import { Rating } from "@mui/material"

export interface Destination {
    _id: string
    title: string
    country: string
    description: string
    imgSrc: string
    activities: string
    priceClass: string
    continent: string
    language: string
    temperature: number
    population: number
    ratings?: Rating[]
}

export interface Rating {
    userId: string
    rating: number
    title: string
    description: string
    date: string
}

export interface Comment{
    date: string
    title?: string
    text?: string
    value: number
}