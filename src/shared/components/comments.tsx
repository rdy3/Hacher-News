import { format } from "date-fns";
import parse from "html-react-parser";

export interface CommentsProps {
  comments: [
    {
      id: number;
      created_at: string;
      author: string;
      text: string;
      points: number;
      parent_id: number;
      children: [
        {
          id: number;
          created_at: string;
          author: string;
          text: string;
          points: number;
          parent_id: number;
          children: [];
        }
      ];
    }
  ];
}
[];

export function Comments(props: CommentsProps) {
  const { comments } = props;
  return (
    <div>
      {comments.map((comments) => {
        return (
          <div className="pt-3 flex-row gap-3">
            <div className="pb-1 pt-2 font-semibold">{comments.author}</div>
            <div className="pb-7 ">{parse(comments.text)}</div>
            <div className="">
              {comments.children.map((comments) => {
                return (
                  <div>
                    <div className="pb-1 pt-2 font-semibold flex ">
                      {comments.author} -{" "}
                      <div className="flex text-slate-400 text-xs text-center">
                        {format(new Date(comments.created_at), "dd.MM.y")}
                      </div>
                    </div>
                    <div className="pb-7 ml-10">{parse(comments.text)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
