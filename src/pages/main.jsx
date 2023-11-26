import { Link } from "react-router-dom";
import englishData from "../englishData.json";

const Main = () => {
  return (
    <div className="min-h-screen max-w-screen-md mx-auto px-8 mt-20">
      <h1 className="text-center text-2xl font-semibold">Study English</h1>
      <ul className="mt-12">
        {englishData?.map((v, i) => (
          <Link key={i} to={`/${v.day}`}>
            <li className="text-xl mb-4 hover:text-gray-700">
              <span className="font-semibold mr-2">Day {v.day}</span>
              <span>{v.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Main;
