import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;
  return (
    <Fragment>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link
                href={{
                  pathname: "/[pid]",
                  query: { pid: product.id },
                }}
              >
                {product.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}
// SSG Static Site Generation fetch all data while build prepare and rendered pre rendered data as static ,
// npm run dev start serve as development
// after run npm run build cmd you can start production server on your local machine with npm start
// recomended mostly SSG as compare to SSR
// because SSR generate while server call but SSG pre fetched all data while build process and shows all data as static

export const getStaticProps = async () => {
  console.log("Re-Genertation..");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data", // if issue while conected with database we can redirect it to somewhere else route
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true }; // if data has some issue we can use notFound to show 404 error page
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // ISR Incremental Static Regeneration which work as useEffect to update page after given time completed
    // notFound: true, //if notFound is true is returns 404 error pages
  };
};
