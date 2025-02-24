import {
  json,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const data = {};

  return json({data});
};

export default function Demo() {
  return <div>Page demo</div>;
}
