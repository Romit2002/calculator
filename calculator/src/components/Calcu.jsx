import React, {Fragment, useState} from 'react'
import '../css/calc.css';
import axios from "axios";
const Calcu = () => {
    const [res,resVal] = useState("");
    const [hist,showHistory] = useState(false);
    const [histData,setHistData] = useState([]);

    // useEffect(()=>{
      
    // })
    const display = (num) => {
        resVal(res+num);
    }
    const solve = async () => {
        try {
            let sum = eval(res);
            await resVal(sum);
            await saveHist(`${res}=${sum}`);
        } catch (error) {
            resVal("Error")
        }
        
    }

    const saveHist = async (ans) => {
      try {
        await axios.post("http://localhost:5000/addHist", { ans });
        console.log('Added!!!');
      } catch (error) {
        console.error('Error adding history:', error);
      }
    };

    const showData = async () => {
      try {
        const {data} = await axios.get("http://localhost:5000/getHist");
        console.log('Gottt!!');
        return data;
      } catch (error) {
        console.error('Error gettinng history:', error);
      }
    };
    const histClick = async () => {
      showHistory(!hist);
      const data = await showData();
      setHistData(data);
    }
  return (
    <Fragment>
    <h1>Calculator by Romit</h1>
    <div style={{textAlign:'center'}}>
    <span className='histSpan' style={{cursor:'pointer'}} onClick={histClick}>History</span></div>
    
    {hist && <Fragment><div className="model-wrapper" onClick={histClick}></div><div className="containerup">
    <h3 style={{textAlign: 'center'}}>Touch Outside the container to exit</h3>
    <ul>
    {histData.map((val,idx)=>{
      return(
        <li key={idx}>{val.result}</li>
        )
      })}
    </ul>
    </div></Fragment>}
    <div className='container'>
    <table>
      <tr>
        <td colspan="3"><input type='text' id='result' class='screen' value={res} onChange={(e)=>resVal(e.target.value)}/></td>
        <td>
          <input type='button' value='C' onClick={()=>resVal("")} className="clear"/>
        </td>
      </tr>
      <tr>
        <td>
          <input type='button' value='1' onClick={()=>display("1")} className="number"/>
        </td>
        <td>
          <input type='button' value='2' onClick={()=>display("2")} className="number"/>
        </td>
        <td>
          <input type='button' value='3' onClick={()=>display("3")} className="number"/>
        </td>
        <td>
          <input type='button' value='/' onClick={()=>display("/")} className="operator"/>
        </td>
        </tr>
        <tr>
        <td>
          <input type='button' value='4' onClick={()=>display("4")} className="number"/>
        </td>
        <td>
          <input type='button' value='5' onClick={()=>display("5")} className="number"/>
        </td>
        <td>
          <input type='button' value='6' onClick={()=>display("6")} className="number"/>
        </td>
        <td>
          <input type='button' value='-' onClick={()=>display("-")} className="operator"/>
        </td>
        </tr>
        <tr>
        <td>
          <input type='button' value='7' onClick={()=>display("7")} className="number"/>
        </td>
        <td>
          <input type='button' value='8' onClick={()=>display("8")} className="number"/>
        </td>
        <td>
          <input type='button' value='9' onClick={()=>display("9")} className="number"/>
        </td>
        <td>
          <input type='button' value='+' onClick={()=>display("+")} className="operator"/>
        </td>
      </tr>
      <tr>
        <td>
          <input type='button' value='.' onClick={()=>display(".")} className="decimal"/>
        </td>
        <td>
          <input type='button' value='0' onClick={()=>display("0")} className="number"/>
        </td>
        <td>
          <input type='button' value='=' onClick={solve} className="equal"/>
        </td>
        <td>
          <input type='button' value='*' onClick={()=>display("*")} className="operator"/>
        </td>
      </tr>
    </table>
  </div>
    </Fragment>
  )
}

export default Calcu
