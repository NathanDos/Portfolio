export default function Navbar() {
    return (
        <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 position-fixed top-0 left-0 z-50">
            <div className="text-lg font-bold">Nathan Dos Santos' Portfolio</div>
            <ul className="flex space-x-4">
                <li><a href="https://dossantosfamily.com" className="hover:text-gray-400">Home</a></li>
            </ul>
        </nav>
    )
}