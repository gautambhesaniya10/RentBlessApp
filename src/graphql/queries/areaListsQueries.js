import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAreaLists = async () => {
  const results = await client.query({
    query: gql`
      query AreaList {
        areaList {
          id
          area
          pin
          flag
        }
      }
    `,
  });

  return results;
};
