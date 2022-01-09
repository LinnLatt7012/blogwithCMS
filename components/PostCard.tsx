import React from 'react'

const PostCard = (
    { post }: {
        post:{title: String,
            excerpt: String }
    }
    ) => {
    return (
        <div>
            {post.title}
        </div>
    )
}

export default PostCard
