import React from 'react'

function Sidebar() {
    return (
        <aside className="mt-8
        w-full md:w-50 bg-gray-800 text-white flex-shrink-0
        fixed bottom-0 left-0 right-0 z-20 md:static md:h-auto
        flex justify-around items-center md:flex-col md:justify-start md:items-stretch
        py-2 md:p-4 md:border-r md:space-y-2 border-gray-400">

            <nav className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 w-full justify-around md:justify-start">
                <a href="#" className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                    Projects
                </a>
                <a href="#" className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                    Tickets
                </a>
                <a href="#" className="block py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200">
                    Users
                </a>
            </nav>
        </aside>
    )
}

export default Sidebar
