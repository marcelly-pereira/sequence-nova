document.addEventListener('DOMContentLoaded', function () {
    const alertContainer = document.getElementById('alert-container');
    const modalHeader = document.querySelector('#EditModal h5');
    const optionsContainer = document.getElementById('formFieldOptionsContainer');
    
    function showDeleteModal(fieldId) {
        document.getElementById('deleteModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
        document.getElementById('confirmDeleteButton').onclick = function () {
            deleteField(fieldId);
        };
    }
    
    function closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    }

    function deleteField(fieldId) {
        fetch(`/delete-form-field/${fieldId}/`, {
            method: 'POST', // Alterado de DELETE para POST
            headers: {
                'X-CSRFToken': getCSRFToken(),
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showSuccess(data.message);
                    setTimeout(() => location.reload(), 2000);
                } else {
                    showError(data.message);
                }
            })
            .catch(() => {
                showError('Erro ao excluir o campo.');
            });

        closeDeleteModal();
    }

    function showError(message) {
        alertContainer.innerHTML = `<div class="alert alert-danger text-bg-danger border-0" role="alert"><strong>Erro - </strong> ${message}</div>`;
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    }

    function deleteField(fieldId) {
        $.ajax({
            url: `/delete-form-field/${fieldId}/`, // Substitua pela URL correta
            type: 'DELETE',
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            success: function (response) {
                if (response.success) {
                    showSuccess(response.message);
                    setTimeout(() => location.reload(), 2000); // Recarrega a página após exclusão
                } else {
                    showError(response.message);
                }
            },
            error: function () {
                showError('Erro ao excluir o campo.');
            }
        });

        closeDeleteModal(); // Fecha o modal após enviar a solicitação
    }

    function showSuccess(message) {
        alertContainer.innerHTML = `<div class="alert alert-success text-bg-success border-0" role="alert"><strong>Sucesso - </strong> ${message}</div>`;
        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    }

    function showEditModal(fieldId) {
        console.log('tentando editar o campo', fieldId);
        $.ajax({
            url: `/form_field/${fieldId}/`, 
            type: 'GET',
            success: function (response) {
                const modalHeader = document.querySelector('#EditModal h5');
                if (modalHeader) modalHeader.innerHTML = `Editar Campo  <span class="tag" style="background-color: #1426ff">${response.label}</span>`;

                document.getElementById('editFieldInputLabel').value = response.label;
                document.getElementById('editFieldDescription').value = response.description;
                document.getElementById('editFieldRequired').checked = response.required;
                document.getElementById('editFieldExibirNoCard').checked = response.exibirnocard;

                if (optionsContainer) {
                    optionsContainer.innerHTML = ''; // Limpa o conteúdo anterior
                    response.options.forEach(option => {
                        const optionRow = `
                            <div class="form-group d-flex align-items-center" data-option-value="${option.value}">
                                <input disabled type="text" class="form-control" value="${option.value}" readonly>
                                <button type="button" class="btn btn-light remove-option" data-option-value="${option.value}">Remover</button>
                            </div>
                            <hr>`;
                        optionsContainer.innerHTML += optionRow;
                    });

                    attachRemoveEvent();
                }

                document.getElementById('EditModal').style.display = 'block';
                document.getElementById('modalOverlay').style.display = 'block';

                document.getElementById('confirmEditButton').onclick = function () {
                    editField(fieldId);
                };
            },
            error: function () {
                showError('Erro ao carregar os dados do campo.');
                console.log('Erro:" ', error);
            }
        });
    }

    function closeEditModal() {
        document.getElementById('EditModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    }

    function editField(fieldId) {
        const updatedData = {
            label: document.getElementById('editFieldInputLabel').value,
            description: document.getElementById('editFieldDescription').value,
            required: document.getElementById('editFieldRequired').checked,
            exibirnocard: document.getElementById('editFieldExibirNoCard').checked,
            options: []
        };

        const optionRows = optionsContainer.querySelectorAll('[data-option-value]');
        optionRows.forEach(row => {
            const input = row.querySelector('input');
            if (input) {
                updatedData.options.push({
                    value: input.value,
                    label: input.value // Label sempre igual ao Value
                });
            }
        });

        $.ajax({
            url: `/form_field/${fieldId}/edit/`,
            type: 'POST',
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            data: JSON.stringify(updatedData),
            contentType: 'application/json',
            success: function (response) {
                if (response.success) {
                    showSuccess(response.message);
                    setTimeout(() => location.reload(), 2000);
                } else {
                    showError(response.message);
                }
            },
            error: function () {
                showError('Erro ao salvar as alterações.');
            }
        });
    }

    function removeOption(value) {
        const optionElement = document.querySelector(`[data-option-value="${value}"]`);
        if (optionElement) {
            optionElement.remove();
        } else {
            console.error(`Opção com valor "${value}" não encontrada.`);
        }
    }

    function attachRemoveEvent() {
        const removeButtons = document.querySelectorAll('.remove-option');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const value = button.getAttribute('data-option-value');
                removeOption(value);
            });
        });
    }

    function addOption() {
        const newOptionValue = document.getElementById('newOptionValue').value.trim();

        if (!newOptionValue) {
            showError('O campo de valor é obrigatório.');
            return;
        }

        const optionRow = `
            <div class="form-group d-flex align-items-center option-row" data-option-value="${newOptionValue}">
                <input disabled type="text" class="form-control" value="${newOptionValue}" readonly>
                <button type="button" class="btn btn-light remove-option" data-option-value="${newOptionValue}">Remover</button>
            </div>`;

        optionsContainer.innerHTML += optionRow;
        attachRemoveEvent();

        document.getElementById('newOptionValue').value = ''; // Limpa o campo

        showSuccess('Opção adicionada com sucesso.');
    }

    document.getElementById('addOptionButton').addEventListener('click', addOption);

    function getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]').value;
    }

    window.showDeleteModal = showDeleteModal;
    window.closeDeleteModal = closeDeleteModal;
    window.showEditModal = showEditModal;
    window.closeEditModal = closeEditModal;
    window.editField = editField;
});