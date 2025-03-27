import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productsApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://test-express-vercel-chi.vercel.app" }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "/product"
    })
  })
})

export const { useGetAllProductQuery } = productApi