import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useState } from "react";
import { BiFilter, BiSearchAlt2, BiArrowBack } from "react-icons/bi";

export default function SearchBar() {
  const [{ contactSearch }, dispatch] = useStateProvider();

  return (
<div className="flex py-3 pl-5 items-center gap-3 h-14" style={{ background: "linear-gradient(to right, #0072ff,#ffffff)" }}>
<div className="flex items-center gap-5 px-3 py-1 rounded-lg flex-grow" style={{ background: "linear-gradient(to right, #0072ff,#ffffff )" }}>
<div>
          <BiSearchAlt2 className="text-black cursor-pointer text-l" />
        </div>
        <div className="">
          <input
            type="text"
            placeholder= "Search or start new chat"
            
            className="bg-transparent text-sm focus:outline-none text-black w-full"
            value={contactSearch}
            onChange={(e) =>
              dispatch({
                type: reducerCases.SET_CONTACT_SEARCH,
                contactSearch: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BiFilter className="text-black cursor-pointer text-xl " />
      </div>
    </div>
  );
}
