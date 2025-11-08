import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography, Link, Box } from "@mui/material";

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <Typography variant="h4" component="h1" gutterBottom {...props} />
        ),
        h2: ({ ...props }) => (
          <Typography variant="h5" component="h2" gutterBottom {...props} />
        ),
        p: ({ ...props }) => (
          <Typography
            variant="body1"
            paragraph
            fontSize={{ xs: "1rem", md: "1.25rem" }}
            {...props}
          />
        ),
        a: ({ href, ...props }) => (
          <Link href={href} target="_blank" rel="noopener" {...props} />
        ),
        ul: ({ ...props }) => (
          <Box component="ul" sx={{ pl: 3, mb: 2 }} {...props} />
        ),
        li: ({ ...props }) => (
          <Typography
            component="li"
            variant="body1"
            fontSize={{ xs: "1rem", md: "1.25rem" }}
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
