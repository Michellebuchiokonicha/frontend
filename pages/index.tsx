import { Fragment, memo } from "react";
import { MainLayout } from "@/layouts";
import { Hero, Features, CategoryGrid, Brands } from "@/components/home";

import { v4 } from "uuid";
import { userFetcher } from "@/helpers";
import { CATEGORIES } from "@/store/category/categories.queries";
import { DEALS_OF_THE_DAY } from "@/store/seller/seller.queries";

const Home = function ({ categories, dealsOfTheDay }) {
  return (
    <MainLayout>
      <Hero />
      <Features />
      {dealsOfTheDay.objects.length > 0 ? (
        <CategoryGrid
          title="Deals Of The day"
          timer
          cards={dealsOfTheDay.objects.slice(0, 4)}
        />
      ) : null}
      <div>
        {categories !== undefined &&
          categories.length > 0 &&
          categories
            .slice(0, 8)
            .map(({ id, name }) => (
              <Fragment key={v4()}>
                {name !== undefined && <CategoryGrid title={name} sidebar />}
              </Fragment>
            ))}
      </div>
      {/* <Brands /> */}
    </MainLayout>
  );
};

export default memo(Home);

export async function getStaticProps() {
  const { categories } = await userFetcher(CATEGORIES);
  const variables = { page: 1, pageSize: 4 };
  const { dealsOfTheDay } = await userFetcher(DEALS_OF_THE_DAY, variables);

  function sortArray(array: any[]) {
    let arr = array;
    let n = arr.length;
    let tempArr = [];
    for (let i = 0; i < n - 1; i++) {
      tempArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    tempArr.push(arr[0]);
    arr = tempArr;
    return arr;
  }

  const sortedCategories = sortArray(categories);
  return {
    props: {
      categories: sortedCategories,
      dealsOfTheDay: dealsOfTheDay,
    },
  };
}
