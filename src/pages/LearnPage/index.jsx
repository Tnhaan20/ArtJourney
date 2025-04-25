import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourseList from "@/components/layout/LearnPage/CourseList";
import CoursePage from "./CoursePage";

export default function LearnPage() {
    return (
        <div className="py-10">
            <Routes>
                <Route path="/" element={<CourseList />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
            </Routes>
        </div>   
    );
}
