import { type } from "os"

 type Photo = {url: string | null}
 type Author={
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
        categories:[]
}
