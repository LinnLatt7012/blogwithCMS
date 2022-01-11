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
//String(graphqlAPI)
    const result = await request(String(graphqlAPI),query);
    return result.postsConnection.edges;

    
}