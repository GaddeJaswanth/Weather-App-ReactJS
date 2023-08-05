import { useState } from "react";
import {BsSearch} from 'react-icons/bs';
import Header from "./Header";
import {MdNotes} from 'react-icons/md';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {HiMiniArrowDown, HiMiniArrowUp} from 'react-icons/hi2';
import {AiOutlineCompress} from 'react-icons/ai';
import {WiHumidity} from 'react-icons/wi';

export default function Search(){

    var [city, setCity] = useState("");
    var [data, setData] = useState(null);
    let iconcolor = 'yellow';

    const getData = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=c69b7b0d4facca47fbc79d53857e5c7b&units=metric&q=` + city;
        fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error();
            }
          return res.json();
        })
        .then((res) => {
          setData(res);
          // console.log(res.main);
        })
        .catch((err) => {
          console.log("error in get data", err);
          setData(null);
        });
        
        console.log(data);
    }

    return (
        <div align="center">
            <div className="flex ml-7 mt-2">
                <Header/>
                <h1 className="text-3xl font-semibold m-2 ml-6 text-white">Weather using ReactJS</h1>
                
            </div>
            <div className="flex justify-center mt-5">
                <input type="text" id='inputField' className="mr-6 px-12 py-6 h-5 rounded-3xl border-white" value={city} placeholder="Enter Location" onChange={(e)=>{
                    setCity(e.target.value);
                }} onKeyDown={(event)=>{
                    if(event.key==="Enter"){
                        getData();
                    }
                }}/>
                <BsSearch className="cursor-pointer mt-2 border-white" size={30} onClick={()=>{
                    getData();
                }}/>
                
            </div>
            {
                !Boolean(data) ? (
                <div className="text-white bg-black mt-10 w-[95%] text-2xl p-10">
                    <h1>Enter a valid Location</h1>
                </div>
                ):(
                //Current Weather
                    <div className="mt-6">
                        <h1 className="text-4xl font-sans py-4 text-white">Current Weather</h1>
                        <div className="lg:flex text-center mt-5 w-[90%] h-[100%] sm:block">
                            <div id="weather" className="ml-[4%] pt-6 pb-6 w-[40%] mr-[10%] rounded-3xl text-white shadow-lg sm:w-[80%]">
                                <table align="center" className="sm:w-[80%]">
                                    <tr>
                                        <td><h1 className="text-2xl font-semibold">{data.name.toUpperCase()}</h1></td>
                                    </tr>
                                    <tr>
                                        <td className="p-5"><h1 className="text-5xl">{data.main.temp} °C</h1></td>
                                    </tr>
                                    <tr>
                                        <td align="center"><img src={"https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@4x.png"} alt="icon" /></td>
                                    </tr>
                                    <tr><td><h3 className="text-3xl">{data.weather[0].main}</h3></td></tr>
                                </table>
                            </div>
                            <table id="details" className="ml-[4%] text-white w-[40%] rounded-3xl shadow-lg sm:w-[80%]">
                                <tr>
                                    <td>{<MdNotes size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline"> Description</h1></td>
                                    <td><h1 className="text-xl">{data.weather[0].description.toUpperCase()}</h1></td>
                                </tr>
                                <tr>
                                    <td>{<TbTemperatureCelsius size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline">Feels Like</h1></td>
                                    <td><h1 className="text-2xl">{data.main.feels_like} °C</h1></td>
                                </tr>
                                <tr>
                                    <td>{<HiMiniArrowDown size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline">Min Temp</h1></td>
                                    <td><h1 className="text-2xl">{data.main.temp_min} °C</h1></td>
                                </tr>
                                <tr>
                                    <td>{<HiMiniArrowUp size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline">Max Temp</h1></td>
                                    <td><h1 className="text-2xl">{data.main.temp_max} °C</h1></td>
                                </tr>
                                <tr>
                                    <td>{<AiOutlineCompress size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline">Pressure</h1></td>
                                    <td><h1 className="text-2xl">{data.main.pressure}</h1></td>
                                </tr>
                                <tr>
                                    <td>{<WiHumidity size={30} className="inline mr-1" color={iconcolor}/>} <h1 className="text-xl inline">Humidity</h1></td>
                                    <td><h1 className="text-2xl">{data.main.humidity}</h1></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                )
            }

            <div id='footer'>
                <h2>Made by <u><a href="https://www.linkedin.com/in/jaswanth-gadde/" rel="noreferrer" target="_blank">Jaswanth Gadde</a></u></h2>
            </div>
        </div>
    )
}