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

  useEffect(() => {
    searchNews();
  }, []);

  async function searchNews() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search_by_date?tags=front_page&query=${text}`
    );
    const news = response.json();
    setNewsResponse(await news);
  }

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
