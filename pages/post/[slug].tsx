import { useRouter } from 'next/router';
import React from 'react'
import { Categories, PostWidget, Author, Comments, CommentsForm,PostDetail } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { Post } from '../../types/global';
const PostDetails = ({post}:{post:Post&{content:{raw:{children:[]}}}}) => {
    const router = useRouter();
  if (router.isFallback) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            {/* <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> */}
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    // console.log(data)
    return {
      props: {
        post: data,
      },
    };
  }
  
  // Specify dynamic routes to pre-render pages based on data.
  // The HTML is generated at build time and will be reused on each request.
  export async function getStaticPaths() {
    const posts = await getPosts();
    return {
      paths: posts.map(({ node: { slug } }:{ node: { slug:string } }) => ({ params: { slug } })),
      fallback: true,
    };
  }
export default PostDetails

