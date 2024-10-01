# Inventory Management Tool
A simple inventory management tool built with Next.js and Firebase.


## Features
- Add, remove, and update inventory items
- Search for specific items
- Display inventory items with their quantities

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Usage
- Open the application in your web browser: http://localhost:3000
- Click the "Add Item" button to add a new item to the inventory
- Enter the item name and click "Add" to add the item
- Use the search bar to find specific items
- Click the "Add" or "Remove" buttons to update the quantity of an item

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Deployed Version
You can also view the deployed version of the application on Vercel: https://pantry-management-tool.vercel.app/


## Code Structure
- firebase.js: Firebase configuration and initialization
- app/layout.js: Application layout component
- page.js: Main application component