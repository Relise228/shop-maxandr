import Layout from "@components/Layout"
import ProductItem from "@components/reusable/ProductItem"
import db from "@utils/db"
import React, { useState } from "react"
import Product from "../../models/Product"
import "../../models/Category"
import "../../models/Brand"
import "../../models/Season"
import Category from "../../models/Category"
import Brand from "../../models/Brand"
import Season from "../../models/Season"
import { FilterBar } from "@components/FilterBar/FilterBar"
import { usePaginationHook } from "../../hooks/usePagination"
import { useRouter } from "next/router"
import Input from "@components/reusable/Input"

const limit = 10

const ProductsPage = ({ products, categoriesOptions, brandsOptions, seasonsOptions, totalProducts, totalProductsPages }) => {
  const router = useRouter()
  const { search: querySearch = "", sortBy = "", sortDir = "", page = 1 } = router.query

  const queryCategories = router.query.categories ? router.query.categories.split(",") : []
  const queryBrands = router.query.brands ? router.query.brands.split(",") : []
  const querySeasons = router.query.seasons ? router.query.seasons.split(",") : []
  const queryPrices = router.query.prices ? router.query.prices.split(",") : []

  const [filterSort, setFilterSort] = useState({
    filterState: { categories: queryCategories, brands: queryBrands, seasons: querySeasons, prices: queryPrices },
    sortState: {
      sortBy,
      sortDir
    }
  })
  const [search, setSearch] = useState(querySearch)

  const setFilter = (fieldName, value, newIsChecked) => {
    setFilterSort(prev => ({
      ...prev,
      filterState: {
        ...prev.filterState,
        [fieldName]: newIsChecked
          ? [...prev.filterState[fieldName], value]
          : prev.filterState[fieldName].filter(item => item !== value)
      }
    }))
  }

  const applyFilters = () => {
    const formattedFilterState = Object.entries(filterSort.filterState).reduce(
      (acc, [field, values]) => ({ ...acc, [field]: values.join(",") }),
      {}
    )
    router.query = { ...router.query, ...formattedFilterState, search }
    router.push({
      pathname: router.pathname,
      query: router.query
    })
  }

  const { Pagination } = usePaginationHook({
    totalPages: totalProductsPages,
    initialPageNumber: Number(page),
    onPageChangeCallback: newPageNumber => {
      router.query.page = newPageNumber
      router.push({
        pathname: router.pathname,
        query: router.query
      })
    }
  })

  const getValueLabel = arr => arr.map(({ _id, name }) => ({ label: name, value: _id }))

  const filterSections = React.useMemo(
    () =>
      categoriesOptions && brandsOptions && seasonsOptions
        ? [
            {
              header: "Categories",
              fieldName: "categories",
              list: [...getValueLabel(categoriesOptions)]
            },
            {
              header: "Brands",
              fieldName: "brands",
              list: [...getValueLabel(brandsOptions)]
            },
            {
              header: "Seasons",
              fieldName: "seasons",
              list: [...getValueLabel(seasonsOptions)]
            },
            {
              header: "Prices",
              fieldName: "prices",
              list: [
                { value: "0-50", label: "Less than $50" },
                { value: "50-100", label: "$50-$100" },
                { value: "100-200", label: "$100-$200" },
                { value: "200-300", label: "$200-$300" },
                { value: "300", label: "More than $300" }
              ]
            }
          ]
        : [],
    [categoriesOptions, brandsOptions, seasonsOptions]
  )

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-x-6 mb-4">
          <div className="col-span-4 flex justify-between">
            <div>
              Showing {(page - 1) * limit + 1}-{Number(page) * limit < totalProducts ? Number(page) * limit : totalProducts} of{" "}
              {totalProducts} results
            </div>
            <div>Sorting</div>
          </div>
          <Input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value ?? "")} />
        </div>
        <div className="grid grid-cols-5 gap-x-6">
          <div className="col-span-4 ">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
              {products.length ? products.map(product => <ProductItem key={product._id} product={product} />) : "No products found"}
            </div>
            {Pagination}
          </div>
          <FilterBar
            filterSections={filterSections}
            setFilter={setFilter}
            filterState={filterSort.filterState}
            applyFilters={applyFilters}
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1
  const { categories: filterCategories, brands: filterBrands, seasons: filterSeasons, prices: filterPrices, search } = query
  const skip = (page - 1) * limit
  const productsFilters = {
    ...(filterCategories && { category: { $in: filterCategories.split(",") } }),
    ...(filterBrands && { brand: { $in: filterBrands.split(",") } }),
    ...(filterSeasons && { season: { $in: filterSeasons.split(",") } }),
    ...(filterPrices && {
      $or: filterPrices.split(",").map(priceRange => ({
        price: {
          $gte: priceRange.split("-")[0] ? Number(priceRange.split("-")[0]) : undefined,
          $lt: priceRange.split("-")[1] ? Number(priceRange.split("-")[1]) : undefined
        }
      }))
    }),
    ...(search && {
      name: {
        $regex: search,
        $options: "i"
      }
    })
  }
  await db.connect()
  const result = await Promise.all([
    Product.find(productsFilters).populate("category").populate("brand").populate("season").skip(skip).limit(limit).lean(),
    Category.find().lean(),
    Brand.find().lean(),
    Season.find().lean()
  ])
  const totalProducts = await Product.countDocuments(productsFilters)
  const totalProductsPages = Math.ceil(totalProducts / limit)
  await db.disconnect()
  const [products, categoriesOptions, brandsOptions, seasonsOptions] = result.map(res => (res ? db.convertDocToObj(res) : null))
  return {
    props: {
      products,
      categoriesOptions,
      brandsOptions,
      seasonsOptions,
      totalProducts,
      totalProductsPages
    }
  }
}

export default ProductsPage
