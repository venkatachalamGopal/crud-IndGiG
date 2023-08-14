import "../styles/Edit.css";
import React,{useEffect,useState} from 'react';
import {useParams,useNavigate} from "react-router-dom"

const EditData = () => {
    const{id}=useParams();
    const navigate=useNavigate();
    const[tname1,setTname1]=useState("");
    const[sdate1,setSdate1]=useState("");
    const[edate1,setEdate1]=useState("");
    const[player11,setPlayer11]=useState("");
    const[player21,setPlayer21]=useState("");
    const[player31,setPlayer31]=useState("");
    const[status1,setStatus1]=useState("");
    

    const getEditdata=async(id)=>{
        const req=await fetch(`https://641bec111f5d999a446ccd3d.mockapi.io/products/${id}`);
        const resp=await req.json();
        // console.log("Edit",resp);
        setTname1(resp.tournamentname);
        setSdate1(resp.startdate);
        setEdate1(resp.enddate);
        setPlayer11(resp.participantlist[0]);
        setPlayer21(resp.participantlist[1]);
        setPlayer31(resp.participantlist[2]);
        setStatus1(resp.status);

    }
    useEffect(()=>{
        getEditdata(id);
    },[])
    // console.log(tname,sdate,edate,player1,player2,player3);

    const sendToData=async(e,id)=>{
        e.preventDefault();
        const editedObj={
            tournamentname:tname1,
            startdate:sdate1,
            enddate:edate1,
            participantlist:[player11,player21,player31],
            status:status1
        }

        // console.log(editedObj);
        // console.log(id);

        await fetch(`https://641bec111f5d999a446ccd3d.mockapi.io/products/${id}`,{
            method:"PUT",
            body:JSON.stringify(editedObj),
            headers:{"Content-type":"application/json"}
        });
        
         navigate("/");



    }

    // const sendToData=(e,id)=>{
    //     e.preventDefault();
    //     console.log(id);
    // }

  return (
    <div className="EditDiv">
        <div className="form-div">
            <p><span className="title">Edit-form :</span></p>
            <form action="" className="Edit-form">
                <label htmlFor="tname">Tournament Name : </label>
                <input type="text" name="" id="tname" value={tname1} onChange={(e)=>setTname1(e.target.value)}
                autoComplete="off" />
                <label htmlFor="sdate">Start Date :</label>
                <input type="text" name="" id="sdate" value={sdate1} onChange={(e)=>setSdate1(e.target.value)}
                autoComplete="off" />
                <label htmlFor="edate">End Date :</label>
                <input type="text" name="" id="edate" value={edate1} onChange={(e)=>setEdate1(e.target.value)}
                autoComplete="off" />
                <label htmlFor="plist">Participant Lists:</label>
                <input type="text" name="" id="plist" value={player11} onChange={(e)=>setPlayer11(e.target.value)} autoComplete="off"/>
                <input type="text" name="" id="plist" value={player21} onChange={(e)=>setPlayer21(e.target.value)} autoComplete="off"/>
                <input type="text" name="" id="plist" value={player31} onChange={(e)=>setPlayer31(e.target.value)} autoComplete="off" />
                <label htmlFor="status">Status:</label>
                <input type="text" name="" id="status"value={status1} onChange={(e)=>setStatus1(e.target.value)}
                autoComplete="off" />
                <div>
                <button  className="savebtn" onClick={(e)=>sendToData(e,id)}>SAVE</button>
                <button className="cancelbtn" onClick={()=>navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditData
