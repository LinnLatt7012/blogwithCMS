import {request, gql} from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINTS

export const getPosts= async () =>{
    const query = gql`
        query MyQuery {
            postsConnection{
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `
export const getCategories = async () => {
    const query = gql`
      query GetGategories {
          categories {
            name
            slug
          }
      }
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.categories;
  };
export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result = await request(graphqlAPI, query, { slug, categories });
  
    return result.posts;
  };
  
    return result.postsConnection.edges;

    
}
  export const getRecentPosts = async () => {
    const query = gql`
      query GetPostDetails() {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug 
        }
      }
    `;
    const result = await request(graphqlAPI, query);
    //   console.log(result)
    return result.posts;
  };