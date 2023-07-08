import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Chart } from "react-google-charts";
const API_URL = "https://wisdom-backend-zvv3.onrender.com";


export const options = {
  is3D: true,
  'width':330,
  'height':250,
  'legend':'left',
  chartArea: { left: 0, top: 0, right: 0, bottom: 0 }
};

const handlePieStats = (db)=>{
    const counts = {}
    for(let i=0; i<db.length; i++){
        const element = db[i].batch;
        counts[element] = (counts[element] || 0) + 1;
    }
    return [
        ["time", "total"],
        ["9 to 11 AM", counts[911]],
        ["2 to 4 PM", counts[24]],
        ["4 to 6 PM", counts[46]],
        ["7 to 9 PM", counts[79]],
      ];
}

const PieChart = ({Studentsdb}) => {
    const [pd, setPD] = useState(null);
    const piedata = handlePieStats(Studentsdb);
    useEffect(()=>{
        const handlePending = async ()=>{
            try{
                const res = await fetch(`${API_URL}/fetchPendingFee`)
                if(res.ok){
                    const pendingFeeData = await res.json()
                      
                    return setPD(pendingFeeData.data); 
                }
            }catch(e){
                console.log(e)
                return e;
            }
        }        
        handlePending()
    }, [])
  return (
    <>
    <Card border="dark" style={{ width: '100%', marginTop: '4rem'}}>
    <Card.Header>Statistics</Card.Header>
    <Card.Body>
      <Card.Title>Batch-Wise Chart</Card.Title>
      <Chart
      chartType="PieChart"
      data={piedata}
      options={options}
      width={"0rem"}
      height={"250px"}
      style={{padding: 0}}
    />
    </Card.Body>
  </Card>
  <Card border="dark" style={{ width: '100%', marginTop: '2rem'}}>
    <Card.Header>Reminder</Card.Header>
    <Card.Body>
    <Card.Title>Pending Fees</Card.Title>
    <ul className="list-group">
        {pd?.map((p)=>( 
            <li key={p.id} className={"list-group-item list-group-item-" + (p.pendingmonths > 2 ? "danger" : "warning")}>{p.name} has {p.pendingmonths} months fees pending !</li>
        ))}
        
    </ul>
    </Card.Body>
    </Card>
    </>
    

  );
};

export default PieChart;
