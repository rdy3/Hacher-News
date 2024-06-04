import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Search_1 {
  hits: {
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: null;
    comment_text: null;
    objectID: string;
    story_title: string;
    created_at: string;
    num_comments: number;
  }[];
}

export function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState<Search_1>();

  useEffect(() => {
    fetch("http://hn.algolia.com/api/v1/search_by_date?tags=front_page")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSearch(data);
      });
  }, []);

  return (
    <div>
      <header className="flex justify-around mt-4">
        <div>
          <img src="" />
          Hacker News
        </div>

        <div className="flex space-x-8">
          <ul>Top</ul>
          <ul>Ask</ul>
          <ul>Show</ul>
          <ul>Best</ul>
          <ul>New</ul>
          <ul>Active</ul>
        </div>
      </header>

      <div className="flex justify-center pt-10">Monday 5 September 2024</div>

      <div className="flex justify-center pt-10 space-x-5">
        <ul>Points</ul>
        <ul>Link</ul>
        <ul>Age</ul>
        <ul>Replies</ul>
      </div>
      <div className="flex justify-around ml-6 mt-5 space-x-5">
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="grow rounded-sm border-2 border-slate-300 "
        />
        <button
          onClick={() => console.log(text)}
          className="rounded-full border-2 border-slate-300 pl-2 pr-2"
        >
          Search
        </button>
      </div>

      <div className="ml-6 mt-6 ">
        {search?.hits.map((news) => {
          return (
            <div className="justify-left " key={news.objectID}>
              <div className="gap-6 ">
                {news.title || news.story_title}{" "}
                {news.url !== undefined && (
                  <a
                    target="_blank"
                    href={news.url}
                    className="text-slate-400 text-xs place-self-center"
                  >
                    {new URL(news.url).hostname}
                  </a>
                )}
              </div>

              <div className="flex text-slate-400 text-xs mb-3">
                {news.points} points by {news.author} -{" "}
                {format(new Date(news.created_at), "dd.MM.y")} -{" "}
                {news.num_comments || 0} comments
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
