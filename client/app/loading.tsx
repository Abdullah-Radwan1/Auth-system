"use server"
import React from "react"

const loading = () => {
 return (
  <div className="my-24 min-h-[80vh] flex justify-center items-center gap-4">
   loading... <div className="border-t-4  border-gray-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
 )
}

export default loading
