import React from "react";
import { usePosts } from "./PostContext";

function Input({handleTitleInput, handleDescriptionInput, title, description}) {

  return (
    <div className="layout-column justify-content-center align-items-center">
      <input className="w-100" type="text" placeholder="Enter Title" value={title} data-testid="title-input" onChange={handleTitleInput}/>
      <textarea className="mt-10 w-100" placeholder="Enter Description" value={description} data-testid="description-input" onChange={handleDescriptionInput}/>
    </div>
  );
}

export default Input;
