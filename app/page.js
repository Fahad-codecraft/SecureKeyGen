"use client"
import { useState } from "react"
import { useForm } from "@/utils/useForm";
import { getRandomChar, getSpecialChar } from "@/utils/utils";
import { toast } from "react-hot-toast";

export default function Home() {
  const [values, setValues] = useForm({
    length: 8,
    capital: true,
    small: true,
    number: true,
    symbol: false,
  });

  const [result, setResult] = useState("");

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90), //ascii unicode number for capital letters
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122), //ascii unicode number for small letters
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57), //ascii unicode number for numbers letters
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar(),
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field);


    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
      toast.success('Password generated', {
        duration: 1000
      });
    } else {
      toast.error(' Please select at least one option', {
        position: "top-center",
        duration: 1500
      });
    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success('Copied to your clipboard', {
        duration: 1000
      });
    } else {
      toast.error('No password to copy',{
        position: "top-center"
      });
    }
  };

  return (
    <main className="p-5 bg-[#303538] rounded-lg w-auto w-max-[400px] h-auto outline-none flex-col object-cover">
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="relative mb-[30px] rounded-md overflow-hidden bg-[#dce9f3] p-3 text-center flex justify-center items-center">
            <input
              className="p-2 rounded-lg  outline-none text-black font-sans"
              type="text"
              placeholder="Min 6 Char"
              value={result}
              readOnly />
            <div onClick={handleClipboard} className="bg-green-500 ml-2 rounded-lg p-2 cursor-pointer ">
              copy
            </div>
          </div>
          <div className="h-[40px] mt-5 rounded-md p-3 pr-0 flex justify-between items-center hover:bg-[#1a1d1f] transition duration-[0.3s]">
            <label htmlFor="length" className="mr-3 cursor-pointer w-[100%]">Length</label>
            <input
              type="number"
              id="length"
              min={6}
              max={20}
              name="length"
              value={values.length}
              onChange={setValues}
              className="outline-none w-[50px] h-[40px] border-none text-black p-[10px] pr-0 bg-[#f1f1f1] rounded-lg"
            />
          </div>
          <div className="h-[40px] mt-5 rounded-md p-3 pr-0 flex justify-between items-center hover:bg-[#1a1d1f] transition duration-[0.3s]">
            <label htmlFor="capital" className="mr-3 cursor-pointer w-[100%]">Capital</label>
            <input
              type="checkbox"
              id="capital"
              name="capital"
              className="outline-none border-none text-black p-[10px] mr-5 bg-[#f1f1f1] rounded-lg"
              checked={values.capital}
              onChange={setValues}
            />
          </div>
          <div className="h-[40px] mt-5 rounded-md p-3 pr-0 flex justify-between items-center hover:bg-[#1a1d1f] transition duration-[0.3s]">
            <label htmlFor="small" className="mr-3 cursor-pointer w-[100%]">Small</label>
            <input
              type="checkbox"
              id="small"
              name="small"
              className="outline-none border-none text-black p-[10px] mr-5 bg-[#f1f1f1] rounded-lg"
              checked={values.small}
              onChange={setValues}
            />
          </div>
          <div className="h-[40px] mt-5 rounded-md p-3 pr-0 flex justify-between items-center hover:bg-[#1a1d1f] transition duration-[0.3s]">
            <label htmlFor="number" className="mr-3 cursor-pointer w-[100%]">Number</label>
            <input
              type="checkbox"
              id="number"
              name="number"
              className="outline-none border-none text-black p-[10px] mr-5 bg-[#f1f1f1] rounded-lg"
              checked={values.number}
              onChange={setValues}
            />
          </div>
          <div className="h-[40px] mt-5 rounded-md p-3 pr-0 flex justify-between items-center hover:bg-[#1a1d1f] transition duration-[0.3s]">
            <label htmlFor="symbol" className="mr-3 cursor-pointer w-[100%]">Symbol</label>
            <input
              type="checkbox"
              id="symbol"
              name="symbol"
              className="outline-none border-none text-black p-[10px] mr-5 bg-[#f1f1f1] rounded-lg"
              checked={values.symbol}
              onChange={setValues}
            />
          </div>
          <button className="inline-block w-[100%] border-none outline-none h-[50px] text-white cursor-pointer bg-black rounded-md mt-[30px]" type="submit">Generate Password</button>
        </div>
      </form>
    </main>
  )
}
