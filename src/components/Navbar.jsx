import GithubLogo from "../assets/github-mark.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="bg-gray-700 w-full text-white flex justify-between top-0 items-center shadow-lg">
      <div className="ml-9 font-bold font-Lato text-3xl">
        <h1 className="gradient-hover">Sorting Visualizer</h1>
      </div>
      <div className="bg-white rounded-full mt-3 mb-3 mr-9 hover:bg-gray-200">
        <a href="https://github.com/liuser23/visualizer">
          <img
            className="w-12 p-[1px] mb-[1px]"
            src={GithubLogo}
            alt="Link to Github Repo for Project"
          ></img>
        </a>
      </div>
    </div>
  );
}
