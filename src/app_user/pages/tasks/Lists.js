import React, { useState, useEffect } from 'react';
import BaseLayout from '../../../app/BaseLayout';
import Accordion from '../../../app/components/Accordion';
import TaskCard from '../../../app/components/TaskCard';
import {
  fetchCardsTarefasAVencer,
  fetchCardsTarefasVencendoHoje,
  fetchCardsTarefasVencidas,
} from '../../../services/winningCardsTasks';

const Listas = () => {
  const [sections, setSections] = useState([
    {
      id: 'hoje',
      title: 'Hoje',
      count: 0,
      expanded: false,
      items: [],
      icon: (
        <div className="w-7 h-7 bg-cyan-500 rounded-md flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      id: 'vencidas',
      title: 'Vencidas',
      count: 0,
      expanded: false,
      items: [],
      icon: (
        <div className="w-7 h-7 bg-red-500 rounded-md flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      ),
    },
    {
      id: 'avencer',
      title: 'A Vencer',
      count: 0,
      expanded: false,
      items: [],
      icon: (
        <div className="w-7 h-7 bg-yellow-500 rounded-md flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      ),
    },
  ]);

  const [loadingStates, setLoadingStates] = useState({
    hoje: true,
    vencidas: true,
    avencer: true,
  });

  const isAllLoaded = () => {
    return !Object.values(loadingStates).some((state) => state === true);
  };

  const mapTasksToComponents = (tasks, taskType) => {
    return tasks.map((tarefa) => (
      <TaskCard key={tarefa.id} task={tarefa} taskType={taskType} />
    ));
  };

  const updateSection = (sectionId, count, items, expand = true) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              count,
              items,
              expanded: expand && count > 0,
            }
          : section,
      ),
    );

    setLoadingStates((prev) => ({
      ...prev,
      [sectionId]: false,
    }));
  };

  useEffect(() => {
    const loadTarefasHoje = async () => {
      try {
        const data = await fetchCardsTarefasVencendoHoje();
        const tarefasComponents = mapTasksToComponents(data.results, 'hoje');
        updateSection('hoje', data.results.length, tarefasComponents);
      } catch (error) {
        console.error('Erro ao carregar tarefas de hoje:', error);
        updateSection('hoje', 0, []);
      }
    };

    const loadTarefasVencidas = async () => {
      try {
        const data = await fetchCardsTarefasVencidas();
        const tarefasComponents = mapTasksToComponents(
          data.results,
          'vencidas',
        );
        updateSection('vencidas', data.results.length, tarefasComponents);
      } catch (error) {
        console.error('Erro ao carregar tarefas vencidas:', error);
        updateSection('vencidas', 0, []);
      }
    };

    const loadTarefasAVencer = async () => {
      try {
        const data = await fetchCardsTarefasAVencer();
        const tarefasComponents = mapTasksToComponents(data.results, 'avencer');
        updateSection('avencer', data.results.length, tarefasComponents);
      } catch (error) {
        console.error('Erro ao carregar tarefas a vencer:', error);
        updateSection('avencer', 0, []);
      }
    };
    loadTarefasHoje();
    loadTarefasVencidas();
    loadTarefasAVencer();
  }, []);

  const toggleSection = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
  };

  return (
    <BaseLayout title="Listas">
      <div className="border border-slate-100 rounded-2xl p-4">
        {!isAllLoaded() ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Accordion
            sections={sections}
            onToggleSection={toggleSection}
            emptyStateMessage="Nenhuma tarefa encontrada."
            emptyStateSubMessage="Altere as datas de vencimento ou crie novas tarefas."
          />
        )}
      </div>
    </BaseLayout>
  );
};

export default Listas;
