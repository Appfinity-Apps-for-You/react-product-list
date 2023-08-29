import { Box, Checkbox, FormControl, FormControlLabel, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './App.css'
import { useState } from 'react'

type Product = {
  category: string
  name: string
  stocked: boolean
  price: string
}

type SearchBarProps = {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (value: string) => void
  onInStockOnlyChange: (value: boolean) => void
}

type ProductTableProps = {
  products :  Product[] 
  filterText: string 
  inStockOnly: boolean
}


function ProductCategoryRow({category}: { category: string }) {
  return (
    <TableRow >
      <TableCell align= 'center' colSpan= {2}>
        {category}
      </TableCell>
    </TableRow>
  )
}

function ProductRow({product}: { product: Product}) {
  const name = product.stocked ? product.name : <span style= {{ color: 'red'}}>{product.name}</span> 
  return (
    <TableRow>
      <TableCell> 
        {name}
      </TableCell>
      <TableCell>
        {product.price}
      </TableCell>
    </TableRow>
  )
}

function ProductTable({ products, filterText, inStockOnly } : ProductTableProps) {
  const rows: JSX.Element[] = []
  let lastCategory: string | null = null
  products.forEach ((product) => {
    if (
      product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }
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
    <TableContainer  sx={{ maxWidth: '400px' }} component= {Paper}>
      <Table aria-label= 'spanning table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}: SearchBarProps) {
  return (
    <Box width= '600px' display= 'block' alignContent= 'center'>
      <form noValidate autoComplete= 'off'>
        <FormControl margin= 'normal' sx= {{ width: '400px' }} >
          <Input
           type= 'text' 
           value= {filterText} 
           placeholder= 'Search...'
           onChange={(e) => onFilterTextChange(e.target.value)}
        />
        </FormControl>
        <FormControlLabel 
          control={
            <Checkbox 
              checked= {inStockOnly} 
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
            />} 
            label= 'Only show products in stock' />
      </form>
    </Box>
  )
}

function FilterableProductTable ( {products} : { products: Product[]} ) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar 
        filterText= {filterText} 
        inStockOnly= {inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} 
        />
      <ProductTable  
        products= {products} 
        filterText= {filterText} 
        inStockOnly= {inStockOnly}/>
    </div>
  )
}

const productsList = [
  {category: 'Fruits', price: '$1.50', stocked: false, name: 'Apple'},
  {category: 'Fruits', price: '$2.50', stocked: true, name: 'Lemon'},
  {category: 'Fruits', price: '$2.00', stocked: false, name: 'Orange'},
  {category: 'Fruits', price: '$3.00', stocked: false, name: 'Banana'},
  {category: 'Vegetables', price: '$2.00', stocked: true, name: 'Cucumber'},
  {category: 'Vegetables', price: '$4.00', stocked: false, name: 'Tomato'},
  {category: 'Vegetables', price: '$1.00', stocked: true, name: 'Potato'}
];

export default function App() {
  return (
    <Box>
      <FilterableProductTable  products= {productsList} />
    </Box>
  )
}

