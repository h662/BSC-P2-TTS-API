import { useEffect, useState } from "react";
import englishData from "../englishData.json";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const { day } = useParams();

  useEffect(() => {
    englishData.map((v, i) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, []);
  useEffect(() => console.log(dailyData), [dailyData]);

  return dailyData ? (
    <div className="min-h-screen max-w-screen-md mx-auto px-8 mt-20">
      <h1 className="text-center text-2xl font-semibold">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div>{dailyData.sentences[0].english}</div>
        <button
          className={`mt-2 ${isVisible ? "bg-transparent" : "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[0].korean}
        </button>
        <div className="mt-4 flex gap-2">
          <button className="border-2 border-black px-2 rounded-md">
            Prev
          </button>
          <button className="border-2 border-black px-2 rounded-md">
            Next
          </button>
          <button className="border-2 border-black px-2 rounded-md">
            Sound
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Detail;
