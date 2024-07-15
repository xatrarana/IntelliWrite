"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import debounce from "lodash/debounce";
import instance from "@/lib/axios";
import { Topic } from "@prisma/client";

type ThreeDotProps = {
    setTopic: React.Dispatch<React.SetStateAction<string>>;
}
const ThreeDot = ({setTopic}:ThreeDotProps) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Topic[]>([]);

  const fetchTopics = async (query: string) => {
    if (query) {
      try {
        const response = await instance.get("/api/topics");
        setOptions(response.data.topics); // Assuming the API returns an array of strings
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
  };

  const debouncedFetchTopics = useCallback(debounce(fetchTopics, 300), []);

  useEffect(() => {
    debouncedFetchTopics(inputValue);
    return () => {
      debouncedFetchTopics.cancel(); // Cleanup on unmount
    };
  }, [inputValue, debouncedFetchTopics]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };


  const handleOnClick =  async () => {
    try {
       const resp =  await instance.post("/api/topics", { topic: inputValue });
       console.log(resp.data);
        setTopic(inputValue);
    } catch (error) {
        console.error("Error saving topic:", error);
        
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <DotsHorizontalIcon className="text-sm" />
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Select the topic</p>
          </div>
          <div className="grid items-center gap-4">
            <Input
              id="topic"
              value={inputValue}
              onChange={handleInputChange}
              className="col-span-2 h-8"
              list="topic-options"
            />
            <datalist id="topic-options">
              {options.map((option: Topic, index) => (
                <option key={index} value={option.topic_slug} />
              ))}
            </datalist>
          </div>
          <Button onClick={handleOnClick}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThreeDot;
