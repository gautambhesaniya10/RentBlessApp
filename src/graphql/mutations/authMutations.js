import {gql} from '@apollo/client';
import client from '../apollo-client';

export const signUp = async payload => {
  const results = await client.mutate({
    mutation: gql`
      mutation signUp($userInfo: signUpInput) {
        signUp(userInfo: $userInfo) {
          token
          message
          user
        }
      }
    `,
    variables: {
      userInfo: payload,
    },
  });
  return results;
};

export const signIn = async payload => {
  const results = await client.mutate({
    mutation: gql`
      mutation signIn($userInfo: signInInput) {
        signIn(userInfo: $userInfo) {
          token
          message
          user
        }
      }
    `,
    variables: {
      userInfo: payload,
    },
  });
  return results;
};
