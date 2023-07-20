import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xs sm:text-xl"><img className="h-5 w-5" src="https://img.freepik.com/free-icon/youtube_318-183441.jpg?w=360" alt="" />Youtube Clone</a>
        </div>
        <div className="flex-1 flex justify-center items-center"> 
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs rounded-3xl me-5"
            
          />
          <button onClick="/" className="btn btn-ghost">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost me-2 ms-2">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
