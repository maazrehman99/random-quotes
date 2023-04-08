import React, { useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const [data, setData] = useState([]);
  const [randomColor, setRandomColor] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => setData(data.slice(0, 200)));
  }, []);

  const colorArray = [
    "#273c75",
    "#4a69bd",
    "#0a3d62",
    "#1e272e",
    "#c0392b",
    "#6D4C41",
    "#7D6608",
    "#7E5109",
    "#784212",
    "#6E2C00",
    "#712D00",
    "#78281F",
    "#7B1E36",
  ];

  const nextBtn = () => {
    const random = Math.floor(Math.random() * data.length);
    const randomColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    setRandomColor(randomColor);

    const newQuote = data[random].text;
    const newAuthor = data[random].author;
    setQuote(newQuote);
    setAuthor(newAuthor);
    localStorage.setItem("quote", newQuote);
    localStorage.setItem("author", newAuthor);

    document.getElementById("text").innerHTML = `"${newQuote}"`;
    document.getElementById("author").innerHTML = `― ${newAuthor}`;

    [document.body, document.getElementById("new-quote")].forEach((el) => {
      el.style.backgroundColor = randomColor;
      el.style.transition = "background-color 2s ease-in-out";
    });

    ["text", "author"].forEach((id) => {
      const el = document.getElementById(id);
      el.style.color = randomColor;
      el.style.transition = "color 2s ease-in-out";
    });
  };

  return (
    <div id="wrapper">
      <div id="quote-box">
        <p id="text">
          " Two things are infinite: the universe and human stupidity; and I'm
          not sure about the universe "
        </p>
        <p id="author">― Albert Einstein</p>
        <div>
          <a
            target="blank"
            href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
          >
            <AiFillTwitterCircle
              id="tweet-quote"
              style={{ color: randomColor, transition: "color 2s ease-in-out"}  }
            />
          </a>

          <button onClick={nextBtn} id="new-quote">
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
