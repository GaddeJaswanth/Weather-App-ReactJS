import { useState } from "react";
import {BsSearch} from 'react-icons/bs';

export default function Search(){

    var [city, setCity] = useState("");
    var [data, setData] = useState({"coord":{"lon":80.75,"lat":16.2713},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations",
    "main":{"temp":37.17,"feels_like":42.86,"temp_min":37.06,"temp_max":37.17,"pressure":1003,"humidity":43,"sea_level":1003,"grnd_level":1002},
    "visibility":10000,"wind":{"speed":4.62,"deg":287,"gust":6.34},
    "clouds":{"all":91},"dt":1688891661,"sys":{"type":2,"id":2083890,"country":"IN","sunrise":1688861429,"sunset":1688908402},
    "timezone":19800,"id":1253077,"name":"Kollipara","cod":200});

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
            <div className="md:flex lg:flex justify-center mt-5 sm:block">
                <input type="text" className="mr-5 px-7 py-5 h-5" value={city} placeholder="Enter Location" onChange={(e)=>{
                    setCity(e.target.value);
                }}/>
                <BsSearch className="cursor-pointer mt-2" size={25} onClick={()=>{
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
                    <h1 className="text-3xl font-bold p-5">Current Weather</h1>
                    <div className="md:flex lg:flex text-center mt-5 w-[90%] sm:block rounded-lg">
                        <div className="ml-[4%] p-5 lg:w-[40%] mr-[10%] rounded-lg text-white bg-gray-600 shadow-lg">
                            <table align="center">
                                <tr>
                                    <td><h1 className="text-xl">{data.name.toUpperCase()}</h1></td>
                                </tr>
                                <tr>
                                    <td className="p-5"><h1 className="text-5xl">{data.main.temp} °C</h1></td>
                                </tr>
                                <tr>
                                    <td align="center"><img align="center" src={"https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@4x.png"} alt="icon" /></td>
                                </tr>
                                <tr><td><h3 className="text-3xl">{data.weather[0].main}</h3></td></tr>
                            </table>
                        </div>
                            <table align="center" className="bg-gray-600 text-white lg:w-[40%] rounded-lg text-center shadow-lg">
                                <tr>
                                    <td><h1 className="text-xl">Description</h1></td>
                                    <td><h1 className="text-xl">{data.weather[0].description.toUpperCase()}</h1></td>
                                </tr>
                                <tr>
                                    <td><h1 className="text-xl">Feels Like</h1></td>
                                    <td><h1 className="text-2xl">{data.main.feels_like} °C</h1></td>
                                </tr>
                                <tr>
                                    <td><h1 className="text-xl">Min Temp</h1></td>
                                    <td><h1 className="text-2xl">{data.main.temp_min} °C</h1></td>
                                </tr>
                                <tr>
                                    <td><h1 className="text-xl">Max Temp</h1></td>
                                    <td><h1 className="text-2xl">{data.main.temp_max} °C</h1></td>
                                </tr>
                                <tr>
                                    <td><h1 className="text-xl">Pressure</h1></td>
                                    <td><h1 className="text-2xl">{data.main.pressure}</h1></td>
                                </tr>
                                <tr>
                                    <td><h1 className="text-xl">Humidity</h1></td>
                                    <td><h1 className="text-2xl">{data.main.humidity}</h1></td>
                                </tr>
                            </table>
                    </div>
                </div>
            )
            }
        </div>
    )
}