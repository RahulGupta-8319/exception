import React, {useEffect , useState}from 'react'

const Products = ({data}) => {
    console.log(data, "=>");

    let [product , setProduct] = useState([])
    let [page , setPage] = useState(0)    
      
    const prePage = () =>{
        if(page>0){
            setPage(page--)
            allProducts()
        }else{
            setPage(0)
            allProducts()
        }
    }
    const nextPage = () =>{
        setPage(page++)
        allProducts()
    }

    
    useEffect(()=>{
        allProducts()     
    },[])

    const allProducts = async()=>{
        let res = await fetch(`http://localhost:3001/getproducts?page=${page}`)
        res = await res.json()
        console.log(res.data);
        if(res.data){
            setProduct(res.data)
        }else{
            alert(res.message)
        }
    }
    


  return (
    
    
    <div >
        { data.length == 0 ?
          product.map((item) =>{ 
              return  <div className='item'>

                    <img src={item.image} alt='image' className='img'/>
                    <div>
                    <h3 className='title'>{item.title}</h3>
                    <p className='description'><b>Description:</b>{item.description}</p>
                    <p className='price'><b>Price:</b>{item.price}</p>
                    <p className='qty'><b>Qty:</b>{item.qty}</p>
                    <p className='date'><b>date:</b>{item.date}</p>
                    </div>
                     
                     </div>
            })
            :
            data.map(
                (item) =>{ 
                    return  <div className='item'>
      
                          <img src={item.image} alt='image' className='img'/>
                          <div>
                          <h3 className='title'>{item.title}</h3>
                          <p className='description'><b>Description:</b>{item.description}</p>
                          <p className='price'><b>Price:</b>{item.price}</p>
                          <p className='qty'><b>Qty:</b>{item.qty}</p>
                          <p className='date'><b>date:</b>{item.date}</p>
                          </div>
                           
                           </div>
                  }
            )       
        }     
        <div className="pre-next">
          <button className="pre"  onClick={prePage}>pre</button>
          <button className="next" onClick={nextPage}>next</button>
          </div>
    </div>
    
  )
}

export default Products