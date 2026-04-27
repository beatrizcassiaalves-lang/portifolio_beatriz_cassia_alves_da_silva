import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Mail, User, ArrowRight, Loader2, ExternalLink, Globe, AlertCircle, ShieldCheck, Activity, FileText, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { auth, db, storage, collection, addDoc, serverTimestamp, ref, uploadBytes, getDownloadURL, trackClick } from "../../firebase";
import { useAppContext } from "../../context/AppContext";

interface SearchResult {
  platform: string;
  url: string;
  status: "found" | "not_found" | "error";
  details?: string;
}

export function HeroSection() {
  const { user } = useAppContext();
  const [searchType, setSearchType] = useState<"username" | "email">("username");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const cancelExportRef = useRef(false);

  const platformsToScan = ["Instagram", "Twitter", "GitHub", "LinkedIn", "Reddit", "TikTok", "Pinterest", "Facebook"];

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setResults(null);
      return;
    }
    
    trackClick('perform_search');
    setIsLoading(true);
    setIsScanning(true);
    setError(null);

    // Simulate "Live Scanning" animation
    let platformIdx = 0;
    const scanInterval = setInterval(() => {
      setCurrentPlatform(platformsToScan[platformIdx % platformsToScan.length]);
      platformIdx++;
    }, 600);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3.1-pro-preview";
      
      const prompt = `Perform a professional OSINT investigation for the ${searchType}: "${searchQuery}". 
      Search across major social networks (Instagram, Twitter/X, GitHub, LinkedIn, Reddit, TikTok, etc.), forums, and professional platforms.
      Return a list of potential profile matches with their URLs. 
      Format the response as a JSON array of objects with keys: "platform", "url", "status" (always "found"), and "details" (brief description of what was found).
      Only return the JSON array, nothing else.`;

      const response = await ai.models.generateContent({
        model: model,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      const text = response.text;
      if (text) {
        const parsedResults = JSON.parse(text);
        setResults(parsedResults);

        // Save to search history if user is logged in
        if (user) {
          try {
            await addDoc(collection(db, "searches"), {
              uid: user.uid,
              query: searchQuery,
              searchType: searchType,
              createdAt: serverTimestamp()
            });
          } catch (historyErr) {
            console.error("Error saving search history:", historyErr);
          }
        }
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      if (searchQuery.length > 5) {
        setError("O motor de descoberta está ocupado. Por favor, aguarde um momento.");
      }
    } finally {
      clearInterval(scanInterval);
      setIsLoading(false);
      setIsScanning(false);
      setCurrentPlatform("");
    }
  }, [searchType]);

  // Debounce logic for "Live" search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleExportPDF = async () => {
    if (!results || !user) {
      if (!user) setError("Você precisa estar logado para exportar relatórios.");
      return;
    }

    trackClick('export_pdf');
    setIsExporting(true);
    cancelExportRef.current = false;

    try {
      // Small delay to allow cancellation to be checked
      await new Promise(resolve => setTimeout(resolve, 500));
      if (cancelExportRef.current) return;

      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(15, 82, 186); // Brand Blue
      doc.text("Relatório de Pegada Digital - WhereAmI", 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Usuário: ${user.displayName || user.email}`, 14, 32);
      doc.text(`Busca: ${query} (${searchType})`, 14, 38);
      doc.text(`Data: ${new Date().toLocaleString()}`, 14, 44);

      if (cancelExportRef.current) return;

      // Table
      autoTable(doc, {
        startY: 50,
        head: [['Plataforma', 'URL', 'Detalhes']],
        body: results.map(r => [r.platform, r.url, r.details || '']),
        headStyles: { fillColor: [15, 82, 186] },
      });

      if (cancelExportRef.current) return;

      // Convert to blob
      const pdfBlob = doc.output('blob');
      const fileName = `report_${user.uid}_${Date.now()}.pdf`;
      const storageRef = ref(storage, `reports/${user.uid}/${fileName}`);

      // Upload to Storage
      await uploadBytes(storageRef, pdfBlob);
      if (cancelExportRef.current) return;

      const downloadURL = await getDownloadURL(storageRef);
      if (cancelExportRef.current) return;

      // Save to Firestore
      await addDoc(collection(db, "reports"), {
        uid: user.uid,
        query,
        searchType,
        pdfUrl: downloadURL,
        createdAt: serverTimestamp()
      });

      if (cancelExportRef.current) return;

      // Download locally too
      doc.save(fileName);
      
    } catch (err) {
      console.error("Export error:", err);
      if (!cancelExportRef.current) {
        setError("Erro ao exportar PDF. Tente novamente.");
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleCancelExport = () => {
    trackClick('cancel_export');
    cancelExportRef.current = true;
    setIsExporting(false);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-light-blue to-brand-gray py-20 px-6 transition-colors">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest mb-6 font-sans">
            <Activity size={14} className="animate-pulse" />
            Descoberta OSINT em Tempo Real Ativa
          </div>
          <h1 className="text-4xl md:text-7xl font-title font-extrabold text-brand-dark mb-6 tracking-tight leading-tight">
            Mapeamento de <span className="text-brand-blue">Identidade Digital</span> em Tempo Real
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
            Comece a digitar um nome de usuário ou email. Nosso mecanismo alimentado por IA varre mais de 500 plataformas 
            em tempo real para mapear a pegada digital instantaneamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-[2.5rem] shadow-2xl mb-12 relative overflow-hidden"
        >
          {/* Scanning Overlay */}
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <Loader2 size={60} className="text-brand-blue animate-spin mb-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search size={20} className="text-brand-dark animate-bounce" />
                  </div>
                </div>
                <p className="text-brand-dark font-title font-bold text-xl mb-2">Escaneando {currentPlatform}...</p>
                <p className="text-brand-blue text-sm animate-pulse font-sans">Analisando pegadas digitais para "{query}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Type Toggles */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => {
                setSearchType("username");
                trackClick('toggle_username');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all font-sans ${
                searchType === "username"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <User size={18} />
              Descoberta de Usuário
            </button>
            <button
              onClick={() => {
                setSearchType("email");
                trackClick('toggle_email');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all font-sans ${
                searchType === "email"
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <Mail size={18} />
              Análise de Email
            </button>
          </div>

          {/* Search Input Area */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-blue transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchType === "username" ? "Digite um nome de usuário..." : "Digite um endereço de email..."}
              className="w-full bg-gray-50 border border-gray-200 text-brand-dark pl-16 pr-16 py-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:bg-white transition-all text-xl font-medium font-sans"
            />
            {isLoading && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Loader2 size={24} className="text-brand-blue animate-spin" />
              </div>
            )}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 text-red-400 text-sm justify-center font-sans"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] font-sans">
            <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /> Em conformidade com GDPR</span>
            <span className="flex items-center gap-2"><Activity size={14} className="text-brand-blue" /> API em Tempo Real</span>
            <span className="flex items-center gap-2"><Globe size={14} className="text-brand-blue" /> Cobertura Global</span>
          </div>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full text-left"
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-gray-200 pb-6 gap-4">
                <h3 className="text-2xl font-title font-bold text-brand-dark flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                    <Globe className="text-brand-blue" size={20} />
                  </div>
                  Pegada Digital: <span className="text-brand-blue">{query}</span>
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-full font-bold text-sm shadow-lg shadow-brand-blue/30 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                      {isExporting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <FileText size={18} />
                      )}
                      {isExporting ? "Exportando..." : "Exportar PDF"}
                    </button>

                    {isExporting && (
                      <button
                        onClick={handleCancelExport}
                        className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all animate-in fade-in zoom-in duration-300"
                        title="Parar exportação"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-sans">
                      Nível de Confiança
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        className="h-full bg-brand-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, idx) => (
                  <motion.a
                    key={idx}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => trackClick(`result_link_${result.platform}`)}
                    className="glass p-6 rounded-3xl flex flex-col gap-4 group hover:bg-white transition-all border border-gray-200 hover:border-brand-blue/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-lg bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-wider font-sans">
                        {result.platform}
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-brand-blue transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-sans">
                        {result.details || "Correspondência de perfil identificada com alta probabilidade."}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between font-sans">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Link Verificado</span>
                      <span className="text-[10px] text-green-600 font-bold uppercase">Ativo</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
