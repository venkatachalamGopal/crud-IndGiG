import "../styles/Home.css"
import React,{useEffect,useState} from 'react';
import{useNavigate} from "react-router-dom";
import {AiFillDelete,AiFillEdit} from "react-icons/ai"

const Home = () => {
    const navigate=useNavigate();
    const[data,setData]=useState([]);

    const[tname,setTname]=useState("");
    const[sdate,setSdate]=useState("");
    const[edate,setEdate]=useState("");
    const[player1,setPlayer1]=useState("");
    const[player2,setPlayer2]=useState("");
    const[player3,setPlayer3]=useState("");
    const[status,setStatus]=useState("");

    

    // getData function,,,
    const getApiData=async()=>{
        const req=await fetch(`https://641bec111f5d999a446ccd3d.mockapi.io/products`);
        const resp=await req.json();
        setData(resp)

    }
    
    useEffect(()=>{
        getApiData();
    },[])

    // console.log(data);
    const addData=async(e)=>{
        try {
        e.preventDefault();
        const newObj={
            tournamentname:tname,
            startdate:sdate,
            enddate:edate,
            participantlist:[player1,player2,player3],
            status:status
        }
        await fetch(`https://641bec111f5d999a446ccd3d.mockapi.io/products`,{
            method:"POST",
            body:JSON.stringify(newObj),
            headers:{"Content-Type":"application/json"}
        });
        getApiData();
        // Toclear input value
        setTname("");
        setSdate("");
        setEdate("");
        setPlayer1("");
        setPlayer2("");
        setPlayer3("");
        setStatus("");
        } catch (error) {
            alert("Something Wrong")
            
        }


        // console.log(newObj);
        // have to call all claer data
    }

    // Delete the Object 
    const deleteData=async(id)=>{
        try {
            let ans=confirm("Are you sure ! wants to Delete ?")
            if(ans){
                await fetch(`https://641bec111f5d999a446ccd3d.mockapi.io/products/${id}`,{
                    method:"DELETE"
                });
                getApiData();
            }

        } catch (error) {
             alert("Something Wrong");
        }
    }
  return (
    <>
        <div className="main-div">
            <h3><u>CRUD-OPERATION</u></h3>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Tournament Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Participant List</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((obj,index)=>(
                                <tr key={obj.id}>
                                    <td>{index+1}</td>
                                    <td>{obj.tournamentname}</td>
                                    <td>{obj.startdate}</td>
                                    <td>{obj.enddate}</td>
                                    <td>
                                        <select name="" id="">
                                            <option value={obj.participantlist[0]}>{obj.participantlist[0]}</option>
                                            <option value={obj.participantlist[1]}>{obj.participantlist[1]}</option>
                                            <option value={obj.participantlist[2]}>{obj.participantlist[2]}</option>
                                        </select>
                                    </td>
                                    <td>{obj.status}</td>
                                    <td style={{color:"red",textAlign:"center",cursor:'pointer'}}><AiFillDelete onClick={()=>deleteData(`${obj.id}`)}/></td>
                                    <td style={{color:"orange",textAlign:"center",cursor:'pointer'}}><AiFillEdit onClick={()=>navigate(`/editdata/${obj.id}`)}/></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <p><span className="title">Add Your New Team is Here..</span></p>
            <div className="form-div">
                <form action="" className="form">
                    <label htmlFor="tname">Tournament Name : </label>
                    <input type="text" name="" id="tname" value={tname} onChange={(e)=>setTname(e.target.value)} 
                    autoComplete="off" required />
                    <label htmlFor="sdate">Start Date :</label>
                    <input type="text" name="" id="sdate" value={sdate} onChange={(e)=>setSdate(e.target.value)}
                    autoComplete="off" placeholder="DD/MM/YYYY" required />
                    <label htmlFor="edate">End Date :</label>
                    <input type="text" name="" id="edate" value={edate} onChange={(e)=>setEdate(e.target.value)}
                    autoComplete="off" placeholder="DD/MM/YYYY" required />
                    <label htmlFor="plist">Participant Lists:</label>
                    <input type="text" name="" id="plist" value={player1} onChange={(e)=>setPlayer1(e.target.value)} 
                    autoComplete="off"placeholder="player1" required/>
                    <input type="text" name="" id="plist" value={player2} onChange={(e)=>setPlayer2(e.target.value)} 
                    autoComplete="off" placeholder="player2" required/>
                    <input type="text" name="" id="plist" value={player3} onChange={(e)=>setPlayer3(e.target.value)} 
                    autoComplete="off"placeholder="player3" required />
                    <label htmlFor="status">Status:</label>
                    <input type="text" name="" id="status"value={status} onChange={(e)=>setStatus(e.target.value)} 
                    autoComplete="off" required/>
                    <button onClick={(e)=>addData(e)} className="addbtn">ADD</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Home
