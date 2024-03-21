import { useState ,useEffect, useRef} from 'react'
import './App.css'
import {v4 as uuidv4 } from 'uuid'

function App() {
  let[content,setContent]=useState("");
  let[contents,setContents]=useState([]);

  useEffect(()=>{
  let showcontent=localStorage.getItem("content");
  if(showcontent){
    let showcontents=JSON.parse(showcontent);
    setContents(showcontents)
  }
  },[])
let saveTLS=()=>{
    localStorage.setItem("content",JSON.stringify(contents))
   }

let handleEdit=(e)=>{
let id1=e.target.name;
let index=contents.findIndex(item=>{
  return id1===item.id;
})
setContent(contents[index].content)
let newcontent=contents.filter(item=>{
  return id1!=item.id
})
setContents(newcontent)
saveTLS();
  }

let handleCheckBox=(e)=>{
  let id1=e.target.name;
let index=contents.findIndex((item)=>{
return id1===item.id
})
let nc1=[...contents];
nc1[index].isCompleted=!nc1[index].isCompleted;
setContents(nc1)
console.log(nc1)
saveTLS()
}
let handleClick=(e)=>{
  if(e.target.value==""){
    alert("Write Something,input field cannot be empty");
    return;
  }
  setContents([...contents,{content,id:uuidv4(),isCompleted:false}])
  setContent("")
 }
  let handleChange=(e)=>{
setContent(e.target.value)
  }

  let handleDelete=(e)=>{
let id1=e.target.name;
let newcontent=contents.filter(i=>{
  return id1!=i.id;
})
setContents(newcontent)
saveTLS()
  }
  return (
    <>
    
<div className="Container">
<h1 className="text-pink-700 font-bold  text-3xl py-4">To-Do List</h1>
<input className="bg-pink-200 py-2 px-5" onChange={handleChange} type="text" value={content} placeholder="Add your task"></input>
<button className="bg-pink-700 hover:bg-pink-900 mx-7 px-5 py-2 rounded-md mr-5 ml-7" value={content} onClick={handleClick}>Add</button>
</div>

<div className="w-full bg-pink-200 text-black h-96 mx-auto rounded-md my-5" >
  {contents.map(item=>{
    
return <>
<div key={item.id}></div>
<div className="flex">
<input type="checkbox" name={item.id} value={item.isCompleted} className="mr-10 ml-7 my-5" onChange={handleCheckBox}></input>
<div className={item.isCompleted?"line-through":""} value={item.isCompleted}>{item.content}</div>
<button className="bg-pink-700 hover:bg-pink-900 mx-7 px-5 py-1 rounded-md my-2 mr-5 ml-10 " onClick={handleEdit} name={item.id}>Edit</button>
<button className="bg-pink-700 hover:bg-pink-900 mx-7 px-5 py-1 rounded-md my-2 mr-5 ml-10" name={item.id} onClick={handleDelete}>Delete</button>
</div>

</>
  })}
  </div>


</>  
  )
}

export default App