# Mini Shop

`Mini Shop` is a responsive e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS.

The project includes a homepage, category listing page, product detail page, and shopping cart flow. Product data is fetched from `dummyjson.com`, while cart state is stored locally in the browser with `localStorage`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios

## Features

- Responsive home page with hero, arrivals, top selling, dress style, and testimonials sections
- Category page with filters, sorting tools, and pagination
- Product detail page with gallery, product info, and recommendations
- Shopping cart with quantity updates and order summary
- Persistent cart state using `localStorage`
- Client-side routing with React Router

## Pages

- `/` - Home page
- `/cart` - Cart page
- `/category/:slug` - Category page
- `/product/:id` - Product detail page

## Project Structure

```text
mini-shop/
|- public/
|- src/
|  |- components/
|  |  |- footer/
|  |  `- header/
|  |- context/
|  |  `- CartContext.tsx
|  |- pages/
|  |  |- cart/
|  |  |- category/
|  |  |- home/
|  |  `- product-detail/
|  |- App.tsx
|  |- index.css
|  `- main.tsx
|- package.json
`- vite.config.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Run lint

```bash
npm run lint
```

## Notes

- Cart data is saved under the browser storage key `mini-shop-cart`.
- Some homepage sections fetch demo product data from `https://dummyjson.com/products`.
- The `dist/` folder is generated after running the build command.

## Author

Prepared for the `Mini Shop` project workspace.
