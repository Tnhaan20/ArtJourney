import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../page/HomePage';

export default function AppRoutes() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Thêm các routes khác ở đây */}
                {/* <Route path="/library" element={<LibraryPage />} /> */}
                {/* <Route path="/challenges" element={<ChallengesPage />} /> */}
                {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
                {/* <Route path="/blog" element={<BlogPage />} /> */}
            </Routes>
        </>
    );
} 