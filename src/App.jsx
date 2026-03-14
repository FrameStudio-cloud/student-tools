import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidbar"
import MainContent from "./components/MainContent"
import { useEffect, useState } from "react"


  import { sidebarLinks } from "./data/tools";

function App() {
  const[activeTab, setActiveTab] = useState("calculator")
  const[activeTool, setActiveTool] = useState("basic")

  useEffect(()=>{
    setActiveTool(sidebarLinks[activeTab][0])
  },[activeTab])

  return (
    <div className="bg-blue-700 p-10">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        <MainContent activeTab={activeTab} activeTool={activeTool}/>
      </div>
    </div>
  )
}

export default App