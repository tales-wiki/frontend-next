const Sidebar = () => {
  return (
    <aside className="bg-white p-4 border border-slate-400 lg:rounded-lg">
      <h2 className="text-lg font-semibold mb-4">사이드바</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-blue-500">
              메뉴 1
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              메뉴 2
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              메뉴 3
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
