import { graphql } from "core/gql";

export const ShowBox_ShowFragment = graphql(`
  fragment ShowBox_ShowFragment on ShowEntity {
    id
    attributes {
      name
      company
      slug
      bannerimage {
        data {
          attributes {
            formats
          }
        }
      }
      events(pagination: { limit: 100 }) {
        data {
          attributes {
            start
            curtainsUp
          }
        }
      }
    }
    ...ContactForm_ShowFragment
  }
`);

export const ContactForm_ShowFragment = graphql(`
  fragment ContactForm_ShowFragment on ShowEntity {
    id
    attributes {
      mainContact {
        data {
          id
          attributes {
            firstname
            lastname
            email
          }
        }
      }
      name
      company
    }
  }
`);
