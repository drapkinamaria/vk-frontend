/* eslint-disable */
import React, { useRef, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { FactFetcherForm } from "./FactFetcherForm";
import { queryClient } from "../../../shared/lib/queryClient";
import { useFactFetcher } from "../model/useFactFetcher";
import "../../../ui/styles/styles.css";

export function FactFetcherComponent(): React.ReactElement {
  const { data, refetch } = useFactFetcher();
  const textareaRef = useRef<HTMLTextAreaElement>(null as HTMLTextAreaElement);

  useEffect(() => {
    if (textareaRef.current && data?.fact) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const firstSpaceIndex = data.fact.indexOf(" ");
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
    }
  }, [data]);

  const onFactSubmit = () => {
    refetch();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e)
  };

  return (
    <div className="fact-fetcher-container">
      <textarea
        ref={textareaRef}
        value={data?.fact || ""}
        onChange={handleTextChange}
        style={{ overflow: "hidden" }}
      />
      <FactFetcherForm onFactSubmit={onFactSubmit} />
    </div>
  );
}

export function FactFetcher(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <FactFetcherComponent />
    </QueryClientProvider>
  );
}
