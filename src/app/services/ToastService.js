// services/ToastService.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Toast from '../components/Toast'; // Ajuste o caminho conforme necessário

let toastContainer;
let toastRoot;
let toasts = [];

// Cria o container para os toasts se não existir
const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-4 right-4 space-y-4 z-50';
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
  }
  return { container: toastContainer, root: toastRoot };
};

// Renderiza os toasts
const renderToasts = () => {
  const { root } = createToastContainer();
  root.render(
    <React.Fragment>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </React.Fragment>
  );
};

// Adiciona um novo toast
const addToast = (type, message, duration = 5000) => {
  // Limpa toasts anteriores do mesmo tipo para evitar duplicação
  toasts = toasts.filter(toast => toast.type !== type);
  
  const id = Date.now();
  toasts = [...toasts, { id, type, message, duration }];
  renderToasts();
  return id;
};

// Remove um toast pelo ID
const removeToast = (id) => {
  toasts = toasts.filter(toast => toast.id !== id);
  renderToasts();
};

const ToastService = {
  success: (message, duration) => {
    // Remove todos os toasts de erro ao mostrar um sucesso
    toasts = toasts.filter(toast => toast.type !== 'error');
    return addToast('success', message, duration);
  },
  error: (message, duration) => {
    // Remove todos os toasts existentes para mostrar apenas o erro atual
    toasts = [];
    return addToast('error', message, duration);
  },
  warning: (message, duration) => {
    // Remove avisos anteriores
    toasts = toasts.filter(toast => toast.type !== 'warning');
    return addToast('warning', message, duration);
  },
  info: (message, duration) => {
    // Remove informações anteriores
    toasts = toasts.filter(toast => toast.type !== 'info');
    return addToast('info', message, duration);
  },
  remove: (id) => removeToast(id),
  clearAll: () => {
    toasts = [];
    renderToasts();
  }
};

export default ToastService;