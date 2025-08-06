import {ApolloClient, type ApolloQueryResult, gql, InMemoryCache} from "@apollo/client";
import type {QueryResponse} from "../utils/ResponseTypes.ts";

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
});

export const getData = async (lang: string): Promise<ApolloQueryResult<QueryResponse>> => {
    console.log("Passing lang: " + lang);
    return await client.query({
        query: gql`
          query renderedDataQuery($lang: String!) {
              getAllCertificates {
                images
              }
              getAboutShorts(lang: $lang) {
                subtext
                description
                services
                lang
              }
              getHeroes(lang: $lang) {
                images
                main_text
                subtext
                details
                lang
              }
              getAllPartners {
                images
              }
              getAbout(lang: $lang) {
                heading
                abilities
                lang
              }
              getAllEmployees {
                position
                image
                name
              }
              getGallery {
                image
                name
              }
            }
        `,
        fetchPolicy: "no-cache",
        variables: { lang },
    });
};

