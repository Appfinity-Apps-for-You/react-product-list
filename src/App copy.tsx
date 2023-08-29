import './App.css'

type Product = {
  category: string
  name: string
  stocked: boolean
  price: string
}

function ProductCategoryRow({category}: { category: string }) {
  return (
    <tr>
      <th colSpan= {2}>
        {category}
      </th>
    </tr>
  )
}

function ProductRow({product}: { product: Product}) {
  const name = product.stocked ? product.name : <span style= {{ color: 'red'}}>{product.name}</span> 
  return (
    <tr>
      <td> 
        {name}
      </td>
      <td>
        {product.price}
      </td>
    </tr>
  )
}

function ProductTable({products} : { products: Product[] }) {
  const rows: JSX.Element[] = []
  let lastCategory: string | null = null
  products.forEach ((product) => {
    if (product.category !== lastCategory) {
      rows.push (
        <ProductCategoryRow
          category= {product.category}
          key= {product.category}
        />
      )
    }
    rows.push(
      <ProductRow 
        product={product}
        key= {product.name}
      />
    )
    lastCategory= product.category
  })
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar() {
  return (
    <form>
      <input type= 'text' placeholder= 'Search...' />
      <label>
        <input type= 'checkbox' />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable ( {products} : { products: Product[]} ) {
  return (
    <div>
      <SearchBar />
      <ProductTable  products= {products} />
    </div>
  )
}

const productsList = [
  {category: "Fruits", price: "$1.50", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$2.50", stocked: true, name: "Lemon"},
  {category: "Fruits", price: "$2.00", stocked: false, name: "Orange"},
  {category: "Fruits", price: "$3.00", stocked: false, name: "Banana"},
  {category: "Vegetables", price: "$2.00", stocked: true, name: "Cucumber"},
  {category: "Vegetables", price: "$4.00", stocked: false, name: "Tomato"},
  {category: "Vegetables", price: "$1.00", stocked: true, name: "Potato"}
];

export default function App() {
  return (
    <div>
      <FilterableProductTable  products= {productsList} />
    </div>
  )
}

