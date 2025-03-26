// Lógica para deletar um card dentro do modal de detalhes
document.addEventListener('DOMContentLoaded', function() {
    // Função para obter o token CSRF dinamicamente
    function getCsrfToken() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                return cookie.split('=')[1]; 
            }
        }
        return '';
    }

    // Função para exibir alertas
    function showAlert(type, message) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        setTimeout(() => alertBox.remove(), 3000);
    }

    document.querySelectorAll('.delete-card').forEach(function(button) {
        button.addEventListener('click', function() {
            const cardId = this.getAttribute('data-card-id'); 
            const csrfToken = getCsrfToken();

            fetch(`/delete_card/${cardId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Envia o token CSRF no cabeçalho
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || `Erro na requisição. Status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Exibe o alerta de sucesso
                    showAlert('success', 'Card deletado com sucesso!');
                    setTimeout(() => location.reload(), 2000); // Recarrega a página após 2 segundos
                } else {
                    // Exibe o alerta de erro
                    showAlert('danger', data.error || 'Erro desconhecido ao deletar o card.');
                }
            })
            .catch(error => {
                console.error('Erro:', error.message);
                showAlert('danger', `Erro ao processar a requisição: ${error.message}`);
            });
        });
    });
});

//Função para atualizar a fase do card no modal de detalhes
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os itens do dropdown
    const dropdownItems = document.querySelectorAll('#dropdown-fases .dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', async function (event) {
            // Obtém o ID da fase e do card diretamente do atributo data
            const newPhaseId = this.getAttribute('data-fase');
            const cardId = this.getAttribute('data-card-id');
            const faseNome = this.getAttribute('data-fase-nome');

            if (!cardId) {
                alert('Erro: ID do card não encontrado.');
                return;
            }

            try {
                // Faz a requisição AJAX
                const response = await fetch('/update_card_phase/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken() // Função para obter o CSRF token
                    },
                    body: JSON.stringify({
                        card_id: cardId,
                        new_phase_id: newPhaseId
                    })
                });

                const data = await response.json();

                if (data.success) {
                    showAlert('success', 'Card movido para a fase ' + faseNome + ' com sucesso!');
                    setTimeout(() => {
                        // Fechar o modal
                        const modal = document.getElementById('cardDetailsModal');
                        const modalInstance = bootstrap.Modal.getInstance(modal);
                        modalInstance.hide();

                        // Recarrega a página após 2 segundos
                        location.reload();
                    }, 2000);
                } else {
                    alert('Erro ao atualizar o card: ' + data.errors);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                showAlert('danger', error.message || 'Erro desconhecido ao atualizar o card.');
            }
        });
    });

    // Função para exibir alertas dinâmicos
    function showAlert(type, message) {
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `
            <div class="alert alert-${type} text-bg-${type} border-0" role="alert">
                <strong>${type === 'success' ? 'Sucesso' : 'Erro'} - </strong> ${message}
            </div>
        `;
        setTimeout(() => {
            alertContainer.innerHTML = ''; // Remove o alerta após 5 segundos
        }, 5000);
    }

    // Função para obter o token CSRF
    function getCSRFToken() {
        let csrfToken = null;
        const cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            const [key, value] = cookie.trim().split('=');
            if (key === 'csrftoken') {
                csrfToken = value;
            }
        });

        return csrfToken;
    }
});


function getCSRFToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1] || '';
}