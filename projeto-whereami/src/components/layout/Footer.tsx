export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-title font-bold text-brand-dark mb-4">App WhereAmI</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md font-sans">
            App WhereAmI - Plataforma profissional de ferramentas OSINT para descoberta de nomes de usuário e investigações de email. 
            Busca avançada em mais de 500 plataformas para mapeamento de identidade digital e análise de pegadas.
          </p>
        </div>
        
        <div>
          <h4 className="font-title font-bold text-brand-dark mb-4">Sobre</h4>
          <ul className="space-y-2 text-sm text-gray-500 font-sans">
            <li><a href="#" className="hover:text-brand-blue transition-colors">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors">Contato</a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-brand-blue transition-colors">Termos de Serviço</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-title font-bold text-brand-dark mb-4">Contato</h4>
          <p className="text-sm text-gray-500 font-sans">
            Suporte: support@whereami.net<br />
            Negócios: info@whereami.net
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-xs text-gray-400 font-sans">
          © {new Date().getFullYear()} App WhereAmI. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          {/* Social icons could go here */}
        </div>
      </div>
    </footer>
  );
}
