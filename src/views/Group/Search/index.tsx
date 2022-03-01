import React from "react";

function Search() {
  return (
    <div>
      <div className="bg-grey px-2 py-2 rounded-lg flex gap-4 items-center">
        <span className="flex items-center">
          <ion-icon
            name="search-outline"
            style={{ color: "#FFFFFF" }}
          ></ion-icon>
        </span>
        <input
          type="text"
          className="bg-grey text-light-grey text-xs w-full outline-0 placeholder:text-light-grey placeholder:capitalize"
          placeholder="search"
        />
      </div>
    </div>
  );
}

export default Search;
