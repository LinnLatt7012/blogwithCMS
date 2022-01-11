
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getRecentPosts, getSimilarPosts } from '../services'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { Photo } from '../types/global'
type Post ={
    title: string,
    featuredImage: Photo,
    createdAt: string,
    slug: string
}
const PostWidget = ({categories, slug}:{slug:string | undefined,categories: String[] | undefined}) => {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
    useEffect(() => {
        // console.log(categories)
        if(slug){
            getSimilarPosts(categories,slug)
                .then((result)=>{
                    setRelatedPosts(result)
                })
        }else{
            getRecentPosts()
                .then((result)=>{setRelatedPosts(result)})
        }
    },[slug])
    // console.log("related",relatedPosts)
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
            {relatedPosts.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <Image
                        //   loader={grpahCMSImageLoader}
                        alt={post.title}
                        height="60px"
                        width="60px"
                        unoptimized
                        className="align-middle rounded-full"
                        src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                        <Link href={`/post/${post.slug}`} key={index}><span className="text-md" >{post.title}</span></Link>
                    </div>
                </div>
            ))}
    </div>
    )
}

export default PostWidget
