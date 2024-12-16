### Next.js E-commerce

This repo contains a work in progress e-commerce responsive made with Next.js, Redux, Redux-persist, Hooks, SCSS, and BEM:)

# New Feature Implemented
### Adding & Removing a Product to the Wishlist
- A button labeled `**"Add to Wishlist"**` is available on the `**Product Details Page**`.

- Users can click the `**"Add to Wishlist"**` button to add the current product to their wishlist.
- Upon adding, the button text will update to `**" Remove from Wishlist"**`.

- If the product is already on the wishlist, the button will show `**" Remove from Wishlist"**`.
- Users can click `**" Remove from Wishlist"**` to remove the product from their wishlist.

### Display Wishlist Items in `Wishlist Page`
- Using Redux Persist Feature to persist the added items upon `Page Reload`.
- Displaying Wishlist Items on the Wishlist Page.
- With Each Item, I have added a `Add To Cart` button so the user can add the product to the Cart for purchase.
- There is a `Remove` Button with an `X` icon to remove the respective item from the Wishlist.
### Product Variants Selection
- Product Color Selection set to the URL as Query, like `?color=Blue/Yellow/Red/Green`
- Product Size Selection set to the URL as Query, like `?size=M/L/X/XL`
  - It persists the `Size` and `Color` Selection on Reload
  - In E-commerce, most of the time, we select a  product variant and save that product as a bookmark and sometimes we share the URL with others to view the UI
  - So, I am using the selected `Color` and Selected `Size` to the URL as a query so that we can view the same UI or selection whenever we visit the URL.
  - This also gives us the benefit of going `Previous` and `Next` to see the next and previous selections.
 
### Search Feature added
- `Search` Feature added
- Search Text set to the URL as Query, like `?search=SearchText`
  - It persists the `Search Text` on Reload
  - Now we can share our search results to show someone by sharing the `URL`, they can see the same result as we searched.
  - There is a `Clear` Search Button will appear if there is any search text, user can clear the `Search Result`

 ### Filtering by Category Feature added
- `Filter` Feature depending on Category added 
- Selected Category will be set to the URL as Query, like `?category=CategoryName`
  - It persists the `Selected` on Reload
  - Now we can share our Filtering results to show someone by sharing the `URL`, they can see the same result as we filtered.
  - By deselecting the Category `Query` will be removed from the `URL`.

## Getting started

It's easy to have it running locally.
- Just do a `yarn install` to install the dependencies.
- Then do a `yarn dev` to run it locally.
- Use `yarn run build` to build the app.

## Backend

The backend of the project it's only mocked data. You can find them in `utils/data`.
The API is being handled by Next API routes.

## Design

[This](https://www.xdguru.com/free-xd-ecommerce-ui-kit-by-iceo/) is the design of the project.

## Available pages

- Home page: /
- Products page: /products
- Product single page: /product/1
- Cart page: /cart
- Wishlist page: /wishlist
- Login page: /login
- Register page: /register
- 404 page: /page-not-found

## Screenshots

![Next Ecommerce screenshot](https://lucaspulliese.com/wp-content/uploads/2020/09/ecommerce-1.jpg)

![Next Ecommerce screenshot](https://lucaspulliese.com/wp-content/uploads/2020/09/ecommerce-2.jpg)

## New features added - Nov 2024

- Updated Next version.
- Added eslint config.
