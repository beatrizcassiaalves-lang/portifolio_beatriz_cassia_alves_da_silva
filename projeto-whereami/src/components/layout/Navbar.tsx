import { useState } from "react";
import { MapPin, LogIn, LogOut, History } from "lucide-react";
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";
import { auth, googleProvider, signInWithPopup, signOut, trackClick } from "../../firebase";
import { HistoryModal } from "../modals/HistoryModal";

export function Navbar() {
  const { user } = useAppContext();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleLogin = async () => {
    trackClick('login_button');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    trackClick('logout_button');
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-brand-gray/80 backdrop-blur-md border-b border-gray-300 px-6 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <MapPin size={32} className="text-brand-blue" fill="currentColor" fillOpacity={0.2} />
          <span className="text-xl font-title font-bold tracking-tight text-brand-dark">
            WhereAmI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-brand-blue border-b-2 border-brand-blue pb-1">Início</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors font-sans">Busca OSINT de Email</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors font-sans">Sobre</a>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={() => {
                setIsHistoryOpen(true);
                trackClick('history_button');
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 rounded-full transition-all font-sans border border-brand-blue/20"
            >
              <History size={16} />
              <span className="hidden sm:inline">Histórico</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-brand-blue" referrerPolicy="no-referrer" />
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-full transition-all font-sans"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 rounded-full transition-all font-sans border border-brand-blue/20"
            >
              <LogIn size={16} />
              Entrar com Google
            </button>
          )}
        </div>
      </nav>

      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
}
