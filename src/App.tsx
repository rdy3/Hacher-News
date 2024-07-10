import { useEffect, useState } from "react";
import { CreateNews } from "./shared/components/create-news";

export interface NewsResponse {
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
  const [newsResponse, setNewsResponse] = useState<NewsResponse>();
  const [currentFilter, setCurrentFilter] = useState<
    "week" | "month" | "year" | "all"
  >("all");

  useEffect(() => {
    searchNews();
  }, [currentFilter]);

  async function searchNews() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search_by_date?tags=front_page&query=${text}&numericFilters=created_at_i<${currentFilter}`
    );
    const news = await response.json();
    console.log(news);
    setNewsResponse(news);
  }

  // async function filterNews() {
  //   const response = await fetch(
  //     `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i<${currentFilter}`
  //   );
  //   const news = await response.json();
  //   setNewsResponse(news);
  // }

  return (
    <div>
      <header className="flex justify-around mt-4">
        <div>
          <img src="" />
          Hacker News
        </div>

        <div className="flex space-x-8">
          <ul>
            <a href={`/top`}>Top</a>
          </ul>
          <ul>Ask</ul>
          <ul>Show</ul>
          <ul>Best</ul>
          <ul>New</ul>
          <ul>Active</ul>
        </div>
      </header>

      <div className="flex justify-center pt-10">Monday 5 September 2024</div>

      <div className="flex justify-center pt-10 space-x-5 ">
        <button
          onClick={() => setCurrentFilter("week")}
          className="rounded-lg border-2 border-slate-300 pl-1 pr-1 "
        >
          week
        </button>

        <button
          onClick={() => setCurrentFilter("month")}
          className="rounded-lg border-2 border-slate-300 pl-1 pr-1"
        >
          month
        </button>

        <button
          onClick={() => setCurrentFilter("year")}
          className="rounded-lg border-2 border-slate-300 pl-1 pr-1"
        >
          year
        </button>

        <button
          onClick={() => setCurrentFilter("all")}
          className="rounded-lg border-2 border-slate-300 pl-1 pr-1"
        >
          all
        </button>
      </div>

      <div className="flex justify-around ml-6 mt-5 space-x-5">
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="grow rounded-sm border-2 border-slate-300 "
        />
        <button
          onClick={() => searchNews()}
          className="rounded-full border-2 border-slate-300 pl-2 pr-2"
        >
          Search
        </button>
      </div>

      <div className="ml-6 mt-6 ">
        {newsResponse?.hits.map((news) => {
          return <CreateNews news={news} />;
        })}
      </div>
    </div>
  );
}
