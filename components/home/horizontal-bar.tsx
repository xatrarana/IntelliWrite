import { TopicWrapper } from "./topic-wrapper";

export const HorizontalBar = () => {
  return (
    <div className="no-scrollbar overflow-x-auto whitespace-nowrap">
      <TopicWrapper />
    </div>
  );
};
