import { Link } from '@remix-run/react';

export type ProductcardExampleProps = {
  id: string;
  title: string;
  image: string;
  description?: string;
  url?: string;
  priceV2: number;
  handle: string;
};

export function Productcard_example({
  id,
  title,
  image,
  description,
  url,
  priceV2,
  handle,
}: ProductcardExampleProps) {
  return (
    <div className="w-full">
      <div>
        <div
          key={handle}
          className="w-full h-full rounded-[18.48px] border-[1.54px] shadow-lg"
        >
          <div>
            <img
              src={image}
              alt={title}
              className="w-full h-[450px] object-cover rounded-t-[18.48px]"
            />
          </div>
          <div className="flex items-center justify-between p-2">
            <span className="font-semibold text-lg">{title}</span>
            <span className="font-semibold text-lg">
              ${Math.floor(priceV2)}
            </span>
          </div>
          {description && (
            <div className="p-2">
              <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>
          )}
          {url && (
            <div className="p-2">
              <Link
                to={url}
                className="text-blue-500 hover:underline"
                prefetch="intent"
              >
                View Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
