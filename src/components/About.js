import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Markdown from "../components/Markdown";

export default function About() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/about.md")
      .then((res) => res.text())
      .then(setText);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 6, md: 14 }, px: { xs: 2, sm: 4, md: 0 } }}
    >
      <Markdown>{text}</Markdown>
    </Container>
  );
}
