import { type } from "os"
export type Category = {
   name:String,
   slug:String
}
 export type Photo = {url: string}
 export type Author={
    bio: string | null,
    name:string,
    id:string,
    photo: Photo
 }
 export type Post= {
        title:string,
        author:Author,
        createdAt:string,
        slug:string,
        excerpt:string,
        featuredImage:Photo,
        categories:Category[]
}
