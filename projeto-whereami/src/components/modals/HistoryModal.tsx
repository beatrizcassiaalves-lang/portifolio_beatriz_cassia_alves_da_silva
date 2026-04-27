import { useState, useEffect } from "react";
import { X, History, Search, Calendar, ExternalLink, Trash2, Loader2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, collection, query, where, orderBy, getDocs, deleteDoc, doc, limit } from "../../firebase";
import { useAppContext } from "../../context/AppContext";

interface SearchHistoryItem {
  id: string;
  query: string;
  searchType: "username" | "email";
  createdAt: any;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const { user } = useAppContext();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchHistory();
    }
  }, [isOpen, user]);

  const fetchHistory = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "searches"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const items: SearchHistoryItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as SearchHistoryItem);
      });
      setHistory(items);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-gray/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <History size={20} />
              </div>
              <div>
                <h2 className="text-xl font-title font-bold text-brand-dark">Histórico de Pesquisas</h2>
                <p className="text-xs text-gray-500 font-sans">Suas últimas 50 consultas realizadas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-brand-dark"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={40} className="text-brand-blue animate-spin" />
                <p className="text-gray-500 font-sans animate-pulse">Carregando seu histórico...</p>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="group p-4 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-brand-blue transition-colors">
                        {item.searchType === "username" ? <Search size={18} /> : <Clock size={18} />}
                      </div>
                      <div>
                        <p className="font-sans font-bold text-brand-dark">{item.query}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                            {item.searchType === "username" ? "Usuário" : "Email"}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1 font-sans">
                            <Calendar size={10} />
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* We could add a "Re-search" button here if needed */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
                  <History size={40} />
                </div>
                <h3 className="text-lg font-title font-bold text-brand-dark mb-2">Nenhum histórico encontrado</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto font-sans">
                  Suas pesquisas aparecerão aqui assim que você começar a explorar a plataforma.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-sans">
              Privacidade garantida • Apenas você vê isso
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand-dark text-white rounded-full text-sm font-bold hover:bg-brand-dark/90 transition-all font-sans"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
