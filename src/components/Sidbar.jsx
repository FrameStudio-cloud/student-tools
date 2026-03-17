  import { sidebarLinks } from "../data/tools";
  
  function Sidebar({ activeTab, activeTool, setActiveTool}) {



  const links = sidebarLinks[activeTab] || [];

  return (
    <div className="w-48 h-screen bg-gray-50 border-r p-4 border-2 border-solid border-black">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li
            key={link}
            onClick={()=>setActiveTool(link)}
            className={`cursor-pointer p-2 rounded-lg capitalize ${activeTool === link ? "text-blue-500 bg-blue-50" : ""}`}
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;