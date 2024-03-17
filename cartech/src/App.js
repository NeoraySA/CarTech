
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'; // ייבוא של קומפוננטת Dashboard

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Dashboard /> {/* שימוש בקומפוננטת Dashboard כראשית */}
      <Footer />
    </div>
  );
}

export default App;
