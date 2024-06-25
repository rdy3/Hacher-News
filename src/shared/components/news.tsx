import { Routes, Route, useParams } from "react-router-dom";

export function News() {
  const { newsId } = useParams();

  return <div>{newsId}</div>;
}
