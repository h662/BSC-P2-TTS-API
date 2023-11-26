import { useEffect, useState } from "react";
import englishData from "../englishData.json";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { day } = useParams();

  const onClickPrev = () => {
    if (currentPage === 0) {
      setCurrentPage(dailyData.sentences.length - 1);
    } else {
      setCurrentPage(currentPage - 1);
    }

    setIsVisible(false);
  };

  const onClickNext = () => {
    if (currentPage === dailyData.sentences.length - 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage + 1);
    }

    setIsVisible(false);
  };

  const onClickSound = async () => {
    setIsLoading(true);

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
      {
        input: { text: dailyData.sentences[currentPage].english },
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const binaryData = atob(response.data.audioContent);

    const byteArray = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });

    const newAudio = new Audio(URL.createObjectURL(blob));

    document.body.appendChild(newAudio);
    newAudio.play();

    setTimeout(() => setIsLoading(false), 3000);
  };

  useEffect(() => {
    englishData.map((v, i) => {
      if (v.day === +day) {
        setDailyData(v);
      }
    });
  }, []);

  return dailyData ? (
    <div className="min-h-screen max-w-screen-md mx-auto px-8 mt-20">
      <h1 className="text-center text-2xl font-semibold">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div>{dailyData.sentences[currentPage].english}</div>
        <button
          className={`mt-2 text-left ${
            isVisible ? "bg-transparent" : "bg-black"
          }`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
        <div className="mt-4 flex gap-2">
          <button
            className="border-2 border-black px-2 rounded-md"
            onClick={onClickPrev}
          >
            Prev
          </button>
          <button
            className="border-2 border-black px-2 rounded-md"
            onClick={onClickNext}
          >
            Next
          </button>
          <button
            className="border-2 border-black px-2 rounded-md"
            onClick={onClickSound}
          >
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
