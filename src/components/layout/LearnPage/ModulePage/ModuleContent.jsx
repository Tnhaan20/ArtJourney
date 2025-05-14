import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock, Video, CheckCircle } from "lucide-react";
import CompletedBox from "@/components/elements/completedbox/Completed";
import { TailwindStyle } from "@/utils/Enum";

export default function ModuleDetail({ moduleId, onBack }) {
  const [activeSection, setActiveSection] = useState("introduction");

  // Hardcoded module data for module 1
  const moduleData = {
    id: 1,
    title: "Early Christian Art",
    description:
      "Explore the beginnings of Christian art in the late Roman Empire and its development through the early Byzantine period.",
    sections: [
      {
        id: "introduction",
        title: "Introduction to Early Christian Art",
        type: "reading", // reading or video
        completed: true,
        content: `
          <p class="mb-4">Early Christian art, also called Paleo-Christian art or primitive Christian art, architecture, painting, and sculpture from the beginnings of Christianity until about the early 6th century, particularly the art of Italy and the western Mediterranean.</p>
          
          <p class="mb-4">The earliest identifiably Christian art consists of a few 2nd-century wall and ceiling paintings in the Roman catacombs (underground burial chambers), which continued to be decorated in a sketchy style derived from Roman impressionism through the 4th century.</p>
        `
      },
      {
        id: "characteristics",
        title: "Key Characteristics",
        type: "reading",
        completed: false,
        content: `
          <ul class="list-disc pl-6 mb-4">
            <li>Adaptation of Roman artistic forms</li>
            <li>Use of symbolism rather than direct representation</li>
            <li>Focus on salvation themes</li>
            <li>Avoidance of idolatry concerns</li>
          </ul>
        `
      },
      {
        id: "important-works",
        title: "Important Works",
        type: "video",
        completed: false,
        content: `
          <div class="mb-6">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <p class="text-gray-500">Video player would be embedded here</p>
            </div>
          </div>
          <p class="mb-4">The Good Shepherd, the Orant, and the story of Jonah were among the most popular motifs. The earliest Christian iconography tended to be symbolic. A simple rendering of a fish was sufficient to allude to Christ.</p>
          
          <p class="mb-4">The Catacombs of Rome contain most of the surviving examples of early Christian art. The Dura-Europos church in Syria is the oldest surviving church building, while the Dura-Europos house church contains the oldest surviving Christian paintings.</p>
        `
      }
    ],
    duration: 45, // minutes
    difficulty: "Intermediate",
    completed: false,
  };

  const handleMarkComplete = () => {
    // This would update the completion status in a real app
    alert("Module marked as complete!");
  };

  // Find the active section content
  const activeContent = moduleData.sections.find(
    section => section.id === activeSection
  )?.content || "";

  // Find the active section
  const activeSection_data = moduleData.sections.find(
    section => section.id === activeSection
  );

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
            <Clock size={16} className="mr-2 text-[var(--color-primary-yellow)]" />
            <span>{moduleData.duration} minutes</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-2 text-[var(--color-primary-yellow)]" />
            <span>Difficulty: {moduleData.difficulty}</span>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="p-2">
          <h3 className="px-2 py-1 text-sm font-medium text-gray-500 uppercase">Module Content</h3>
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
                  ) : (
                    <Video size={16} />
                  )}
                </div>
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mark Complete Button */}
        <div className="p-4 mt-auto border-t border-gray-200">
          <button
            onClick={handleMarkComplete}
            className={`${TailwindStyle.HIGHLIGHT_FRAME} w-full py-2 rounded-md`}
          >
            Mark as Complete
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:w-3/4">
        {/* Content Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center">
            {activeSection_data?.type === "reading" ? (
              <BookOpen size={20} className="mr-3 text-[var(--color-primary-yellow)]" />
            ) : (
              <Video size={20} className="mr-3 text-[var(--color-primary-yellow)]" />
            )}
            <h2 className="text-xl font-bold text-gray-800">
              {activeSection_data?.title}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div dangerouslySetInnerHTML={{ __html: activeContent }} />
        </div>
      </div>
    </div>
  );
}
