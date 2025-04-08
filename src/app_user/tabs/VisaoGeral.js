import React, { useState, useEffect } from 'react';
import {
  FaFilter,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const VisaoGeral = () => {
  const [selectedMonth, setSelectedMonth] = useState('Abril de 2025');
  const [activeSection, setActiveSection] = useState('Federal');
  const [activeTributeCategory, setActiveTributeCategory] = useState('Federais');
  const [activeObligationCategory, setActiveObligationCategory] = useState('Federais');
  const [activeFiscalCategory, setActiveFiscalCategory] = useState('Federal');

  const months = [
    'Janeiro de 2025',
    'Fevereiro de 2025',
    'Março de 2025',
    'Abril de 2025',
    'Maio de 2025',
    'Junho de 2025',
    'Julho de 2025',
    'Agosto de 2025',
    'Setembro de 2025',
    'Outubro de 2025',
    'Novembro de 2025',
    'Dezembro de 2025'
  ];

  const goToPreviousMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const [tributesData, setTributesData] = useState({
    Federais: [],
    Estaduais: [],
    Municipais: [],
  });

  const [obligationsData, setObligationsData] = useState({
    Federais: [],
    Estaduais: [],
    Municipais: [],
  });

  const [fiscalData, setFiscalData] = useState({
    Federal: [],
    Estadual: [],
    Municipal: [],
  });

  const [loading, setLoading] = useState({
    tributes: false,
    obligations: false,
    fiscal: false,
  });

  useEffect(() => {
    fetchTributesData(activeTributeCategory);
  }, [activeTributeCategory, selectedMonth]);

  useEffect(() => {
    fetchObligationsData(activeObligationCategory);
  }, [activeObligationCategory, selectedMonth]);

  useEffect(() => {
    fetchFiscalData(activeFiscalCategory);
  }, [activeFiscalCategory, selectedMonth]);

  const fetchTributesData = async (category) => {
    setLoading((prev) => ({ ...prev, tributes: true }));
    try {
      // Simulação de chamada à API - substituir pelo endpoint real
      // const response = await fetch(`/api/tributes/${category.toLowerCase()}`);
      // const data = await response.json();

      // Dados mockados para demonstração - substituir por dados reais da API
      const mockData = {
        Federais: [
          { name: 'Imposto de Renda', status: 'Envio' },
          { name: 'Contribuição para o INSS', status: 'Envio' },
          { name: 'PIS', status: 'Envio' },
          { name: 'COFINS', status: 'Envio' },
          { name: 'IRPJ', status: 'Envio' },
          { name: 'CSLL', status: 'Envio' },
        ],
      };

      setTributesData((prev) => ({
        ...prev,
        [category]: mockData[category],
      }));
    } catch (error) {
      console.error('Erro ao carregar tributos:', error);
    } finally {
      setLoading((prev) => ({ ...prev, tributes: false }));
    }
  };

  const fetchObligationsData = async (category) => {
    setLoading((prev) => ({ ...prev, obligations: true }));
    try {
      // Simulação de chamada à API - substituir pelo endpoint real
      // const response = await fetch(`/api/obligations/${category.toLowerCase()}`);
      // const data = await response.json();

      // Dados mockados para demonstração - substituir por dados reais da API
      const mockData = {
        Federais: [
          { name: 'Imposto de Renda', status: 'Envio' },
          { name: 'Contribuição para o INSS', status: 'Envio' },
          { name: 'PIS', status: 'Envio' },
          { name: 'COFINS', status: 'Envio' },
          { name: 'IRPJ', status: 'Envio' },
          { name: 'CSLL', status: 'Envio' },
          {
            name: 'Contribuição Social sobre o Lucro Líquido (CSLL)',
            status: 'Envio',
          },
          { name: 'Programa de Integração Social (PIS)', status: 'Envio' },
          {
            name: 'Contribuição para o Financiamento da Seguridade Social (COFINS)',
            status: 'Envio',
          },
        ],
      };

      setObligationsData((prev) => ({
        ...prev,
        [category]: mockData[category],
      }));
    } catch (error) {
      console.error('Erro ao carregar obrigações:', error);
    } finally {
      setLoading((prev) => ({ ...prev, obligations: false }));
    }
  };

  const fetchFiscalData = async (category) => {
    setLoading((prev) => ({ ...prev, fiscal: true }));
    try {
      // Simulação de chamada à API - substituir pelo endpoint real
      // const response = await fetch(`/api/fiscal/${category.toLowerCase()}`);
      // const data = await response.json();

      // Dados mockados para demonstração - substituir por dados reais da API
      const mockData = {
        Federal: [
          { name: 'SIMPLES NAC.', value: 'R$ 1.200,00' },
          { name: 'IRRF', value: 'R$ 450,00' },
          { name: 'PIS', value: 'R$ 320,00' },
          { name: 'COFINS', value: 'R$ 780,00' },
          { name: 'IRPJ', value: 'R$ 950,00' },
          { name: 'CSLL', value: 'R$ 650,00' },
          { name: 'CP-SEGUR.', value: 'R$ 230,00' },
          { name: 'CP-PATRONAL', value: 'R$ 540,00' },
          { name: 'CP-TERCEIROS', value: 'R$ 180,00' },
          { name: 'GFIP - MULTI ATR', value: 'R$ 120,00' },
        ],
        Estadual: [
          { name: 'ICMS', value: 'R$ 870,00' },
          { name: 'DIFAL', value: 'R$ 340,00' },
          { name: 'IPVA', value: 'R$ 750,00' },
          { name: 'ITCMD', value: 'R$ 0,00' },
        ],
        Municipal: [
          { name: 'ISS', value: 'R$ 420,00' },
          { name: 'IPTU', value: 'R$ 380,00' },
          { name: 'Taxa de Licença', value: 'R$ 150,00' },
          { name: 'Taxa de Lixo', value: 'R$ 80,00' },
        ],
      };

      setFiscalData((prev) => ({
        ...prev,
        [category]: mockData[category],
      }));
    } catch (error) {
      console.error('Erro ao carregar situação fiscal:', error);
    } finally {
      setLoading((prev) => ({ ...prev, fiscal: false }));
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-black mb-2 text-sm font-semibold flex">Selecione um período para consultar:</p>
        <div className="flex items-center justify-start gap-2">
          <button 
            onClick={goToPreviousMonth}
            className='p-2 hover:bg-gray-200 hover:rounded'
          >
            <FaChevronLeft className="w-3 h-3 text-black" />
          </button>

          <div className="flex items-center">
            <span className="font-medium text-sm text-black">{selectedMonth}</span>
          </div>

          <button 
            onClick={goToNextMonth}
            className='p-2 hover:bg-gray-200 hover:rounded'
          >
            <FaChevronRight className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-2">
              <FaClipboardCheck className="text-white text-sm" />
            </div>
            <h2 className="text-md font-medium">Tributos a pagar</h2>
          </div>

          <hr className="mb-4" />

          <h3 className="mb-2 text-sm font-semibold">Lista de Tributos</h3>
          <div className="mb-4">
            {loading.tributes ? (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-500">Carregando...</p>
              </div>
            ) : tributesData[activeTributeCategory]?.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                {tributesData[activeTributeCategory].map((tribute, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-200"
                  >
                    <span className="text-gray-700 text-sm">{tribute.name}</span>
                    <button className="bg-[#3DD35E] py-1 text-white px-4 rounded-full">
                      {tribute.status}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-500">Nenhum tributo encontrado</p>
              </div>
            )}
          </div>

          <h3 className="mb-2">Parcelamentos</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 flex items-center">
            <FaExclamationTriangle className="text-yellow-600 mr-2" />
            <span className="text-yellow-800">Sem dados para reportar</span>
          </div>

          <h3 className="mb-2 font-semibold text-sm">Faturamento do mês</h3>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">Simples Nacional</span>
            <span className="text-[#3dd35e] text-sm">R$</span>
          </div>
          <div className="flex justify-between py-1 ">
            <span className="text-gray-700 text-sm">Total de impostos</span>
            <span className="text-[#3dd35e] text-sm">R$</span>
          </div>
          <div className="flex justify-between py-1 pb-8 border-b border-gray-200">
            <span className="text-gray-700 text-sm"></span>
            <span className="text-[#3dd35e]">%</span>
          </div>

          <h3 className="mb-2 font-semibold text-sm pt-8">Folha do mês</h3>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">INSS</span>
            <span className="text-[#3dd35e] text-sm">R$</span>
          </div>
          <div className="flex justify-between py-1 ">
            <span className="text-gray-700 text-sm">FGTS</span>
            <span className="text-[#3dd35e] text-sm">R$</span>
          </div>
          <div className="flex justify-between py-1 ">
            <span className="text-gray-700 text-sm">Total de Encargos</span>
            <span className="text-[#3dd35e] text-sm">R$</span>
          </div>
          <div className="flex justify-between py-1 pb-8 border-b border-gray-200">
            <span className="text-gray-700 text-sm"></span>
            <span className="text-[#3dd35e] text-sm">%</span>
          </div>

          <h3 className="mb-2 mt-4 font-semibold text-sm pt-8">
            Quantidade de funcionários Inicial
          </h3>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">Admissões</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">Rescisões</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">Crescimento/redução</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-700 text-sm">
              Quantidade de funcionário final
            </span>
            <span className="text-[#3dd35e] text-sm">funcionários</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-2">
              <FaClipboardCheck className="text-white text-sm" />
            </div>
            <h2 className="text-md font-medium">Obrigações</h2>
          </div>

          <hr className="mb-4" />

          <h3 className="mb-2 text-sm font-semibold">Lista de Obrigações</h3>
          <div className="flex items-center mb-4">
            <span className="font-semibold text-sm mr-2">Departamento</span>
            <button className="">
              <FaFilter className="text-gray-500" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto pr-1">
            {loading.obligations ? (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-500">Carregando...</p>
              </div>
            ) : obligationsData[activeObligationCategory]?.length > 0 ? (
              <div>
                {obligationsData[activeObligationCategory].map(
                  (obligation, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 border-b border-gray-200"
                    >
                      <span className="text-gray-700 text-sm">
                        {obligation.name}
                      </span>
                      <button className="bg-[#3DD35E] text-white px-4 py-1 rounded-full">
                        {obligation.status}
                      </button>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center py-4">
                <p className="text-gray-500">Nenhuma obrigação encontrada</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#18183A] flex items-center justify-center mr-2">
              <FaClipboardCheck className="text-white text-sm" />
            </div>
            <h2 className="text-md font-medium">Situação Fiscal</h2>
          </div>

          <hr className="mb-4" />

          <div className="mb-4 overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr>
                  <th className="font-medium text-sm bg-[#18183A] text-white p-2 text-left whitespace-nowrap rounded-tl-lg">
                    CERTIDÕES
                  </th>
                  <th className="font-medium text-sm bg-[#18183A] text-white p-2 text-left whitespace-nowrap">
                    SITUAÇÃO
                  </th>
                  <th className="font-medium text-sm bg-[#18183A] text-white p-2 text-left whitespace-nowrap rounded-tr-lg">
                    DATA DE VENC.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    CND FEDERAL
                  </td>
                  <td className="p-2 border-b">
                    <span className="bg-[#3DD35E] text-white px-4 py-1 rounded-full block text-center text-sm">
                      Envio
                    </span>
                  </td>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    15/08/2025
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    CND ESTADUAL
                  </td>
                  <td className="p-2 border-b">
                    <span className="bg-[#3DD35E] text-white px-4 py-1 rounded-full block text-center text-sm">
                      Envio
                    </span>
                  </td>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    22/09/2025
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    CND TRABALHISTA
                  </td>
                  <td className="p-2 border-b">
                    <span className="bg-[#3DD35E] text-white px-4 py-1 rounded-full block text-center text-sm">
                      Envio
                    </span>
                  </td>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    30/07/2025
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    CND MUNICIPAL
                  </td>
                  <td className="p-2 border-b">
                    <span className="bg-[#3DD35E] text-white px-4 py-1 rounded-full block text-center text-sm">
                      Envio
                    </span>
                  </td>
                  <td className="p-2 border-b whitespace-nowrap text-sm">
                    02/08/2004
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4 mt-12">
            <div className="text-md font-medium mb-3">
              ODOS ACELERADORA LTDA - 12
            </div>
            <div className="grid grid-cols-3 w-full">
              <button
                className={`p-2 rounded-tl-lg ${
                  activeFiscalCategory === 'Federal'
                    ? 'bg-[#18183A] text-white font-medium text-sm'
                    : 'bg-gray-100 text-gray-700 text-sm'
                }`}
                onClick={() => setActiveFiscalCategory('Federal')}
              >
                Federal
              </button>
              <button
                className={`p-2 ${
                  activeFiscalCategory === 'Estadual'
                    ? 'bg-[#18183A] text-white font-medium text-sm'
                    : 'bg-gray-100 text-gray-700 text-sm'
                }`}
                onClick={() => setActiveFiscalCategory('Estadual')}
              >
                Estadual
              </button>
              <button
                className={`p-2 rounded-tr-lg ${
                  activeFiscalCategory === 'Municipal'
                    ? 'bg-[#18183A] text-white font-medium text-sm'
                    : 'bg-gray-100 text-gray-700 text-sm '
                }`}
                onClick={() => setActiveFiscalCategory('Municipal')}
              >
                Municipal
              </button>
            </div>

            <div className=" p-3">
              <div className="grid grid-cols-2 mb-1 pb-2 border-b border-gray-200">
                <div className="font-semibold text-gray-800 text-sm">
                  OBRIGAÇÃO
                </div>
                <div className="font-semibold text-gray-800 text-right text-sm">
                  VALOR
                </div>
              </div>

              <div className="max-h-52 overflow-y-auto">
                {loading.fiscal ? (
                  <div className="py-4 text-center">
                    <p className="text-gray-500">Carregando...</p>
                  </div>
                ) : fiscalData[activeFiscalCategory]?.length > 0 ? (
                  fiscalData[activeFiscalCategory].map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 py-2 border-b border-gray-200"
                    >
                      <div className="text-gray-700 text-sm">{item.name}</div>
                      <div className="text-gray-700 text-sm text-right">
                        {item.value}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-gray-500">Nenhum dado fiscal encontrado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaoGeral;