import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from "./pages/board/Board.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}
