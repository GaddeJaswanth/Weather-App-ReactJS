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
                <input type="text" className="mr-5 px-5 py-5 h-5" value={city} placeholder="Enter Location" onChange={(e)=>{
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
                <div className="text-center mt-5 bg-black text-white w-[90%]">
                    <h1>Temperature : {data.main.temp}</h1>
                </div>
            )
            }
        </div>
    )
}