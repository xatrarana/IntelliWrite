"use client";
import React, { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";
import instance from "@/lib/axios";
import Link from "next/link";
import { Blog } from "@prisma/client";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]);

  const fetchResults = async (searchQuery: string) => {
    try {
      const response = await instance.post("/api/search", {
        query: searchQuery,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  useEffect(() => {
    if (query) {
      debouncedFetchResults(query);
    } else {
      setResults([]);
    }

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query, debouncedFetchResults]);

  return (
    <div className="relative ">
      <form className="flex items-center justify-center p-0.5">
        <CiSearch
          fontWeight={600}
          className="text-slate-900 ml-2"
          fontSize={30}
        />
        <Input
          className={cn(
            "text-slate-900 bg-transparent px-2 border-none shadow-none border-input-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
          )}
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {results.length > 0 && (
        <div className="absolute bg-white z-20 shadow-sm border mt-5 w-full p-1 rounded-md">
          <ul className="space-y-3">
            {results.map((result) => (
              <Link href={`/stories/${result.blog_slug}`} key={result.id}>
                <li className="py-2 hover:text-muted-foreground">
                  {result.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
