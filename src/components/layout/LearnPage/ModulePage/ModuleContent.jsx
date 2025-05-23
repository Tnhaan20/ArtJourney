import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Video,
  CheckCircle,
  PenLine,
  Award,
} from "lucide-react";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { TailwindStyle } from "@/utils/Enum";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ModuleDetail({ moduleId, courseId, onBack }) {
  const [activeSection, setActiveSection] = useState("introduction");
  const navigate = useNavigate();

  // Hardcoded module data for module 1 with additional quiz and challenge sections
  const moduleData = {
    id: 1,
    title: "Early Christian Art",
    description:
      "Explore the beginnings of Christian art in the late Roman Empire and its development through the early Byzantine period.",
    sections: [
      {
        id: "introduction",
        title: "Introduction to Early Christian Art",
        type: "reading", // reading, video, quiz, or challenge
        completed: true,
        hasCompletionButton: true,
        content: `
          <p class="mb-4">Early Christian art, also called Paleo-Christian art or primitive Christian art, architecture, painting, and sculpture from the beginnings of Christianity until about the early 6th century, particularly the art of Italy and the western Mediterranean.</p>
          
          <p class="mb-4">The earliest identifiably Christian art consists of a few 2nd-century wall and ceiling paintings in the Roman catacombs (underground burial chambers), which continued to be decorated in a sketchy style derived from Roman impressionism through the 4th century.</p>
        `,
      },
      {
        id: "characteristics",
        title: "Key Characteristics",
        type: "reading",
        completed: false,
        hasCompletionButton: true,
        content: `
          <ul class="list-disc pl-6 mb-4">
            <li>Adaptation of Roman artistic forms</li>
            <li>Use of symbolism rather than direct representation</li>
            <li>Focus on salvation themes</li>
            <li>Avoidance of idolatry concerns</li>
          </ul>
        `,
      },
      {
        id: "important-works",
        title: "Important Works",
        type: "video",
        completed: false,
        hasCompletionButton: true,
        content: `
          <div class="mb-6">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <p class="text-gray-500">Video player would be embedded here</p>
            </div>
          </div>
          <p class="mb-4">The Good Shepherd, the Orant, and the story of Jonah were among the most popular motifs. The earliest Christian iconography tended to be symbolic. A simple rendering of a fish was sufficient to allude to Christ.</p>
          
          <p class="mb-4">The Catacombs of Rome contain most of the surviving examples of early Christian art. The Dura-Europos church in Syria is the oldest surviving church building, while the Dura-Europos house church contains the oldest surviving Christian paintings.</p>
        `,
      },
      {
        id: "module-quiz",
        title: "Knowledge Check Quiz",
        type: "quiz",
        completed: false,
        hasCompletionButton: false,
        content: `
          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Test Your Understanding</h3>
            <p class="mb-4">This quiz contains 5 questions about Early Christian Art. Complete this quiz to check your understanding of the key concepts covered in this module.</p>
            <p class="text-sm text-gray-600 mb-4">
              <strong>Time:</strong> 10 minutes<br>
              <strong>Passing Score:</strong> 80%
            </p>
            <div class="bg-white p-4 rounded border border-gray-200 mb-4">
              <p class="font-medium">Sample Question:</p>
              <p class="text-gray-700 mb-2">Which of the following was a common symbol in Early Christian Art?</p>
              <ul class="list-disc pl-6">
                <li>Fish (Ichthys)</li>
                <li>Eagle</li>
                <li>Lion</li>
                <li>Dragon</li>
              </ul>
            </div>
          </div>
        `,
      },
      {
        id: "module-challenge",
        title: "Art Analysis Challenge",
        type: "challenge",
        completed: false,
        hasCompletionButton: false,
        content: `
          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Practice Challenge</h3>
            <p class="mb-4">Test your ability to analyze Early Christian artwork by identifying symbols, themes, and techniques in various examples.</p>
            <p class="text-sm text-gray-600 mb-4">
              <strong>Difficulty:</strong> Intermediate<br>
              <strong>Estimated Time:</strong> 20 minutes
            </p>
            <p class="mb-2">In this challenge, you'll:</p>
            <ul class="list-disc pl-6 mb-4">
              <li>Analyze 3 different pieces of Early Christian art</li>
              <li>Identify key symbols and their meanings</li>
              <li>Explain the historical context of each artwork</li>
              <li>Compare techniques used across different examples</li>
            </ul>
          </div>
        `,
      },
    ],
    duration: 45, // minutes
    difficulty: "Intermediate",
    completed: false,
  };

  const handleMarkComplete = (sectionId) => {
    // This would update the completion status in a real app
    alert(`Section "${sectionId}" marked as complete!`);
    // In a real app, you would update the completion status here
  };

  // Find the active section content
  const activeContent =
    moduleData.sections.find((section) => section.id === activeSection)
      ?.content || "";

  // Find the active section
  const activeSection_data = moduleData.sections.find(
    (section) => section.id === activeSection
  );

  // Function to start quiz or challenge with courseId
  const handleStartActivity = (type) => {
    if (type === "quiz") {
      navigate(`/quiz/course/${courseId}/module/${moduleId}`);
    } else if (type === "challenge") {
      navigate(`/challenge/course/${courseId}/module/${moduleId}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
      {/* Sidebar - Course Navigation */}
      <div className="lg:w-1/4 border-r border-gray-200">
        {/* Module Header */}
        <div className="bg-amber-50 p-4 border-b border-amber-100">
          <button
            onClick={onBack}
            className="flex items-center text-[var(--color-primary-yellow)] hover:text-[var(--color-secondary-yellow)] mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Course</span>
          </button>
          <h1 className="text-lg font-bold text-[var(--color-primary-yellow)]">
            {moduleData.title}
          </h1>
        </div>

        {/* Module Info */}
        <div className="p-4 border-b border-gray-200 text-sm text-gray-600">
          <div className="flex items-center mb-2">
            <Clock
              size={16}
              className="mr-2 text-[var(--color-primary-yellow)]"
            />
            <span>{moduleData.duration} minutes</span>
          </div>
          <div className="flex items-center">
            <BookOpen
              size={16}
              className="mr-2 text-[var(--color-primary-yellow)]"
            />
            <span>Difficulty: {moduleData.difficulty}</span>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="p-2">
          <h3 className="px-2 py-1 text-sm font-medium text-gray-500 uppercase">
            Module Content
          </h3>
          <nav className="mt-2">
            {moduleData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                }}
                className={`w-full text-left px-4 py-3 flex items-center ${
                  activeSection === section.id
                    ? "bg-amber-50 text-[var(--color-primary-yellow)] border-l-2 border-[var(--color-primary-yellow)]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="mr-2">
                  <CompletedBox isCompleted={section.completed} size={16} />
                </div>
                <div className="mr-2 text-[var(--color-primary-yellow)]">
                  {section.type === "reading" ? (
                    <BookOpen size={16} />
                  ) : section.type === "video" ? (
                    <Video size={16} />
                  ) : section.type === "quiz" ? (
                    <PenLine size={16} />
                  ) : (
                    <Award size={16} />
                  )}
                </div>
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:w-3/4">
        {/* Content Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center">
            {activeSection_data?.type === "reading" ? (
              <BookOpen
                size={20}
                className="mr-3 text-[var(--color-primary-yellow)]"
              />
            ) : activeSection_data?.type === "video" ? (
              <Video
                size={20}
                className="mr-3 text-[var(--color-primary-yellow)]"
              />
            ) : activeSection_data?.type === "quiz" ? (
              <PenLine
                size={20}
                className="mr-3 text-[var(--color-primary-yellow)]"
              />
            ) : (
              <Award
                size={20}
                className="mr-3 text-[var(--color-primary-yellow)]"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {activeSection_data?.title}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div dangerouslySetInnerHTML={{ __html: activeContent }} />

          {/* Action button based on content type */}
          <div className="mt-8">
            {activeSection_data?.type === "quiz" && (
              <Button
                onClick={() => handleStartActivity("quiz")}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`}
              >
                Start Quiz
              </Button>
            )}

            {activeSection_data?.type === "challenge" && (
              <Button
                onClick={() => handleStartActivity("challenge")}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`}
              >
                Begin Challenge
              </Button>
            )}

            {activeSection_data?.hasCompletionButton && (
              <Button
                onClick={() => handleMarkComplete(activeSection_data.id)}
                className={`${TailwindStyle.HIGHLIGHT_FRAME} px-6 py-2 rounded-md`}
              >
                Mark as Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
