import { gql } from '@apollo/client';
import client from '../lib/apollo-client';

const GET_BASE_PAGE = gql`
  query GetBasePage {
    pageBy(uri: "base") {
      title
      content
    }
  }
`;

export default async function BasePage() {
  const { data } = await client.query({
    query: GET_BASE_PAGE,
  });

  const page = data?.pageBy;

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div>
        <h1>Lorem ipsum</h1>
        <h2>Lorem ipsum</h2>
        <h3>Lorem ipsum</h3>
        <h4>Lorem ipsum</h4>
        <h5>Lorem ipsum</h5>
        <h6>Lorem ipsum</h6>
      </div>
    </>
  );
}
