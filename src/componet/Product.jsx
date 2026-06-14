import {useState,useEffect} from 'react'

function Product() {

const [products,setProducts]=useState(()=>{
  const saved= localStorage.getItem('products')
  return saved?JSON.parse(saved):[]
})
const[Id,setId]=useState('');
const[name,setName]=useState('');
const[price,setPrice]=useState('');
const[ads,setAds]=useState('');
const[txet,setTxet]=useState('');
const[discount,setDiscount]=useState('');
const [search,setCearch]=useState('')


useEffect(()=>{
  localStorage.setItem('products',JSON.stringify(products))
},[products])

   const total=Number(price)+Number(ads||0)+Number(txet||0)-Number(discount||0)
    // save
    const saveclick=(e)=>{
      e.preventDefault();
       if(!name){ alert('Enter Name');return;}
        if(!price){ alert('Enter price'); return;}
      
 
        
      const productdata={name,price,txet,discount,ads,total:Number(price)+Number(ads||0)+Number(txet||0)-Number(discount||0)}

       if(Id){

        setProducts(products.map(p=>(
          p.id===Id?{...p,...productdata}:p
        )
      ))
      setId(null)
      setDiscount('')
      setName('')
      setPrice('')
      setTxet('')
      setAds('')
       }
       else{
        const newId = Math.max(0, ...products.map(p => p.id)) + 1;

        setProducts([...products,{id:newId,...productdata}])
       setName('')
       setPrice('')
        setDiscount('')
        setTxet('') 
         setAds('')
       
       }
    }
     const update=(p)=>{
       setAds(p.ads)
       setName(p.name)
       setPrice(p.price)
       setDiscount(p.discount)
       setTxet(p.txet)
       setId(p.id);
       window.scrollTo({
        top:0,
        behavior:'smooth'
     })
       
     }
    
     const dalete=(id)=>{
      setProducts(products.filter(p=>(p.id !==id)))
     }
     

       const  filterproducts=
       products.filter(p=>
        p.name.toLowerCase().includes(search.toLowerCase())
       )
      
        

  
  return (
    <div className='container'>
      <form onSubmit={saveclick} action=''>
        <h1>CURD</h1>
        <input type='text' placeholder='name' value={name} className='name'
        onChange={(e)=>setName(e.target.value)}/>
        <div className='content'>
          <input type='number' placeholder='price' value={price}
          onChange={(e)=>setPrice(e.target.value)}/>
          <input type='number' placeholder='ads' value={ads}
          onChange={(e)=>setAds(e.target.value)}/>
          <input type='number' placeholder='txet' value={txet}
          onChange={(e)=>setTxet(e.target.value)}/>
          <input type='number' placeholder='dascount' value={discount}
          onChange={(e)=> setDiscount(e.target.value)}/>
          <h4 className='total'>{total}</h4>
         
        </div>
         <button type='submit' className='save' >{Id?'update':'Add'}</button>
         <input className='search' value={search} placeholder='search' onChange={(e)=> setCearch(e.target.value)}/>
        <table>
     
          <thead>
            
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Ads</th>
              <th>txet</th>
              <th>Das</th>
              <th>total</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterproducts.map((p,index)=>
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.ads}</td>
              <td>{p.txet}</td>
              <td>{p.discount}</td>
              <td>{p.total}</td>
              <td>{<button type='button' className='update' onClick={()=>update(p)}>update</button>}</td>
              <td>{<button type='button' className='delete' onClick={()=>dalete(p.id)}>delete</button>}</td>
              
            </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default Product