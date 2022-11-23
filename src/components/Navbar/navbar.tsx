import { Link } from "react-router-dom";

export const NavBarPersonalite = ()=>{
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-left">
                <div className="flex flex-1 items-left justify-left sm:items-stretch sm:justify-left">
                  <div className="flex flex-shrink-0 items-center">
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Link className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" to="/">Home</Link>
                      <Link className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" to="/tasks">Tarefas</Link>
                    </div>
                  </div>
                </div>
                {/* Implementação Futura */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
      </nav>
    );
}