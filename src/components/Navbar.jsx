function Navbar({ activeTab, setActiveTab }) {
  const tabs = ["calculator", "DFD", "research"];
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
      <h1 className="font-bold text-xl font-[Pacifico]">student tools</h1>
      <nav className="flex gap-6">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize ${
              activeTab === tab
                ? "text-blue-500 font-bold border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;