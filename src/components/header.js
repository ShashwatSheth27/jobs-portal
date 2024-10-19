import { useState } from 'react';

function Header({ username, onLogout }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userAuthenticated = username !== undefined && onLogout !== undefined;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggles dropdown open/close on click
    };

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="flex items-center justify-between mt-12 ml-14 mr-24">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <img alt="Company Icon" src="/company-icon.png" className="h-11 w-40" />
                    </a>
                </div>
                <div className="flex gap-10 items-center">
                    <div>
                        <span>Contact</span>
                    </div>
                    {userAuthenticated && (
                        <div className="relative inline-block text-left">
                            <button
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 gap-3"
                                onClick={toggleDropdown}
                            >
                                <span>{username}</span> <span>▼</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button
                                            onClick={onLogout}
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
