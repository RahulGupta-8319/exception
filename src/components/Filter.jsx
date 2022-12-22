import React,{useState} from 'react'

const Filter = (props) => {
    let[title ,setTitle] = useState("")
    let[startingDate, setStartingDate] = useState("")
    let [endingDate, setEndingDate] = useState("")

    const filteredData = async () =>{
        console.log(title, startingDate, endingDate);
        let res = await fetch(`http://localhost:3001/getProduct?title=${title}&startingDate=${startingDate}&endingDate=${endingDate}`, )

        res = await res.json()
        if(res.status == false){
          alert(res.message)        
        }else{
          props.passData(res.data)
          // console.log(res);
          
        }
    }

  return (
    <div className='filter'>
        Filter
        <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/><br/><hr/>
        <label>Starting Date</label><input className='date-adj' type='date'  onChange={(e) => setStartingDate(e.target.value)}/><br/><hr/>
        <label>Ending Date</label><input type='date' value={endingDate} onChange={(e) => setEndingDate(e.target.value)}/><br/><br/>
        <button className='btn' onClick={filteredData}>apply</button>

    </div>
  )
}

export default Filter