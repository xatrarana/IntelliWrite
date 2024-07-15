"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { WiStars } from "react-icons/wi";
import instance from "@/lib/axios";
import { marked } from 'marked';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CustomButtonAiGenerativeProps = {
  setGenerateData: React.Dispatch<React.SetStateAction<string>>;
};
const CustomButtonAiGenerative = ({
  setGenerateData,
}: CustomButtonAiGenerativeProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const prompt = e.currentTarget.prompt.value;

    try {
      const res = await instance.post("/api/generate", { prompt });
      const html = await marked(res.data.answer);
      console.log(res.data.answer)
      setGenerateData(html);
      e.currentTarget.prompt.value = "";
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Dialog>
        <DialogTrigger  className="flex items-center gap-x-3 bg-slate-950 text-white py-1 px-2 rounded-md" suppressHydrationWarning>
            <WiStars fontSize={32} /> Generate your story using AI
        </DialogTrigger>
        <DialogContent>
            <div className="space-y-3 mt-5">
            <form onSubmit={handleOnSubmit} className="space-y-4">
              <div className="">
                {!loading && (
                  <textarea
                    name="prompt"
                    placeholder="write your thoughts"
                    className="w-full border-none focus-visible:outline-none"
                  ></textarea>
                )}

                {loading && (
                  <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                )}
              </div>
              <div className="float-end mt-3">
                <Button disabled={loading} type="submit">
                  {loading ? (
                   <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default CustomButtonAiGenerative;
