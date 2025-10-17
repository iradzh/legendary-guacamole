"use client";

import { useState } from "react";
import TopicViewer from "@/components/TopicViewer";
import { topics } from "@/data/topics";
import { LanguageLevel } from "@/types/topics";

export default function TopicsPage(): React.ReactElement {
  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel>('A1');

  return (
    <TopicViewer 
      topics={topics}
      selectedLevel={selectedLevel}
      onLevelChange={setSelectedLevel}
    />
  );
}

