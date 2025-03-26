
document.addEventListener('DOMContentLoaded', function() {
    const urlParts = window.location.pathname.split('/'); 
    const sequenceId = urlParts[urlParts.length - 2];
    const phaseRow = document.getElementById('phase-row');
    const errorMessage = document.getElementById('error-message');
    const alertMessage = document.getElementById('alert-message');
    const socket = new WebSocket(`ws://${window.location.host}/ws/sequencia/${sequenceId}/`);
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-button');
    const form = searchButton.closest('form');
    const cardCounts = {};
    let sequenciacor = '';
    let colaboradornome = '';
    
    document.getElementById('filtro-geral').addEventListener('click', function() {
        const matchingCards = [];
        fetch('/api/colaboradores/')
            .then(response => response.json())
            .then(data => {
                const dropdownMenu = document.getElementById('colaboradores-dropdown-filtro');
                dropdownMenu.innerHTML = ''; // Limpa o conteúdo anterior
    
                data.forEach(colaborador => {
                    const listItem = document.createElement('a');
                    listItem.className = 'dropdown-item';
                    listItem.href = '#';
                    listItem.innerHTML = `
                        <img src="${colaborador.foto_perfil}" alt="${colaborador.nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px;">
                        ${colaborador.nome}
                    `;
                    listItem.addEventListener('click', function() {
                        colaboradornome = colaborador.nome; // Guarda o nome do colaborador na variável
                        //console.log('Colaborador selecionado:', colaborador.nome);

                        document.querySelectorAll('.sequence-card-body').forEach(card => {
                            const cardTitleElement = card.querySelector('h4');
                            if (cardTitleElement) {
                                card.closest('.card').style.display = matchingCards.includes(cardTitleElement.textContent) ? 'block' : 'none';
                            }
                        });
    
                        // Busca fases e cards no servidor
                        fetch(`/api/sequencia/${sequenceId}/fases/`)
                            .then(response => response.json())
                            .then(fases => {
                                if (!fases.length) return;
    
                                let totalFases = fases.length;
                                let fasesProcessed = 0;
                                let cardsFound = false;
    
                                fases.forEach(fase => {
                                    loadResponsavel(fase.id, colaborador.nome, 1, 10)
                                        .then(cards => {
                                            if (cards.length > 0) {
                                                cardsFound = true;
                                                createPhaseCard(fase, cards);
                                            }
                                            fasesProcessed++;
                                            if (fasesProcessed === totalFases && !cardsFound) {
                                                console.warn('Nenhum card encontrado para o colaborador em todas as fases.');
                                            }
                                        })
                                        .catch(error => {
                                            console.error(`Erro ao carregar cards para a fase ${fase.id}:`, error);
                                            fasesProcessed++;
                                            if (fasesProcessed === totalFases && !cardsFound) {
                                                console.warn('Nenhum card encontrado para o colaborador em todas as fases.');
                                            }
                                        });
                                });
                            });
                    });
                    dropdownMenu.appendChild(listItem);
                });
            })
            .catch(error => console.error('Erro ao buscar colaboradores:', error));
    });


    /* ENCONTRAR A COR DA SEQUÊNCIA */
    // Função para obter a cor da sequência
    function fetchSequenciaCor() {
        fetch(`/api/sequenciasdetail/${sequenceId}/`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro na resposta da API: ${response.statusText} - ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                sequenciacor = data.cor;
                //console.log('Cor da sequência:', sequenciacor);
            })
            .catch(error => {
                console.error('Erro ao buscar a cor da sequência:', error);
            });
    }

    fetchSequenciaCor();


    /* MECANISMO DE PROCURA DO CARD */
    // Adiciona um evento de clique ao botão de pesquisa
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const searchText = searchInput.value.toLowerCase();
        //console.log('Procurando texto digitado:', searchText);
    
        // Procura no DOM os cards que correspondem ao texto digitado
        const matchingCards = [];
        document.querySelectorAll('.sequence-card-body h4').forEach(cardTitle => {
            if (cardTitle && cardTitle.textContent.toLowerCase().includes(searchText)) {
                matchingCards.push(cardTitle.textContent);
            }
        });
    
        // Exibe a lista de cards correspondentes no console
        //console.log('Cards correspondentes:', matchingCards);
    
        // Remove ou exibe os cards com base na correspondência
        document.querySelectorAll('.sequence-card-body').forEach(card => {
            const cardTitleElement = card.querySelector('h4');
            if (cardTitleElement) {
                card.closest('.card').style.display = matchingCards.includes(cardTitleElement.textContent) ? 'block' : 'none';
            }
        });
    
        // Busca fases e cards no servidor
        fetch(`/api/sequencia/${sequenceId}/fases/`)
            .then(response => response.json())
            .then(fases => {
                if (!fases.length) return;
    
                let totalFases = fases.length;
                let fasesProcessed = 0;
                let cardsFound = false;
    
                fases.forEach(fase => {
                    searchCardsByTitle(fase.id, searchText, 1, 5)
                        .then(cards => {
                            fasesProcessed++;
                            if (cards.length > 0) {
                                cardsFound = true;
                                errorMessage.style.display = 'none';
                                //console.log(`Cards encontrados na fase ${fase.id}:`, cards);
                                // instancializa a movimentação de cards
                                initializeSortable();
                            }
                            if (fasesProcessed === totalFases && !cardsFound) {
                                console.warn('Nenhum card encontrado na pesquisa.');
                            }
                        })
                        .catch(error => {
                            fasesProcessed++;
                            console.error('Erro ao buscar cards por título:', error);
                            if (fasesProcessed === totalFases && !cardsFound) {
                                console.warn('Nenhum card encontrado na pesquisa.');
                            }
                        });
                });
            })
            .catch(error => {
                console.error('Erro ao buscar fases:', error);
                errorMessage.textContent = 'Erro ao buscar fases.';
                errorMessage.style.display = 'block';
            });
    });

    // Objeto para rastrear a contagem de cards em cada fase



    /*EVENTOS DO WEBSOCKET*/
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.event === "card_updated") {
            moveCardToNewPhase(data.card_id, data.new_phase_id);
            updateCardCount(data.old_phase_id);
            updateCardCount(data.new_phase_id);
        } else if (data.event === "card_deleted") {
            removeCardFromDOM(data.card_id);
            updateCardCount(data.phase_id);
        } else if (data.event === "card_title_updated") {
            const titleElement = document.querySelector(`.card-title-text[data-card-id="${data.card_id}"]`);
            const titleElementModal = document.querySelector(`.card-title-modal-text[data-card-id="${data.card_id}"]`);
            
            if (titleElement) {
                titleElement.textContent = data.new_title;
            } else {
                console.warn(`⚠️ Elemento do título do card ${data.card_id} não encontrado no DOM.`);
            }
            
            if (titleElementModal) {
                titleElementModal.textContent = data.new_title;
            } else {
                console.warn(`⚠️ Elemento do título do card modal ${data.card_id} não encontrado no DOM.`);
            }
        } else if (data.event === "card_responsavel_updated") {
            const cardElement = document.querySelector(`[data-card-id="${data.card_id}"]`);
            if (cardElement) {
                const responsaveisElement = cardElement.querySelector('#card-responsavel');
                responsaveisElement.innerHTML = data.responsaveis_html;
            } else {
                console.warn(`⚠️ Elemento do card ${data.card_id} não encontrado no DOM.`);
            }
        }
    };

    // Atualiza a contagem de cards
    function updateCardCount(phaseId) {
        const phaseElement = document.querySelector(`.phase-card-col[data-fase-id="${phaseId}"]`);
        if (!phaseElement) {
            console.warn(`⚠️ Elemento da fase ${phaseId} não encontrado no DOM.`);
            return;
        }
        const cardCountElement = phaseElement.querySelector('.task-header span:last-child');
        const newCardCount = cardCounts[phaseId] || 0;
        cardCountElement.textContent = `${newCardCount} Cards`;

        ////console.log(`Fase ID: ${phaseId}, Nova quantidade: ${newCardCount}`);
    }

    // Atualiza o card na fase
    function moveCardToNewPhase(cardId, newPhaseId) {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        const newPhaseElement = document.querySelector(`.phase-cards[data-fase-id="${newPhaseId}"]`);

        if (!cardElement) {
            console.warn(`⚠️ Card ${cardId} não encontrado no DOM.`);
            return;
        }
        if (!newPhaseElement) {
            console.warn(`⚠️ Nova fase ${newPhaseId} não encontrada no DOM.`);
            return;
        }

        newPhaseElement.appendChild(cardElement);
    }

    // Remove o card do DOM
    function removeCardFromDOM(cardId) {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        if (!cardElement) {
            console.warn(`⚠️ Card ${cardId} já foi removido ou não existe no DOM.`);
            return;
        }
        cardElement.remove();
    }

    // Atualiza o título do card no DOM
    function updateCardTitleDOM(cardId, newTitle) {
        const cardTitleElement = document.querySelector(`#card-title-${cardId}`);
        if (cardTitleElement) {
            cardTitleElement.textContent = newTitle;
        } else {
            //console.warn(`⚠️ Elemento do título do card ${cardId} não encontrado.`);
        }
    }


    /*SPINNER E ERRO*/

    // Exibe o erro
    function showError(message) {
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        const errorModalMessage = document.getElementById('errorModalMessage');
        errorModalMessage.textContent = message;
        errorModal.show();
    }



    /*---------------CRIAÇÃO DE CARDS E FASES--------------*/

    // Carrega fases
    function createPhaseCard(fase) {
        const phaseCardCol = document.createElement('div');
        phaseCardCol.className = 'phase-card-col';
        phaseCardCol.id = `fase${fase.id}`;
        phaseCardCol.setAttribute('data-fase-id', fase.id);
        phaseCardCol.setAttribute('data-nome', fase.nome);

        phaseCardCol.innerHTML = `
            <div class="phase-header" style="
                position: sticky; 
                top: 0; 
                background: #fff; 
                z-index: 999; 
                padding: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
                border-radius: 10px;
                position: relative;
                isolation: isolate;">

                <!-- Pseudo-elemento para a borda gradiente -->
                <div style="
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 10px;
                    padding: 2px; /* Espessura da borda */
                    background: linear-gradient(170deg, #1526FF, #FFFFFF);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: destination-out;
                    mask-composite: exclude;
                    z-index: -1;">
                </div>

            <h5 class="task-header text-uppercase d-flex justify-content-between align-items-center">
                <!-- Indicador de cor da fase -->
                <span></span>
                
                <!-- Nome da fase -->
                <span style="color: #18183A; font-weight: 500; font-size: 14px; flex-grow: 1;">
                    ${fase.nome}
                </span>
                
                <!-- Quantidade de cards -->
                <span id="quantidadecardsfase" style="border-radius: 8px; background: #F8F8F8; padding: 6px 12px; color: #6C75A2; font-weight: 400; border: 1px solid #6C75A2; font-size: 12px; flex-shrink: 0;">
                    ${fase.quantidade_cards} Cards
                </span>
            </h5>
            
            </div>
            <div class="tasks" id="tasks${fase.id}" style="max-height: 100vh; overflow-y: scroll; scrollbar-width: thin; scrollbar-color: #E5E5E5 #F7F7F7;">
                <div class="spinner-container" id="spinner-container-${fase.id}">
                 <div class="sequence-card-body">
                    <div class="skeleton-card" style="
                        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                        background-size: 200% 100%;
                        animation: skeleton-loading 1.5s infinite;
                        height: 100px;
                        border-radius: 8px;
                        margin: 10px 0;">
                    </div>
                </div>
                </div>
                <div class="phase-cards sortable-cards" data-fase-id="${fase.id}">
                    <div class="ghost-card text-center border rounded p-3" style="display: none;">Arraste um card aqui</div>
                </div>
            </div>`;

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes skeleton-loading {
            0% {
                background-position: 200% 0;
            }
            100% {
                background-position: -200% 0;
            }
            }`;
        document.head.appendChild(style);
        

        phaseRow.appendChild(phaseCardCol);
        loadCards(fase.id, 0, 5, colaboradornome);

        // Inicializa a contagem de cards para a fase
        cardCounts[fase.id] = fase.quantidade_cards;

        const pagesLoaded = { [fase.id]: 2 };
        const hasMorePages = { [fase.id]: true };
        const isLoading = { [fase.id]: false };

        const tasksElement = phaseCardCol.querySelector(`#tasks${fase.id}`);
        tasksElement.addEventListener('scroll', function() {
            const nearBottom = tasksElement.scrollTop + tasksElement.clientHeight >= tasksElement.scrollHeight - 5;

            if (nearBottom && hasMorePages[fase.id] && !isLoading[fase.id]) {
                let spinnerContainer = document.getElementById(`spinner-load-more-${fase.id}`);
                if (!spinnerContainer) {
                    spinnerContainer = document.createElement('div');
                    spinnerContainer.id = `spinner-load-more-${fase.id}`;
                    spinnerContainer.className = 'spinner-container d-flex flex-column align-items-center';
                    spinnerContainer.innerHTML = `
                        <div class="card mb-0 w-100">
                            <div class="sequence-card-body d-flex justify-content-center">
                                <div class="col-auto">
                                    <div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1050;"></div>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Carregando cards...
                                </div>
                            </div>
                        </div>
                        <hr class="w-100">
                        <span class="text-muted">...</span>
                        <hr class="w-100">
                        <span class="text-muted">...</span>`;
                        
                    tasksElement.appendChild(spinnerContainer);
                }
                spinnerContainer.style.display = 'flex';

                isLoading[fase.id] = true;

                colaboradornome = colaboradornome || '';

                setTimeout(() => {
                    loadCards(fase.id, pagesLoaded[fase.id], 10, colaboradornome)
                        .then(response => {
                            if (response.length === 0) {
                                hasMorePages[fase.id] = false;
                            } else {
                                pagesLoaded[fase.id]++;
                            }
                        })
                        .catch(error => {
                            console.error(`Erro ao carregar mais cards na fase ${fase.id}:`, error);
                            hasMorePages[fase.id] = false;
                            spinnerContainer.remove(); 

                            // Adicione um span com a mensagem de erro
                            const errorMessage = document.createElement('div');
                            errorMessage.className = 'card mb-0 w-100';
                            errorMessage.innerHTML = `
                                <div class="sequence-card-body d-flex justify-content-center">
                                    <button class="btn btn-success" type="button" disabled style="background-color: #0acf97; border-color: #ffffff;">
                                        Todos os cards foram carregados.
                                    </button>
                                </div>
                                <hr class="w-100">
                                <span class="text-muted">...</span>
                                <hr class="w-100">
                                <span class="text-muted">...</span>`;
                            tasksElement.appendChild(errorMessage);
                            setTimeout(() => {
                                errorMessage.remove();
                            }, 6000);
                        })
                        .finally(() => {
                            spinnerContainer.style.display = 'none';
                            setTimeout(() => {
                                isLoading[fase.id] = false;
                            }, 1000);
                        });
                }, 500);
                
            }
        });
    }

    //cria o card da fase
    function createCardHTML(card) {
        // Criando o bloco de responsáveis com IDs únicos
        const responsaveisHTML = card.responsavel_nome && card.responsavel_nome.length > 0 
            ? card.responsavel_nome.map((nome, index) => {
                const foto = card.responsavel_foto_perfil[index];
                return foto 
                    ? `<img id="responsavel-${card.id}" src="${foto}" alt="${nome}" title="${nome}" 
                            style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">`
                    : nome;
            }).join(' ')
            : '<i class="mdi mdi-account-outline" style="color: red;"></i> N/R';

        // Criando o badge de vencimento
        const vencimentoBadge = card.vencimento 
            ? (card.tempo_para_vencimento.includes("Vencido") 
                ? `<span class="badge bg-danger text-white">${card.tempo_para_vencimento}</span>` 
                : card.tempo_para_vencimento.includes("minutos") 
                    ? `<span class="badge bg-warning text-dark">${card.tempo_para_vencimento}</span>` 
                    : card.tempo_para_vencimento.includes("horas") 
                        ? `<span class="badge bg-warning text-dark">${card.tempo_para_vencimento}</span>` 
                        : `<span class="badge bg-dark text-white">${card.tempo_para_vencimento}</span>`)
            : '';

        return `
            <div class="sequence-card-body">
                <h4 id="card-title-${card.id}">${card.titulo}</h4>

                <!-- Exibição dinâmica dos campos -->
                ${card.field_values.filter(field => field.exibirnocard && field.value).map(field => `
                    <div class="field" style="display: flex; align-items: center; gap: 10px;" margin-bottom: 1px;">
                        <div class="icon-box">
                            ${getFieldIcon(field.field_type)}
                        </div>
                        <span class="text-muted">
                            <strong>${field.form_field_label}</strong>:
                            <div>
                                ${field.field_type === 'attachment' ? 'Em anexo' : field.field_type === 'due_date' ? new Date(field.value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : field.value || ''}
                            </div>
                        </span><br>
                    </div>
                `).join('')}

                <!-- Responsável e vencimento -->
                <div id="card-responsavel-${card.id}" class="card-responsavel" style="padding: 10px auto;">
                    <span class="text-muted d-flex align-items-center mt-1" style="font-size: 14px; gap: 5px;"> 
                        <span id="responsavel-container-card${card.id}">
                            ${responsaveisHTML}
                        </span>
                        <i class="mdi mdi-clock-outline" style="font-size: 16px;"></i>
                        <span>${card.tempo_criacao}</span>
                        <i class="mdi mdi-calendar-outline" style="font-size: 16px;"></i>
                        <span id="etiquetas-vencimento-${card.id}">${vencimentoBadge}</span>
                    </span>
                </div>
            </div>`;
    }

    // Função para obter o ícone correspondente ao tipo de campo
    function getFieldIcon(fieldType) {
        const icons = {
            'short_text': 'fas fa-font',
            'long_text': 'fas fa-align-left',
            'number': 'fas fa-hashtag',
            'select': 'fas fa-list',
            'cnpj': 'fas fa-id-card',
            'cpf': 'fas fa-id-card',
            'currency': 'fas fa-dollar-sign',
            'attachment': 'fas fa-paperclip',
            'assignee_select': 'fas fa-user',
            'date': 'fas fa-calendar-alt',
            'datetime': 'fas fa-clock',
            'time': 'fas fa-clock',
            'due_date': 'fas fa-calendar-check',
            'label_select': 'fas fa-tags',
            'phone': 'fas fa-phone',
            'checklist_vertical': 'fas fa-tasks',
            'statement': 'fas fa-file-alt',
            'radio_horizontal': 'fas fa-dot-circle',
            'radio_vertical': 'fas fa-dot-circle',
            'checkbox_horizontal': 'fas fa-check-square',
            'checkbox_vertical': 'fas fa-check-square',
            'email': 'fas fa-envelope',
            'url': 'fas fa-link',
            'address': 'fas fa-map-marker-alt',
            'empresa': 'fas fa-building'
        };
        return icons[fieldType] ? `<i class="${icons[fieldType]}"></i>` : '';
    }

    // Função para carregar os cards com base na fase e no responsável
    function loadResponsavel(faseId, responsavelNome, page = 1, pageSize = 10) {
        return new Promise((resolve, reject) => {
            if (page < 1) {
                console.warn(`Página inválida (${page}), ajustando para 1.`);
                page = 1;
            }
    
            const spinnerContainer = document.getElementById(`spinner-container-${faseId}`);
            spinnerContainer.style.display = 'flex';
    
            let url = `/api/sequencia/${sequenceId}/responsaveis/?fase=${faseId}&page=${page}&page_size=${pageSize}`;
            if (responsavelNome) {
                url += `&responsavel__nome=${responsavelNome}`;
            }
    
            const fetchPage = (page) => {
                return fetch(url + `&page=${page}`)
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => { throw new Error(`Erro ${response.status}: ${err.error || err.message}`); });
                        }
                        return response.json();
                    });
            };
    
            const loadAllPages = async () => {
                let allResults = [];
                let currentPage = page;
                let hasMorePages = true;
    
                while (hasMorePages) {
                    try {
                        const data = await fetchPage(currentPage);
                        if (!data.results || data.results.length === 0) {
                            hasMorePages = false;
                        } else {
                            allResults = allResults.concat(data.results);
                            currentPage++;
                        }
                    } catch (error) {
                        hasMorePages = false;
                        reject(error);
                    }
                }
    
                spinnerContainer.style.display = 'none';
                return allResults;
            };
    
            loadAllPages()
                .then(results => {
                    //console.log('Cards carregados:', results);
    
                    if (results.length === 0) {
                        console.warn(`📌 Nenhum card encontrado na fase ${faseId}.`);
                        updateGhostCards(document.querySelector(`.phase-cards[data-fase-id='${faseId}']`));
                        resolve([]); // Retorna um array vazio para indicar que não há mais dados
                        return;
                    }
    
                    const phaseCards = document.querySelector(`.phase-cards[data-fase-id='${faseId}']`);
                    if (!phaseCards) return;
    
                    let cardCount = 0; // Contador de cards
    
                    results.forEach(card => {
                        if (card.fase != faseId) return;
    
                        // Verificação para evitar cards duplicados
                        if (document.querySelector(`.phase-cards[data-fase-id='${faseId}'] [data-card-id='${card.id}']`)) {
                            console.warn(`⚠️ Card ${card.id} já foi carregado na fase ${faseId}, ignorando.`);
                            return;
                        }
    
                        const cardElement = document.createElement('div');
                        cardElement.className = 'card mb-0';
                        cardElement.setAttribute('draggable', 'true');
                        cardElement.setAttribute('data-card-id', card.id);
                        cardElement.innerHTML = createCardHTML(card);
    
                        phaseCards.insertBefore(cardElement, phaseCards.querySelector('.ghost-card'));
    
                        cardElement.querySelector('.sequence-card-body').addEventListener('click', function() {
                            openCardModal(card);
                        });
    
                        cardCount++; // Incrementa o contador de cards
                    });
    
                    //console.log(`Total de cards na fase ${faseId}: ${cardCount}`); // Exibe o total de cards na fase
    
                    updateGhostCards(phaseCards);
                    resolve(results); // Retorna os cards carregados
                })
                .catch(error => {
                    console.warn(`❌LoadCards: Erro ao carregar mais cards na fase ${faseId}:`, error);
                    spinnerContainer.style.display = 'none';
                    reject(error); // Rejeita a Promise em caso de erro
                });
        });
    }


    function searchCardsByTitle(faseId, searchText, page = 1, pageSize = 5, responsavelNome) {
        return new Promise((resolve, reject) => {
            if (page < 1) {
                console.warn(`Página inválida (${page}), ajustando para 1.`);
                page = 1;
            }

            const spinnerContainer = document.getElementById(`spinner-container-${faseId}`);
            spinnerContainer.style.display = 'flex';

            let url = `/api/sequencia/${sequenceId}/cards/?fase=${faseId}&page=${page}&page_size=${pageSize}&search=${encodeURIComponent(searchText)}`;
            if (responsavelNome) {
                url += `&responsavel=${responsavelNome}`;
            }

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(`Erro ${response.status}: ${err.error || err.message}`); });
                    }
                    return response.json();
                })
                .then(data => {
                    spinnerContainer.style.display = 'none';

                    if (!data.results || data.results.length === 0) {
                        updateGhostCards(document.querySelector(`.phase-cards[data-fase-id='${faseId}']`));
                        resolve([]); // Retorna um array vazio para indicar que não há mais dados
                        return;
                    }

                    const phaseCards = document.querySelector(`.phase-cards[data-fase-id='${faseId}']`);
                    if (!phaseCards) return;

                    data.results.forEach(card => {
                        if (card.fase != faseId) return;

                        // 🔥 Verificação para evitar cards duplicados
                        if (document.querySelector(`.phase-cards[data-fase-id='${faseId}'] [data-card-id='${card.id}']`)) {
                            console.warn(`⚠️ Card ${card.id} já foi carregado na fase ${faseId}, ignorando.`);
                            return;
                        }

                        const cardElement = document.createElement('div');
                        cardElement.className = 'card mb-0';
                        cardElement.setAttribute('draggable', 'true');
                        cardElement.setAttribute('data-card-id', card.id);
                        cardElement.innerHTML = createCardHTML(card);

                        phaseCards.insertBefore(cardElement, phaseCards.querySelector('.ghost-card'));

                        cardElement.querySelector('.sequence-card-body').addEventListener('click', function() {
                            openCardModal(card);
                        });
                    });

                    // Ordena os cards por "tempo_para_vencimento", primeiro os vencidos
                    const cardsArray = Array.from(phaseCards.children).filter(child => child.classList.contains('card'));
                    cardsArray.sort((a, b) => {
                        const getTimeDiff = (cardElement) => {
                            const vencimentoText = cardElement.querySelector('#etiquetas-vencimento').textContent;
                            if (vencimentoText.includes("Vencido")) return -1;
                            if (vencimentoText.includes("minutos")) return parseInt(vencimentoText.replace(/\D/g, ''));
                            if (vencimentoText.includes("horas")) return parseInt(vencimentoText.replace(/\D/g, '')) * 60;
                            if (vencimentoText.includes("dias")) return parseInt(vencimentoText.replace(/\D/g, '')) * 1440;
                            return Infinity;
                        };

                        const diffA = getTimeDiff(a);
                        const diffB = getTimeDiff(b);

                        return diffA - diffB;
                    });

                    cardsArray.forEach(card => phaseCards.appendChild(card));

                    updateGhostCards(phaseCards);
                    resolve(data.results); // Retorna os cards carregados
                })
                .catch(error => {
                    console.warn(`❌SearchCardsByTitle: Erro ao carregar mais cards na fase ${faseId}:`, error);
                    spinnerContainer.style.display = 'none';
                    reject(error); // Rejeita a Promise em caso de erro
                });
        });
    }
    
    // Função para carregar os cards
    function loadCards(faseId, page = 1, pageSize = 5, responsavelNome) {
        return new Promise((resolve, reject) => {
            if (page < 1) {
                console.warn(`Página inválida (${page}), ajustando para 1.`);
                page = 1;
            }
    
            const spinnerContainer = document.getElementById(`spinner-container-${faseId}`);
            spinnerContainer.style.display = 'flex';
    
            let url = `/api/sequencia/${sequenceId}/cards/?fase=${faseId}&page=${page}&page_size=${pageSize}`;
            if (responsavelNome) {
                url += `&responsavel=${responsavelNome}`;
            }
    
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(`Erro ${response.status}: ${err.error || err.message}`); });
                    }
                    return response.json();
                })
                .then(data => {
                    spinnerContainer.style.display = 'none';
    
                    if (!data.results || data.results.length === 0) {
                        console.warn(`📌 Nenhum card encontrado na página ${page} da fase ${faseId}.`);
                        updateGhostCards(document.querySelector(`.phase-cards[data-fase-id='${faseId}']`));
                        resolve([]); // Retorna um array vazio para indicar que não há mais dados
                        return;
                    }
    
                    const phaseCards = document.querySelector(`.phase-cards[data-fase-id='${faseId}']`);
                    if (!phaseCards) return;
    
                    data.results.forEach(card => {
                        if (card.fase != faseId) return;
    
                        // 🔥 Verificação para evitar cards duplicados
                        if (document.querySelector(`.phase-cards[data-fase-id='${faseId}'] [data-card-id='${card.id}']`)) {
                            console.warn(`⚠️ Card ${card.id} já foi carregado na fase ${faseId}, ignorando.`);
                            return;
                        }
    
                        const cardElement = document.createElement('div');
                        cardElement.className = 'card mb-0';
                        cardElement.setAttribute('draggable', 'true');
                        cardElement.setAttribute('data-card-id', card.id);
                        cardElement.innerHTML = createCardHTML(card);
    
                        phaseCards.insertBefore(cardElement, phaseCards.querySelector('.ghost-card'));
    
                        cardElement.querySelector('.sequence-card-body').addEventListener('click', function() {
                            openCardModal(card);
                        });
                    });
    
                    // Ordena os cards por "tempo_para_vencimento", primeiro os vencidos
                    const cardsArray = Array.from(phaseCards.children).filter(child => child.classList.contains('card'));
                    cardsArray.sort((a, b) => {
                        const getTimeDiff = (cardElement) => {
                            const vencimentoText = cardElement.querySelector('#etiquetas-vencimento')?.textContent || '';
                            if (vencimentoText.includes("Vencido")) return -1;
                            if (vencimentoText.includes("minutos")) return parseInt(vencimentoText.replace(/\D/g, ''));
                            if (vencimentoText.includes("horas")) return parseInt(vencimentoText.replace(/\D/g, '')) * 60;
                            if (vencimentoText.includes("dias")) return parseInt(vencimentoText.replace(/\D/g, '')) * 1440;
                            
                            return Infinity;
                        };
    
                        const getCreationTimeDiff = (cardElement) => {
                            const tempoCriacaoText = cardElement.querySelector('#tempo_criacao')?.textContent || '';
                            if (tempoCriacaoText) {
                                const tempoCriacaoDate = new Date(tempoCriacaoText);
                                return (new Date() - tempoCriacaoDate) / 60000; // Diferença em minutos
                            }
                            return Infinity;
                        };
    
                        const diffA = getTimeDiff(a);
                        const diffB = getTimeDiff(b);
    
                        if (diffA === Infinity && diffB === Infinity) {
                            const creationDiffA = getCreationTimeDiff(a);
                            const creationDiffB = getCreationTimeDiff(b);
                            return creationDiffB - creationDiffA; // Mais recentes primeiro
                        }
    
                        return diffA - diffB;
                    });
    
                    cardsArray.forEach(card => phaseCards.appendChild(card));
    
                    updateGhostCards(phaseCards);
                    resolve(data.results); // Retorna os cards carregados
                })
                .catch(error => {
                    console.warn(`❌LoadCards:  Erro ao carregar mais cards na fase ${faseId}:`, error);
                    spinnerContainer.style.display = 'none';
                    reject(error); // Rejeita a Promise em caso de erro
                });
        });
    }



    /*--------------------MODAL DE CARDS----------------------------*/
    //função para construir detalhes adicionais
    function detalhesAdicionais(cardId, alteracoes, card_movements) {
    
        const container = document.createElement('div');
        container.className = '';
        container.style.overflowY = 'auto';
        container.style.maxHeight = '100vh';
    
        const title = document.createElement('h5');
        title.className = 'text-muted';
        title.textContent = 'Detalhes Adicionais';
        container.appendChild(title);
    
        // Seção de Alterações
        const alteracoesTitle = document.createElement('h6');
        alteracoesTitle.className = 'text-muted';
        alteracoesTitle.textContent = 'Alterações:';
        container.appendChild(alteracoesTitle);
    
        const accordionAlteracoes = document.createElement('div');
        accordionAlteracoes.className = 'accordion';
        accordionAlteracoes.id = `accordionAlteracoes-${cardId}`;
        container.appendChild(accordionAlteracoes);
    
        const accordionItemAlteracoes = document.createElement('div');
        accordionItemAlteracoes.className = 'accordion-item';
        accordionAlteracoes.appendChild(accordionItemAlteracoes);
    
        const accordionHeaderAlteracoes = document.createElement('h5');
        accordionHeaderAlteracoes.className = 'accordion-header';
        accordionHeaderAlteracoes.id = `headingAlteracoes-${cardId}`;
        accordionItemAlteracoes.appendChild(accordionHeaderAlteracoes);
    
        const headerDivAlteracoes = document.createElement('div');
        headerDivAlteracoes.className = 'd-flex align-items-center';
        accordionHeaderAlteracoes.appendChild(headerDivAlteracoes);
    
        const iconDivAlteracoes = document.createElement('div');
        iconDivAlteracoes.className = 'p-2';
        headerDivAlteracoes.appendChild(iconDivAlteracoes);
    
        const iconAlteracoes = document.createElement('i');
        iconAlteracoes.className = 'fas fa-edit';
        iconDivAlteracoes.appendChild(iconAlteracoes);
    
        const buttonAlteracoes = document.createElement('button');
        buttonAlteracoes.className = 'accordion-button collapsed';
        buttonAlteracoes.type = 'button';
        buttonAlteracoes.dataset.bsToggle = 'collapse';
        buttonAlteracoes.dataset.bsTarget = `#collapseAlteracoes-${cardId}`;
        buttonAlteracoes.ariaExpanded = 'false';
        buttonAlteracoes.ariaControls = `collapseAlteracoes-${cardId}`;
        buttonAlteracoes.textContent = 'Ver Alterações';
        headerDivAlteracoes.appendChild(buttonAlteracoes);
    
        const collapseDivAlteracoes = document.createElement('div');
        collapseDivAlteracoes.id = `collapseAlteracoes-${cardId}`;
        collapseDivAlteracoes.className = 'accordion-collapse collapse';
        collapseDivAlteracoes.ariaLabelledby = `headingAlteracoes-${cardId}`;
        collapseDivAlteracoes.dataset.bsParent = `#accordionAlteracoes-${cardId}`;
        accordionItemAlteracoes.appendChild(collapseDivAlteracoes);
    
        const bodyDivAlteracoes = document.createElement('div');
        bodyDivAlteracoes.className = 'accordion-body';
        collapseDivAlteracoes.appendChild(bodyDivAlteracoes);
    
        const listGroupAlteracoes = document.createElement('ul');
        listGroupAlteracoes.className = 'list-group mb-3';
        bodyDivAlteracoes.appendChild(listGroupAlteracoes);
    
        if (alteracoes && alteracoes.length > 0) {
            ////console.log('Alterações encontradas para o cardId:', cardId);
            alteracoes.forEach(alt => {
                if (alt) {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listGroupAlteracoes.appendChild(listItem);
    
                    const timelineItem = document.createElement('div');
                    timelineItem.className = 'List-pstyle__sc-3zu2xf-1 hCmQvB';
                    listItem.appendChild(timelineItem);
    
                    const content = document.createElement('div');
                    content.className = 'Content-pstyle__sc-3zu2xf-5 dFfEFC';
                    timelineItem.appendChild(content);
    
                    const header = document.createElement('div');
                    header.className = 'Header-pstyle__sc-3zu2xf-2 hESeLr';
                    header.textContent = alt.descricao_atualizacao;
                    content.appendChild(header);
    
                    const date = document.createElement('span');
                    date.className = 'Date-pstyle__sc-3zu2xf-3 eisnSf';
                    const alteracaoDate = new Date(alt.data_alteracao);
                    if (!isNaN(alteracaoDate)) {
                        date.title = alteracaoDate.toLocaleString('pt-BR');
                        const diffTime = Math.abs(new Date() - alteracaoDate);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                        date.textContent = `há ${diffDays} dias`;
                    } else {
                        date.textContent = '';
                    }
                    content.appendChild(date);
                }
            });
        } else {
            //console.log('Nenhuma alteração encontrada para o cardId:', cardId);
            const noAlteracoesMessage = document.createElement('span');
            noAlteracoesMessage.className = 'text-muted';
            noAlteracoesMessage.textContent = 'Nenhuma alteração encontrada.';
            bodyDivAlteracoes.appendChild(noAlteracoesMessage);
        }
    
        // Seção de Movimentações
        const movimentacoesTitle = document.createElement('h6');
        movimentacoesTitle.className = 'text-muted';
        movimentacoesTitle.textContent = 'Movimentações:';
        container.appendChild(movimentacoesTitle);
    
        const accordionMovimentacoes = document.createElement('div');
        accordionMovimentacoes.className = 'accordion';
        accordionMovimentacoes.id = `accordionMovimentacoes-${cardId}`;
        container.appendChild(accordionMovimentacoes);
    
        const accordionItemMovimentacoes = document.createElement('div');
        accordionItemMovimentacoes.className = 'accordion-item';
        accordionMovimentacoes.appendChild(accordionItemMovimentacoes);
    
        const accordionHeaderMovimentacoes = document.createElement('h5');
        accordionHeaderMovimentacoes.className = 'accordion-header';
        accordionHeaderMovimentacoes.id = `headingMovimentacoes-${cardId}`;
        accordionItemMovimentacoes.appendChild(accordionHeaderMovimentacoes);
    
        const headerDivMovimentacoes = document.createElement('div');
        headerDivMovimentacoes.className = 'd-flex align-items-center';
        accordionHeaderMovimentacoes.appendChild(headerDivMovimentacoes);
    
        const iconDivMovimentacoes = document.createElement('div');
        iconDivMovimentacoes.className = 'p-2';
        headerDivMovimentacoes.appendChild(iconDivMovimentacoes);
    
        const iconMovimentacoes = document.createElement('i');
        iconMovimentacoes.className = 'fas fa-info-circle';
        iconDivMovimentacoes.appendChild(iconMovimentacoes);
    
        const buttonMovimentacoes = document.createElement('button');
        buttonMovimentacoes.className = 'accordion-button collapsed';
        buttonMovimentacoes.type = 'button';
        buttonMovimentacoes.dataset.bsToggle = 'collapse';
        buttonMovimentacoes.dataset.bsTarget = `#collapseMovimentacoes-${cardId}`;
        buttonMovimentacoes.ariaExpanded = 'false';
        buttonMovimentacoes.ariaControls = `collapseMovimentacoes-${cardId}`;
        buttonMovimentacoes.textContent = 'Ver Movimentações';
        headerDivMovimentacoes.appendChild(buttonMovimentacoes);
    
        const collapseDivMovimentacoes = document.createElement('div');
        collapseDivMovimentacoes.id = `collapseMovimentacoes-${cardId}`;
        collapseDivMovimentacoes.className = 'accordion-collapse collapse';
        collapseDivMovimentacoes.ariaLabelledby = `headingMovimentacoes-${cardId}`;
        collapseDivMovimentacoes.dataset.bsParent = `#accordionMovimentacoes-${cardId}`;
        accordionItemMovimentacoes.appendChild(collapseDivMovimentacoes);
    
        const bodyDivMovimentacoes = document.createElement('div');
        bodyDivMovimentacoes.className = 'accordion-body';
        collapseDivMovimentacoes.appendChild(bodyDivMovimentacoes);
    
        const listGroupMovimentacoes = document.createElement('ul');
        listGroupMovimentacoes.className = 'list-group mb-3';
        bodyDivMovimentacoes.appendChild(listGroupMovimentacoes);
    
        if (card_movements && card_movements.length > 0) {
            ////console.log('Movimentações encontradas para o cardId:', cardId);
            card_movements.forEach(mov => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listGroupMovimentacoes.appendChild(listItem);
    
                const timelineItem = document.createElement('div');
                timelineItem.className = 'List-pstyle__sc-3zu2xf-1 hCmQvB';
                listItem.appendChild(timelineItem);
    
                const content = document.createElement('div');
                content.className = 'Content-pstyle__sc-3zu2xf-5 dFfEFC';
                timelineItem.appendChild(content);
    
                const header = document.createElement('div');
                header.className = 'Header-pstyle__sc-3zu2xf-2 hESeLr';
                header.textContent = mov.descricao_movimentacao;
                content.appendChild(header);
    
                const date = document.createElement('span');
                date.className = 'Date-pstyle__sc-3zu2xf-3 eisnSf';
                const movidoEmDate = new Date(mov.movido_em);
                if (!isNaN(movidoEmDate)) {
                    date.title = movidoEmDate.toLocaleString('pt-BR');
                    const diffTime = Math.abs(new Date() - movidoEmDate);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    date.textContent = `há ${diffDays} dias`;
                } else {
                    date.textContent = '';
                }
                content.appendChild(date);
            });
        } else {
            //console.log('Nenhuma movimentação encontrada para o cardId:', cardId);
            const noMovimentacoesMessage = document.createElement('span');
            noMovimentacoesMessage.className = 'text-muted';
            noMovimentacoesMessage.textContent = 'Nenhuma movimentação encontrada.';
            bodyDivMovimentacoes.appendChild(noMovimentacoesMessage);
        }
    
        return container;
    }

    //limpa o formulário inicial
    function clearFormContainer(cardId) {
        const formContainer = document.getElementById(`formulario-inicial-card-${cardId}`);
        if (!formContainer) {
            console.error(`Contêiner de formulário não encontrado para o card ${cardId}`);
            return;
        }
        formContainer.innerHTML = '';
        ////console.log(`Contêiner de formulário do card ${cardId} limpo com sucesso`);
    }


    //cria campo de empresa personalizado
    function createEmpresaField(field) {
        const container = document.createElement('div');
        container.classList.add('form-group');

        const icon = createIcons(field);
        const label = createLabel(field);
        const displayDiv = createDisplayDivEmpresa(field);
        const input = createInput(field);
        const saveButton = createSaveButton();
        const cancelButton = createCancelButton();

        // Adiciona margem ao botão "Cancelar" para separá-lo do botão "Salvar"
        cancelButton.style.marginLeft = '10px';

        setupEditButton(displayDiv.querySelector('button'), input, saveButton, cancelButton, displayDiv.querySelector('span'));
        setupSaveButton(saveButton, input, displayDiv.querySelector('span'), displayDiv.querySelector('button'), cancelButton);
        setupCancelButton(cancelButton, input, saveButton, displayDiv.querySelector('span'), displayDiv.querySelector('button'));

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-inline-flex', 'align-items-center', 'gap-2');
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);

        container.appendChild(icon);
        container.appendChild(label);
        container.appendChild(displayDiv);
        container.appendChild(input);
        container.appendChild(buttonContainer);

        return container;
    }

    //cria campo de anexo personalizado
    function createAttachmentField(field) {
        const container = document.createElement('div');
        container.classList.add('form-group');

        const icon = createIcons(field);
        const label = createLabel(field);
        const displayDiv = createDisplayDivAttachment(field);
        const input = createInput(field);
        const saveButton = createSaveButton();
        const cancelButton = createCancelButton();

        // Adiciona margem ao botão "Cancelar" para separá-lo do botão "Salvar"
        cancelButton.style.marginLeft = '10px';

        setupEditButton(displayDiv.querySelector('button'), input, saveButton, cancelButton, displayDiv.querySelector('span'));
        setupSaveButton(saveButton, input, displayDiv.querySelector('span'), displayDiv.querySelector('button'), cancelButton);
        setupCancelButton(cancelButton, input, saveButton, displayDiv.querySelector('span'), displayDiv.querySelector('button'));

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-inline-flex', 'align-items-center', 'gap-2');
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);

        container.appendChild(icon);
        container.appendChild(label);
        container.appendChild(displayDiv);
        container.appendChild(input);
        container.appendChild(buttonContainer);

        return container;
    }
    
    //constrói os campos do card no formulário inicial
    function constroiCamposCard(cardId, faseNome) {
        fetch(`/api/card/${cardId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const fieldValues = data.field_values;
                //console.log(`Campos do card ${cardId}:`, fieldValues);

                // Filtra os campos do "Formulário Inicial"
                const filteredFieldValuesInicial = fieldValues.filter(field => field.formulario_titulo === "Formulário Inicial");

                // Ordena os campos filtrados
                filteredFieldValuesInicial.sort((a, b) => a.form_field - b.form_field);

                // Atualiza o formulário inicial
                const formContainerInicial = document.getElementById(`formulario-inicial-card-${cardId}`);
                if (!formContainerInicial) {
                    console.error(`Contêiner de formulário inicial não encontrado para o card ${cardId}`);
                    return;
                }

                formContainerInicial.innerHTML = '';

                // Adiciona o campo 'empresa' primeiro, se existir
                const empresaField = filteredFieldValuesInicial.find(field => field.field_type === 'empresa');
                if (empresaField) {
                    if (empresaField.value) {
                        const container = createEmpresaField(empresaField);
                        formContainerInicial.appendChild(container);
                    } else {
                        const container = createFieldContainer(empresaField);
                        formContainerInicial.appendChild(container);
                    }
                }

                // Adiciona o campo de anexo se existir
                const attachmentField = filteredFieldValuesInicial.find(field => field.field_type === 'attachment');
                if (attachmentField) {
                    if (attachmentField.value) {
                        const container = createAttachmentField(attachmentField);
                        formContainerInicial.appendChild(container);
                    } else {
                        const container = createAttachmentField(attachmentField);
                        formContainerInicial.appendChild(container);
                    }
                }

                // Adiciona os demais campos
                filteredFieldValuesInicial.forEach(field => {
                    if (field.field_type !== 'empresa' && field.field_type !== 'attachment') {
                        const container = createFieldContainer(field);
                        formContainerInicial.appendChild(container);
                    }
                });

                const spinnerInicial = document.getElementById(`spinner-formulario-inicial-${cardId}`);
                if (spinnerInicial) {
                    spinnerInicial.remove();
                }

                // Adiciona os detalhes adicionais
                const detalhesAdicionaisContainer = document.getElementById(`detalhes-adicionais-card-${cardId}`);
                if (detalhesAdicionaisContainer) {
                    detalhesAdicionaisContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos elementos
                    const detalhesAdicionaisElement = detalhesAdicionais(cardId, data.field_value_history, data.card_movements);
                    detalhesAdicionaisContainer.appendChild(detalhesAdicionaisElement);
                } else {
                    console.error(`Contêiner de detalhes adicionais não encontrado para o card ${cardId}`);
                }
            })
            .catch(error => {
                console.error(`Erro ao buscar campos do card ${cardId}:`, error);
            });
    }

    function clearFormContainerFase(cardId) {
        const formContainer = document.getElementById(`formulario-fase-card-${cardId}`);
        if (!formContainer) {
            console.error(`Contêiner de formulário não encontrado para o card ${cardId}`);
            return;
        }
        formContainer.innerHTML = '';
        console.log(`Contêiner de formulário fase do card ${cardId} limpo com sucesso`);
    }
    
    // Constrói os campos do formulário da fase
    function constroiCamposFase(cardId) {
        fetch(`/api/card/${cardId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const fieldValues = data.field_values;
                const faseNome = data.fase_nome; // Obtém o nome da fase diretamente dos dados da API
                console.log(`Resposta da API:`, data);

                // Verifica se fieldValues está definido
                if (!fieldValues) {
                    console.error(`fieldValues está indefinido para o card ${cardId} e fase ${faseNome}`);
                    return;
                }

                // Obtém o contêiner do formulário da fase
                const formContainerFase = document.getElementById(`formulario-fase-card-${cardId}`);
                if (!formContainerFase) {
                    console.error(`Contêiner de formulário da fase não encontrado para o card ${cardId}`);
                    return;
                }

                // Limpa o contêiner do formulário da fase
                formContainerFase.innerHTML = '';
                console.log(`Contêiner de formulário fase do card ${cardId} limpo com sucesso`);

                // Filtra os campos da fase especificada, ignorando os campos do "Formulário Inicial"
                const filteredFieldValuesFase = fieldValues.filter(field => field.fase_nome_field === faseNome && field.formulario_titulo !== "Formulário Inicial");
                console.log(`Campos filtrados para a fase ${faseNome}:`, filteredFieldValuesFase);

                // Ordena os campos filtrados
                filteredFieldValuesFase.sort((a, b) => a.form_field - b.form_field);

                const empresaField = filteredFieldValuesFase.find(field => field.field_type === 'empresa');
                if (empresaField) {
                    if (empresaField.value) {
                        const container = createEmpresaField(empresaField);
                        formContainerFase.appendChild(container);
                    } else {
                        const container = createFieldContainer(empresaField);
                        formContainerFase.appendChild(container);
                    }
                }

                // Adiciona todos os campos de anexo
                const attachmentFields = filteredFieldValuesFase.filter(field => field.field_type === 'attachment');
                attachmentFields.forEach(attachmentField => {
                    if (attachmentField.value) {
                        const container = createAttachmentField(attachmentField);
                        formContainerFase.appendChild(container);
                    } else {
                        const container = createAttachmentField(attachmentField);
                        formContainerFase.appendChild(container);
                    }
                });

                if (filteredFieldValuesFase.length === 0) {
                    const noFieldsMessage = document.createElement('span');
                    noFieldsMessage.textContent = `A fase ${faseNome} não possui nenhum campo.`;
                    formContainerFase.appendChild(noFieldsMessage);
                } else {
                    filteredFieldValuesFase.forEach(field => {
                        if (field.field_type !== 'empresa' && field.field_type !== 'attachment') {
                            const container = createFieldContainer(field);
                            formContainerFase.appendChild(container);
                        }
                    });
                }

                const spinnerFase = document.getElementById(`spinner-formulario-fase-${cardId}`);
                if (spinnerFase) {
                    spinnerFase.remove();
                }
            })
            .catch(error => {
                console.error(`Erro ao criar o modal para o card ${cardId}: ${error}`);
            });
    }

    //cria o contêiner do campo para o formulário inicial
    function createFieldContainer(field) {
        const container = document.createElement('div');
        container.classList.add('form-group');

        const icon = createIcons(field);
        const label = createLabel(field);
        const displayDiv = createDisplayDiv(field);
        const input = createInput(field);
        const saveButton = createSaveButton();
        const cancelButton = createCancelButton();

        // Adiciona margem ao botão "Cancelar" para separá-lo do botão "Salvar"
        cancelButton.style.marginLeft = '10px';

        setupEditButton(displayDiv.querySelector('button'), input, saveButton, cancelButton, displayDiv.querySelector('span'));
        setupSaveButton(saveButton, input, displayDiv.querySelector('span'), displayDiv.querySelector('button'), cancelButton);
        setupCancelButton(cancelButton, input, saveButton, displayDiv.querySelector('span'), displayDiv.querySelector('button'));

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-inline-flex', 'align-items-center', 'gap-2');
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);

        container.appendChild(icon);
        container.appendChild(label);
        container.appendChild(displayDiv);
        container.appendChild(input);
        container.appendChild(buttonContainer);

        return container;
    }

    //cria os ícones dos campos do formulário inicial
    function createIcons(field) {
        const icon = document.createElement('i');
        switch (field.field_type) {
            case 'short_text':
                icon.className = 'fas fa-font';
                break;
            case 'long_text':
                icon.className = 'fas fa-align-left';
                break;
            case 'number':
                icon.className = 'fas fa-hashtag';
                break;
            case 'select':
                icon.className = 'fas fa-list';
                break;
            case 'cnpj':
            case 'cpf':
                icon.className = 'fas fa-id-card';
                break;
            case 'currency':
                icon.className = 'fas fa-dollar-sign';
                break;
            case 'attachment':
                icon.className = 'fas fa-paperclip';
                break;
            case 'assignee_select':
                icon.className = 'fas fa-user';
                break;
            case 'date':
                icon.className = 'fas fa-calendar-alt';
                break;
            case 'datetime':
            case 'time':
                icon.className = 'fas fa-clock';
                break;
            case 'due_date':
                icon.className = 'fas fa-calendar-check';
                break;
            case 'label_select':
                icon.className = 'fas fa-tags';
                break;
            case 'phone':
                icon.className = 'fas fa-phone';
                break;
            case 'checklist_vertical':
                icon.className = 'fas fa-tasks';
                break;
            case 'statement':
                icon.className = 'fas fa-file-alt';
                break;
            case 'radio_horizontal':
            case 'radio_vertical':
                icon.className = 'fas fa-dot-circle';
                break;
            case 'checkbox_horizontal':
            case 'checkbox_vertical':
                icon.className = 'fas fa-check-square';
                break;
            case 'email':
                icon.className = 'fas fa-envelope';
                break;
            case 'url':
                icon.className = 'fas fa-link';
                break;
            case 'address':
                icon.className = 'fas fa-map-marker-alt';
                break;
            case 'empresa':
                icon.className = 'fas fa-building';
                break;
            default:
                icon.className = '';
        }
        //adiciona o icona a um div class"icon-box"
        const iconBox = document.createElement('div');
        iconBox.classList.add('icon-box');

        iconBox.appendChild(icon);
        return iconBox;
    }

    //cria o label dos campos do formulário inicial
    function createLabel(field) {
        const label = document.createElement('label');
        label.htmlFor = `field_${field.id}`;
        label.textContent = field.form_field_label;
        label.classList.add('form-label');
        return label;
    }

    //cria o display dos campos do formulário inicial
    function createDisplayDiv(field) {
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('d-flex', 'align-items-center');

        const displaySpan = document.createElement('span');
        displaySpan.classList.add('form-text', 'text-muted', 'me-2');
        displaySpan.style.fontSize = '0.89rem';
        displaySpan.style.color = '#18183a'; 
        displaySpan.style.fontWeight = 'bold';

        if (field.field_type === 'due_date' && field.value) {
            const date = new Date(field.value);
            const formattedDate = date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
            displaySpan.textContent = formattedDate;
        } else {
            displaySpan.textContent = field.value || 'Clique aqui para adicionar';
        }

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'p-0');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';

        displayDiv.appendChild(displaySpan);
        displayDiv.appendChild(editButton);
        return displayDiv;
    }
    
    //cria o display dos campos de anexo
    function createDisplayDivAttachment(field) {
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('d-flex', 'flex-column', 'align-items-start');

        const displaySpan = document.createElement('span');
        displaySpan.classList.add('form-text', 'text-muted', 'mb-2');
        displaySpan.style.fontSize = '0.89rem';
        displaySpan.style.color = '#18183a'; 
        displaySpan.style.fontWeight = 'bold';

        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'p-0');
        addButton.innerHTML = '<i class="fas fa-plus"></i>';

        displayDiv.appendChild(displaySpan);

        if (field.value) {
            const links = field.value.split(',');
            links.forEach(link => {
                const fileContainer = document.createElement('div');
                fileContainer.classList.add('d-flex', 'align-items-center');
                fileContainer.style.marginBottom = '0.5rem'; // Espaço discreto entre os botões

                const fileButton = document.createElement('button');
                fileButton.classList.add('btn-sequence-enter', 'me-2');

                const fileName = link.trim().split('/').pop().split('?')[0];
                const fileExtension = fileName.split('.').pop().toLowerCase();

                let iconClass = '';
                let buttonColor = '';

                switch (fileExtension) {
                    case 'zip':
                        iconClass = 'bi bi-file-earmark-zip';
                        buttonColor = 'btn-warning';
                        break;
                    case 'xls':
                    case 'xlsx':
                        iconClass = 'bi bi-file-earmark-spreadsheet';
                        buttonColor = 'btn-success';
                        break;
                    case 'txt':
                        iconClass = 'bi bi-file-earmark-text';
                        buttonColor = 'btn-secondary';
                        break;
                    case 'pdf':
                        iconClass = 'bi bi-file-earmark-pdf';
                        buttonColor = 'btn-danger';
                        break;
                    case 'png':
                    case 'jpg':
                        iconClass = 'bi bi-file-earmark-image';
                        buttonColor = 'btn-primary';
                        break;
                    default:
                        iconClass = 'bi bi-file-earmark';
                        buttonColor = 'btn-light';
                }

                fileButton.classList.add(buttonColor);
                fileButton.innerHTML = `
                    <a href="${link.trim()}" target="_blank" style="text-decoration: none; color: inherit;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="${iconClass}" viewBox="0 0 16 16">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM10.5 3a.5.5 0 0 1 .5.5V4h2a.5.5 0 0 1 .5.5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5v2.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                    </a>`;

                const fileNameSpan = document.createElement('span');
                fileNameSpan.classList.add('ms-1');
                fileNameSpan.textContent = fileName;

                fileContainer.appendChild(fileButton);
                fileContainer.appendChild(fileNameSpan);
                displayDiv.appendChild(fileContainer);
            });
            displaySpan.textContent = ''; // Remove o texto "Anexo adicionado"
        } else {
            displaySpan.textContent = 'Clique aqui para adicionar';
            //console.log('Clique aqui para adicionar');
        }

        displayDiv.appendChild(addButton);

        // Substitui o botão de edição pelo botão de adicionar anexo
        addButton.addEventListener('click', () => {
            adicionarAnexo(field);
        });

        return displayDiv;
    }


    function adicionarAnexo(field) {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true; // Permitir múltiplos arquivos
        input.className = 'form-control';
        input.id = 'dynamicFileInput';
        document.body.appendChild(input);
        //console.log('Criando input para receber anexos');

        input.addEventListener('change', async () => {
            const files = Array.from(input.files);
            const fileNames = files.map(file => file.name).join(', ');
            //console.log(`Arquivos selecionados: ${fileNames}`);
            
            function getPrefix() {
                const hostname = window.location.hostname;
                const parts = hostname.split('.');

                if (parts.length > 2) {
                    return parts[0];
                } else {
                    return 'sequence';
                }
            }

            async function uploadFilesToS3(files) {
                let prefix = getPrefix();
                if (!prefix.endsWith('/')) {
                    prefix += '/';
                }
                //console.log('Prefixo gerado:', prefix); // Adiciona um log para verificar o prefixo
                const url = `/upload_file_to_s3/${prefix}`;

                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append('file', files[i]);
                }

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao fazer upload do arquivo');
                    }

                    const data = await response.json();
                    //console.log('Upload bem-sucedido:', data);
                    //console.log('Salvo em prefixo:', prefix);
                    return data.urls; // Retorna a lista de URLs assinadas
                } catch (error) {
                    console.error('Erro:', error);
                    throw error;
                }
            }

            try {
                const urls = await uploadFilesToS3(files);
                //console.log('URLs dos arquivos enviados:', urls);
                const newValue = urls.join(', '); // Concatena as URLs em uma string separada por vírgulas

                // Chama a API para atualizar o valor do campo
                fetch(`/api/updatecardfieldvalue/${field.id}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken') // Função para obter o token CSRF
                    },
                    body: JSON.stringify({ value: newValue })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao atualizar o valor do campo');
                    }
                    return response.json();
                })
                .then(data => {
                    //console.log('Valor do campo atualizado com sucesso:', data);
                    location.reload(); // Recarrega a página para atualizar os dados
                })
                .catch(error => {
                    console.error('Erro ao atualizar o valor do campo:', error);
                });
            } catch (error) {
                console.error('Erro ao enviar arquivos:', error);
            }
        });

        input.click(); // Simula o clique no input para abrir o seletor de arquivos
    }

    // Função que cria a div com informações da empresa
    function createDisplayDivEmpresa(field) {
        const fieldValue = field.value;
        //console.log(fieldValue); // Adiciona o valor do field ao console log

        if (!fieldValue) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('alert', 'alert-info');
            messageDiv.textContent = 'Clique aqui para adicionar';
            return messageDiv;
        }

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-3', 'border', 'shadow-sm', 'p-2', 'empresa-card');

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body', 'd-flex', 'align-items-center');
        cardBodyDiv.style.padding = '3px';

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('empresa-avatar');
        avatarDiv.textContent = 'MD'; // Placeholder, pode ser substituído por dados reais

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('ms-3', 'w-100');

        const formCheckDiv = document.createElement('div');
        formCheckDiv.classList.add('form-check');

        const label = document.createElement('label');
        label.htmlFor = `empresa_${fieldValue}`;
        label.classList.add('form-check-label');
        label.innerHTML = '<strong>...</strong>'; // Placeholder, pode ser substituído por dados reais

        formCheckDiv.appendChild(label);

        const hr = document.createElement('hr');
        hr.classList.add('my-2');

        const razaoSocialP = document.createElement('p');
        razaoSocialP.classList.add('card-text', 'text-muted');
        razaoSocialP.innerHTML = '<strong>Razão Social:</strong> ....'; // Placeholder, pode ser substituído por dados reais

        const regimeTributarioP = document.createElement('p');
        regimeTributarioP.classList.add('card-text', 'text-muted');
        regimeTributarioP.innerHTML = '<strong>Regime Tributário:</strong> ...'; // Placeholder, pode ser substituído por dados reais

        const cnpjP = document.createElement('p');
        cnpjP.classList.add('card-text', 'text-muted');
        cnpjP.innerHTML = '<strong>CNPJ:</strong> ...'; // Placeholder, pode ser substituído por dados reais



        const cidadeP = document.createElement('p');
        cidadeP.classList.add('card-text', 'text-muted');
        cidadeP.innerHTML = '<strong>Cidade:</strong> ...'; // Placeholder, pode ser substituído por dados reais

        contentDiv.appendChild(formCheckDiv);
        contentDiv.appendChild(hr);
        contentDiv.appendChild(razaoSocialP);
        contentDiv.appendChild(regimeTributarioP);
        contentDiv.appendChild(cidadeP);

        cardBodyDiv.appendChild(avatarDiv);
        cardBodyDiv.appendChild(contentDiv);

        cardDiv.appendChild(cardBodyDiv);

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'p-0');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            //console.log(`Editando empresa ${fieldValue}`);

            // Cria o seletor de empresas antes de remover o cardDiv
            const selectEmpresaContainer = buscaeCriaSelectEmpresa(field);

            // Verifica se o cardDiv ainda tem um pai antes de tentar acessar
            if (cardDiv.parentNode) {
                cardDiv.parentNode.insertBefore(selectEmpresaContainer, cardDiv.nextSibling);
            }

            // Remove o card existente
            cardDiv.remove();
        });


        cardDiv.appendChild(editButton);

        // Exemplo de como fazer uma requisição para a URL com o valor do field
        const url = `/api/empresas/${fieldValue}/get_by_id/`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Atualiza os placeholders com os dados reais da API
                label.innerHTML = `<strong>${data.nome_fantasia}</strong>`;
                razaoSocialP.innerHTML = `<strong>Razão Social:</strong> ${data.razao_social}`;
                cnpjP.innerHTML = `<strong>CNPJ:</strong> ${data.cnpj_cpf_caepf}`;
                regimeTributarioP.innerHTML = `<strong>Regime Tributário:</strong> ${data.regime_tributario_nome}`;
                cidadeP.innerHTML = `<strong>Cidade:</strong> ${data.cidade}`;
                avatarDiv.textContent = data.nome_fantasia.split(' ').map(word => word[0]).join(''); // Inicial do nome fantasia
            })
            .catch(error => console.error('Error:', error));

        return cardDiv;
    }

    // Função para criar seleção de empresas
    function buscaeCriaSelectEmpresa(field) {
        const container = document.createElement('div');
        container.id = 'field_empresa_container';
        container.classList.add('form-group', 'p-3', 'bg-light', 'rounded');

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Pesquisar empresas...';
        searchInput.classList.add('form-control', 'mb-3', 'shadow-sm');
        container.appendChild(searchInput);

        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.id = 'checkboxes_container';
        checkboxesContainer.style.maxHeight = '200px'; // Define a altura máxima do contêiner
        checkboxesContainer.style.overflowY = 'auto'; // Adiciona rolagem vertical
        container.appendChild(checkboxesContainer);

        fetch('/api/empresas/')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    data.slice(0, 2).forEach(empresa => { // Limita a exibição a dois cards
                        const card = document.createElement('div');
                        card.classList.add('card', 'mb-3', 'border', 'shadow-sm', 'p-2', 'empresa-card');

                        const cardBody = document.createElement('div');
                        cardBody.classList.add('card-body', 'd-flex', 'align-items-center');
                        cardBody.style.padding = '3px';

                        // Criando o "avatar" com as iniciais da empresa
                        const avatar = document.createElement('div');
                        avatar.classList.add('empresa-avatar');
                        avatar.textContent = empresa.nome.split(" ").map(word => word[0]).join("").substring(0, 2).toUpperCase();

                        const contentContainer = document.createElement('div');
                        contentContainer.classList.add('ms-3', 'w-100');

                        const checkboxContainer = document.createElement('div');
                        checkboxContainer.classList.add('form-check');

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = `empresa_${empresa.id}`;
                        checkbox.name = 'field_empresa';
                        checkbox.value = empresa.id;
                        checkbox.classList.add('form-check-input');

                        // Adiciona o evento de mudança para cada checkbox
                        checkbox.addEventListener('change', function() {
                            if (this.checked) {
                                const checkboxes = checkboxesContainer.querySelectorAll('input[type="checkbox"]');
                                checkboxes.forEach(cb => {
                                    if (cb !== this) {
                                        cb.checked = false;
                                    }
                                });
                            }
                            const selectedEmpresas = getSelectedEmpresas();
                            //console.log('Empresas selecionadas:', selectedEmpresas);
                        });

                        const label = document.createElement('label');
                        label.htmlFor = `empresa_${empresa.id}`;
                        label.innerHTML = `<strong>${empresa.nome}</strong>`; // Nome em negrito
                        label.classList.add('form-check-label');

                        const hr = document.createElement('hr');
                        hr.classList.add('my-2');

                        const razaoSocial = document.createElement('p');
                        razaoSocial.innerHTML = `<strong>Razão Social:</strong> ${empresa.razao_social}`;
                        razaoSocial.classList.add('card-text', 'text-muted');

                        const regimeTributario = document.createElement('p');
                        regimeTributario.innerHTML = `<strong>Regime Tributário:</strong> ${empresa.regime_tributario_nome}`;
                        regimeTributario.classList.add('card-text', 'text-muted');

                        const cidadeEmpresa = document.createElement('p');
                        cidadeEmpresa.innerHTML = `<strong>Cidade:</strong> ${empresa.cidade}`;
                        cidadeEmpresa.classList.add('card-text', 'text-muted');

                        checkboxContainer.appendChild(checkbox);
                        checkboxContainer.appendChild(label);
                        contentContainer.appendChild(checkboxContainer);
                        contentContainer.appendChild(hr);
                        contentContainer.appendChild(razaoSocial);
                        contentContainer.appendChild(regimeTributario);
                        contentContainer.appendChild(cidadeEmpresa);

                        cardBody.appendChild(avatar);
                        cardBody.appendChild(contentContainer);
                        card.appendChild(cardBody);
                        checkboxesContainer.appendChild(card);
                    });

                    // Adiciona funcionalidade de pesquisa
                    searchInput.addEventListener('input', function() {
                        const searchTerm = searchInput.value.toLowerCase();
                        const cards = checkboxesContainer.querySelectorAll('.card');
                        cards.forEach(card => {
                            const label = card.querySelector('label');
                            const empresaNome = label.textContent.toLowerCase();
                            card.style.display = empresaNome.includes(searchTerm) ? '' : 'none';
                        });
                    });
                } else {
                    console.error('Formato de dados inesperado:', data);
                    displayAlert('danger', 'Erro ao buscar empresas: Formato de dados inesperado');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar empresas:', error);
                displayAlert('danger', `Erro ao buscar empresas: ${error.message}`);
            });

        // Adiciona os botões "Salvar" e "Cancelar"
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-end', 'mt-3');

        const saveButton = document.createElement('button');
        saveButton.classList.add('btn-sequence-enter');
        saveButton.id = 'save-card-btn';
        saveButton.innerHTML = `
            Salvar
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
            </svg>
        `;
        saveButton.addEventListener('click', function() {
            const selectedEmpresas = getSelectedEmpresas();
            const newValue = selectedEmpresas.length > 0 ? selectedEmpresas[0].id : null;
            
            //console.log('Empresas selecionadas para salvar:', selectedEmpresas, 'Field:', field);
            // Chama a API para atualizar o valor do campo
            fetch(`/api/updatecardfieldvalue/${field.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Função para obter o token CSRF
                },
                body: JSON.stringify({ value: newValue })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o valor do campo');
                }
                return response.json();
            })
            .then(data => {
                location.reload(); // Recarrega a página para atualizar os dados
            })
            .catch(error => {
                console.error('Erro ao atualizar o valor do campo:', error);
            });
        });

        buttonContainer.appendChild(saveButton);
        container.appendChild(buttonContainer);

        return container;
    }

    // Função para reconhecer qual empresa foi selecionada
    function getSelectedEmpresas() {
        const checkboxes = document.querySelectorAll('input[name="field_empresa"]:checked');
        const selectedEmpresas = Array.from(checkboxes).map(checkbox => {
            const empresaCard = checkbox.closest('.card');
            const empresaNome = empresaCard.querySelector('label').textContent.trim();
            return { id: checkbox.value, nome: empresaNome };
        });
        return selectedEmpresas;
    }
    
    //cria o input dos campos do formulário inicial com base no tipo de field
    function createInput(field) {
        let input;
        switch (field.field_type) {
            case 'short_text':
                input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Digite aqui';
                break;
            case 'long_text':
                input = document.createElement('textarea');
                input.placeholder = 'Digite aqui';
                break;
            case 'email':
                input = document.createElement('input');
                input.type = 'email';
                input.placeholder = 'Digite aqui';
                break;
            case 'cpf':
                input = document.createElement('input');
                input.type = 'text';
                input.pattern = '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}';
                input.placeholder = '000.000.000-00';
                input.addEventListener('input', function() {
                    let value = input.value.replace(/\D/g, '');
                    if (value.length > 11) value = value.slice(0, 11);
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                    input.value = value;
                });
                break;
            case 'cnpj':
                input = document.createElement('input');
                input.type = 'text';
                input.pattern = '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}';
                input.placeholder = '00.000.000/0000-00';
                input.addEventListener('input', function() {
                    let value = input.value.replace(/\D/g, '');
                    if (value.length > 14) value = value.slice(0, 14);
                    value = value.replace(/(\d{2})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})(\d)/, '$1/$2');
                    value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
                    input.value = value;
                });
                break;
            case 'currency':
                input = document.createElement('input');
                input.type = 'text';
                input.pattern = '\\d+(\\.\\d{2})?';
                input.placeholder = '0.00';
                input.addEventListener('input', function() {
                    let value = input.value.replace(/\D/g, '');
                    if (value.length > 15) value = value.slice(0, 15);
                    value = (value / 100).toFixed(2).replace('.', ',');
                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    input.value = `R$ ${value}`;
                });
                break;
            case 'phone':
                input = document.createElement('input');
                input.type = 'tel';
                input.pattern = '\\(\\d{2}\\) \\d{4,5}-\\d{4}';
                input.placeholder = '(00) 00000-0000';
                input.addEventListener('input', function() {
                    let value = input.value.replace(/\D/g, '');
                    if (value.length > 11) value = value.slice(0, 11);
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
                    input.value = value;
                });
                break;
            case 'number':
                input = document.createElement('input');
                input.type = 'number';
                input.placeholder = 'Digite o número';
                break;
            case 'date':
            case 'due_date':
                input = document.createElement('input');
                input.type = 'datetime-local';
                if (field.value) {
                    const date = new Date(field.value);
                    const formattedDate = date.toISOString().slice(0, 16);
                    input.value = formattedDate;
                }
                break;
            case 'datetime':
                input = document.createElement('input');
                input.type = 'datetime-local';
                break;
            case 'time':
                input = document.createElement('input');
                input.type = 'time';
                break;
            case 'select':
            case 'assignee_select':
            case 'label_select':
                input = document.createElement('select');
                const defaultOption = document.createElement('option');
                defaultOption.textContent = 'Selecione uma opção';
                defaultOption.value = '';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                input.appendChild(defaultOption);

                // Adiciona as opções ao select
                if (field.options && Array.isArray(field.options)) {
                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.textContent = option.label;
                        optionElement.value = option.value;
                        input.appendChild(optionElement);
                    });
                }
                break;
            case 'attachment':
                input = document.createElement('input');
                input.type = 'text';
                break;
            case 'checklist_vertical':
            case 'radio_horizontal':
                input = document.createElement('div');
                break;
            case 'statement':
                input = document.createElement('textarea');
                break;
            default:
                input = document.createElement('input');
                input.type = 'text';
        }

        input.id = `field_${field.id}`;
        input.name = `field_${field.id}`;
        input.value = field.value || '';
        input.classList.add('form-control', 'mt-2');
        input.style.display = 'none';

        if (field.required) {
            input.setAttribute('required', 'required');
        }
        return input;
    }

    //cria o botão de salvar dos campos do formulário inicial
    function createSaveButton() {
        const saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.classList.add('btn-sequence-enter');
        saveButton.id = 'save-card-btn';
        saveButton.innerHTML = `
            Salvar
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
            </svg>
        `;
        saveButton.style.display = 'none';
        return saveButton;
    }

    //cria o botão de cancelar dos campos do formulário inicial
    function createCancelButton() {
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.classList.add('btn', 'btn-secondary', 'mt-2');
        cancelButton.id = 'cancel-card-btn';
        cancelButton.innerHTML = `
            Cancelar
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        `;
        cancelButton.style.display = 'none';
        return cancelButton;
    }

    // configura o botão de editar dos campos do formulário inicial
    function setupEditButton(editButton, input, saveButton, cancelButton, displaySpan) {
        editButton.addEventListener('click', () => {
            ////console.log('Botão de edição clicado para o field:', input.id); 
            if (displaySpan.textContent === 'Clique aqui para adicionar') {
                displaySpan.textContent = '';
            }
            input.style.display = 'block';
            saveButton.style.display = 'inline-block';
            cancelButton.style.display = 'inline-block';
            displaySpan.style.display = 'none';
            editButton.style.display = 'none';
            input.dataset.oldValue = input.value; // Armazena o valor antigo
        });
    }

    // configura o botão de salvar dos campos do formulário inicial
    function setupSaveButton(saveButton, input, displaySpan, editButton, cancelButton) {
        saveButton.addEventListener('click', () => {
            const oldValue = input.dataset.oldValue; // Recupera o valor antigo
            const newValue = input.value; // Novo valor digitado
            ////console.log(`Valor antigo: ${oldValue}, Novo valor: ${newValue}`);

            // Atualiza o displaySpan com o novo valor
            displaySpan.textContent = newValue;
            input.style.display = 'none';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            displaySpan.style.display = 'inline';
            editButton.style.display = 'inline-block';

            // Chama a API para atualizar o valor do campo
            fetch(`/api/updatecardfieldvalue/${input.id.split('_')[1]}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Função para obter o token CSRF
                },
                body: JSON.stringify({ value: newValue })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar o valor do campo');
                }
                return response.json();
            })
            .then(data => {
                //location.reload(); // Recarrega a página para atualizar os dados
            })
            .catch(error => {
                console.error('Erro ao atualizar o valor do campo:', error);
            });
        });
    }

    //configura o botão de cancelar dos campos do formulário inicial
    function setupCancelButton(cancelButton, input, saveButton, displaySpan, editButton) {
        cancelButton.addEventListener('click', () => {
            input.style.display = 'none';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            displaySpan.style.display = 'inline';
            editButton.style.display = 'inline-block';
            input.value = displaySpan.textContent;
        });
    }

    //seleciona os responsáveis do card no modal aberto no dropdown do card
    function getSelectedResponsaveisIds() {
        const dropdownColaboradores = document.getElementById('dropdownColaboradores');
        const selectedIds = Array.from(dropdownColaboradores.querySelectorAll('input[name="colaboradores"]:checked'))
            .map(checkbox => checkbox.value);

        return selectedIds;
    }

    //abre o modal do card
    function openCardModal(card) {
        const modalId = `customModal-${card.id}`;

        createModalElement(modalId, card).then(modalElement => {
            document.body.appendChild(modalElement);
            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            const dropdownColaboradores = modalElement.querySelector('#dropdownColaboradores');
            if (dropdownColaboradores) {
                dropdownColaboradores.style.display = 'none';
            }

            clearFormContainer(card.id);
            constroiCamposCard(card.id, card.fase_nome);

            clearFormContainerFase(card.id);
            constroiCamposFase(card.id);

            addDeleteCardEvent(modalElement, card.id);
            addDropdownEventListeners(modalElement);

            // Adiciona o evento de mudança nos checkboxes
            dropdownColaboradores.addEventListener('change', (event) => {
                if (event.target.name === 'colaboradores') {
                    const selectedIds = getSelectedResponsaveisIds();
                    //fecha o dropdown após selecionar os responsáveis
                    dropdownColaboradores.style.display = 'none';
                    // Adiciona um tempo para reconhecer quais foram os selecionados
                    setTimeout(() => {
                        updateResponsaveisCard(card.id, selectedIds);
                        //console.log('Responsáveis selecionados:', selectedIds);
                        //consulta o card com as informações atualizadas

                    }, 1000);
                }
            });
        }).catch(error => {
            console.error(`Erro ao criar o modal para o card ${card.id}:`, error);
        });
    }

    // Função para atualizar o responsável no modal e no card da fase
    async function updateResponsaveisCard(cardId, responsavelNomes) {
        if (!responsavelNomes || responsavelNomes.length === 0) {
            console.warn(`Nenhum responsável selecionado para o card ${cardId}.`);
            return;
        }

        const url = `/api/update_responsaveis_card/${cardId}/`;
        const data = { responsavel_ids: responsavelNomes };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Erro ao atualizar responsáveis para o card ${cardId}:`, errorData);
                return;
            }

            const updatedCard = await response.json();
            //console.log('Responsável atualizado:', updatedCard);

            // Atualiza instantaneamente o responsável no modal e no card da fase
            atualizarResponsavelNoDOM(cardId, updatedCard);
        } catch (error) {
            console.error(`Erro ao atualizar responsáveis do card ${cardId}:`, error);
        }
    }

    // Atualiza o responsável no DOM sem precisar recarregar a página
    function atualizarResponsavelNoDOM(cardId, card) {
        try {
            //console.log('Atualizando responsável no DOM:', cardId, card);
            const responsavelContainerModal = document.getElementById(`responsavel-container-modal${cardId}`);
            const responsavelContainerCard = document.getElementById(`responsavel-container-card${cardId}`);

            if (!responsavelContainerModal) {
                console.warn(`Não foi possível encontrar o contêiner modal para o card ${cardId}.`);
                return;
            }

            if (!responsavelContainerCard) {
                console.warn(`Não foi possível encontrar o contêiner do card para o card ${cardId}.`);
                return;
            }

            // Remove o conteúdo antigo
            responsavelContainerModal.innerHTML = '';
            responsavelContainerCard.innerHTML = '';

            fetch(`/api/cardresponsavel/${cardId}/`)
                .then(response => response.json())
                .then(data => {
                    ////console.log('Card atualizado:', data);
                    // Atualiza o responsável no modal
                    const responsavelModal = document.createElement('span');
                    const nome = data.responsavel_nome ? data.responsavel_nome : 'Desconhecido';
                    const foto = data.responsavel_foto_perfil ? data.responsavel_foto_perfil : 'none';
                    ////console.log('nome:', nome);
                    ////console.log('foto:', foto);
                    ////console.log('card id:', data.id);
                    responsavelModal.id = `responsavel-container-modal${data.id}`;
                    responsavelModal.innerHTML = `<img id="responsavel-${data.id}" src="${foto}" alt="${nome}" title="${nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">`;
                    responsavelContainerModal.appendChild(responsavelModal);

                    // Atualiza o responsável no card da fase
                    const responsavelCard = document.createElement('span');
                    responsavelCard.id = `responsavel-container-card${data.id}`;
                    responsavelCard.innerHTML = `<img id="responsavel-${data.id}" src="${foto}" alt="${nome}" title="${nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">`;
                    responsavelContainerCard.appendChild(responsavelCard);



                })
                .catch(error => {
                    console.error(`Erro ao buscar os dados do card ${cardId}:`, error);
                });

        } catch (error) {
            console.error(`Erro ao atualizar o responsável no DOM para o card ${cardId}:`, error);
        }
    }

    //cria o elemento modal
    async function createModalElement(modalId, card) {
        const responsaveis = await getResponsaveis(card); // Aguarda a resolução da Promise
        const vencimentoBadge = getVencimentoBadge(card);
        const dropdownColaboradores = await apiResponsavel(card); // Aguarda a resolução da Promise
    
        const modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = modalId;
        modalElement.tabIndex = -1;
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.innerHTML = await getModalHTML(card, responsaveis, vencimentoBadge, dropdownColaboradores); // Aguarda a resolução da Promise
    
        addEventListeners(modalElement, card);
    
        return modalElement;
    }

    //adiciona o responsavel ao card
    async function getResponsaveis(card) {
        //console.log('Card: para consulta de responsavel', card.id);
        try {
            const response = await fetch(`/api/cardresponsavel/${card.id}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //console.log('Responsáveis do card:', data);
            //console.log('Nome:', data.responsavel_nome);
            //console.log('Foto:', data.responsavel_foto_perfil);
            return data.responsavel_nome && data.responsavel_nome.length > 0 
                ? data.responsavel_nome.map((nome, index) => {
                    const foto = data.responsavel_foto_perfil[index];
                    return foto 
                        ? `<img id="responsavel-${card.id}" src="${foto}" alt="${nome}" title="${nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">`
                        : nome;
                }).join(' ')
                : '<i class="mdi mdi-account-outline" style="color: red;"></i> N/R';
        } catch (error) {
            console.error('Erro ao buscar os responsáveis:', error);
            return '<i class="mdi mdi-account-outline" style="color: red;"></i> N/R';
        }
    }

    //adiciona o vencimento ao card
    function getVencimentoBadge(card) {
        return card.vencimento 
            ? (card.tempo_para_vencimento.includes("Vencido") 
                    ? `<span class="badge bg-danger text-white">${card.tempo_para_vencimento}</span>` 
                    : card.tempo_para_vencimento.includes("minutos") 
                        ? `<span class="badge bg-warning text-dark">${card.tempo_para_vencimento}</span>` 
                        : card.tempo_para_vencimento.includes("horas") 
                            ? `<span class="badge bg-warning text-dark">${card.tempo_para_vencimento}</span>` 
                            : `<span class="badge bg-dark text-white">${card.tempo_para_vencimento}</span>`)
            : '';
    }

    //api retorna os colaboradores
    function apiResponsavel(card) {
        return fetch('/api/colaboradores/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                ////console.log('Colaboradores:', response);
                return response.json();
            })
            .then(data => {
                return data.map(colaborador => `
                    <li class="dropdown-item" id="dropdown-item-${colaborador.id}">
                        <input type="checkbox" name="colaboradores" value="${colaborador.id}" style="margin-right: 10px;">
                        <img src="${colaborador.foto_perfil}" alt="${colaborador.nome}" title="${colaborador.nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">
                        <label for="colaboradores">${colaborador.nome}</label>
                    </li>
                `).join('');
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                return '';
            });
    }

    //adiciona um drop com os colaboradores
    function getDropdownColaboradores(card) {
        return card.responsavel_nome && card.responsavel_nome.length > 0
            ? card.responsavel_nome.map((nome, index) => {
                const foto = card.responsavel_foto_perfil[index];
                return `
                    <li>
                        <a class="dropdown-item" href="#" style="max-height: 432px; position: relative; background: var(--light-base); border: 1px solid var(--gray-600); border-radius: var(--radius-default); display: flex; flex-direction: column; box-shadow: rgba(102, 102, 102, 0.05) 0px 3px 17px, rgba(102, 102, 102, 0.06) 0px 9px 14px, rgba(102, 102, 102, 0.09) 0px 4px 6px; overflow: auto; width: 100%; --dropdown-item-spacing-left: 20px; --dropdown-item-spacing-right: 20px; --dropdown-item-spacing-y: 11px;">
                            ${foto ? `<img src="${foto}" alt="${nome}" title="${nome}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">` : ''}
                            ${nome}
                        </a>
                    </li>
                `;
            }).join('')
            : '<li><a class="dropdown-item" href="#">Nenhum colaborador atribuído</a></li>';
    }

    //elemento html do modal do card
    async function getModalHTML(card, responsaveis, vencimentoBadge, dropdownColaboradores) {
        let fasesSequencia = [];
        let cardFaseNome = []
    
        try {
            const response = await fetch(`/api/card/${card.id}/`);
            const data = await response.json();
            //console.log('Card:', data);
            fasesSequencia = data.fases_sequencia || [];
            cardFaseNome = data.fase_nome || [];
        } catch (error) {
            console.error('Erro ao buscar os dados do card:', error);
        }
    
        return `
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content" style="border-top: 4px solid ${sequenciacor}; border-radius: 10px; background: #fff;">
                    <div class="modal-header-sequence">
                        <h4 class="modal_card_title me-2" id="addNewcardModalLabel" style="display: flex; align-items: center;">
                            <span class="card-title-text" data-card-id="${card.id}">${card.titulo}</span>
                            <input type="text" class="card-title-input" style="display: none;" value="${card.titulo}">
                        </h4>
                        <div class="d-flex justify-content-center align-items-center w-100">
                            <div class="btn-group me-2">
                                <button type="button" class="btn btn-outline-danger delete-card" data-card-id="${card.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="btn-group me-2" id="dropdown-fases">
                                <button type="button" class="btn-sequence-create dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Fase
                                </button>
                                <ul class="dropdown-menu" id="fase-dropdown-menu">
                                    ${fasesSequencia.map(fase => `<li><a class="dropdown-item" data-fase="${fase.id}" data-card-id="${card.id}" data-fase-nome="${fase.nome}">${fase.nome}</a></li>`).join('')}
                                </ul>
                            </div>    
                            <div>
                                <span class="tag" style="background-color: ${sequenciacor}" id="fase-nome-tag">${cardFaseNome}</span>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" style="max-height: 70vh; overflow-y: overlay; scrollbar-width: thin; scrollbar-color: #E5E5E5 #F7F7F7; padding: 16px 32px 0px;">
                        <div class="row">
                            <div class="col-md-4 bg-light p-3" style="max-height: 70vh; overflow-y: overlay; scrollbar-width: thin; scrollbar-color: #E5E5E5 #F7F7F7; padding: 16px 32px 0px;">
                                <span class="text-muted d-flex align-items-center mt-1" style="font-size: 14px; gap: 8px;"> 
                                    <span id="responsavel-container-modal${card.id}">
                                        ${responsaveis}
                                    </span>
                                    <button id="dropdownColaboradoresBtn" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 1px;">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <div class="dropdown">
                                        <ul class="dropdown-menu" id="dropdownColaboradores" style="
                                            max-height: 432px; 
                                            position: relative; 
                                            background: var(--light-base); 
                                            border: 1px solid var(--gray-600); 
                                            border-radius: var(--radius-default); 
                                            display: flex; 
                                            flex-direction: column; 
                                            box-shadow: rgba(102, 102, 102, 0.05) 0px 3px 17px, 
                                                        rgba(102, 102, 102, 0.06) 0px 9px 14px, 
                                                        rgba(102, 102, 102, 0.09) 0px 4px 6px; 
                                            overflow: auto; 
                                            width: 100%; 
                                            --dropdown-item-spacing-left: 20px; 
                                            --dropdown-item-spacing-right: 20px; 
                                            --dropdown-item-spacing-y: 11px;">
                                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1px;">
                                                <span class="dropdown-item-text" style="font-weight: bold; font-size: 16px;">Adicionar Responsáveis</span>
                                            </div>
                                            <hr>
                                            ${dropdownColaboradores}
                                        </ul>
                                    </div>
                                    ${vencimentoBadge}
                                </span>
                                <hr>
                                <h5 class="text-muted">Formulário Inicial</h5>
                                <div id="spinner-formulario-inicial-${card.id}" class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Carregando...</span>
                                </div>
                                <div id="formulario-inicial-card-${card.id}"></div>
                            </div>
                            <div class="col-md-4 p-3" style="max-height: 70vh; overflow-y: overlay; scrollbar-width: thin; scrollbar-color: #E5E5E5 #F7F7F7; padding: 16px 32px 0px;">
                                <a href="/public/phaseform/${card.id}/${card.fase}" target="_blank"
                                class="btn d-flex"
                                data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Compartilhe o formulário para ser preenchido pelo público"
                                style="margin: 10px;">
                                <span>Compartilhar Formulário da Fase</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                    class="bi bi-link-45deg" viewBox="0 0 16 16">
                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 
                                            2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                </svg>
                                </a>
                                <hr>
                                <h5 class="text-muted">Formulário da fase <span class="badge bg-secondary"></span></h5>
                                <div id="spinner-formulario-fase-${card.id}" class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Carregando...</span>
                                </div>
                                <div id="formulario-fase-card-${card.id}"></div> 
                            </div>
                            <div class="col-md-4 bg-light p-3">
                                <div id="detalhes-adicionais-card-${card.id}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    // Função para atualizar o nome da fase no modal
    function atualizarFaseNome(cardId, novoNomeFase) {
        const faseNomeTag = document.getElementById('fase-nome-tag');
        if (faseNomeTag) {
            faseNomeTag.textContent = novoNomeFase;
        }
    }

    //eventos do modal do card
    function addEventListeners(modalElement, card) {
        const cardTitleText = modalElement.querySelector('.card-title-text');
        const cardTitleInput = modalElement.querySelector('.card-title-input');

        cardTitleText.addEventListener('dblclick', () => {
            cardTitleText.style.display = 'none';
            cardTitleInput.style.display = 'inline';
            cardTitleInput.focus();
        });

        cardTitleInput.addEventListener('blur', () => {
            cardTitleText.textContent = cardTitleInput.value;
            cardTitleText.style.display = 'inline';
            cardTitleInput.style.display = 'none';
            ////console.log(`Título alterado para: ${cardTitleInput.value}`);
            updateCardTitle(card.id, cardTitleInput.value);
        });

        modalElement.querySelector('#dropdownColaboradoresBtn').addEventListener('click', () => {
            const dropdown = modalElement.querySelector('#dropdownColaboradores');
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
    }

    //atualiza o título do card
    function updateCardTitle(cardId, newTitle) {
        fetch(`/api/cards/${cardId}/update-title/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ titulo: newTitle })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o título do card');
            }
            return response.json();
        })
        .then(data => {
            const titleElement = document.querySelector(`#card-title-${cardId}`);
            
            if (!titleElement) {
                console.warn(`⚠️ Elemento do título do card ${cardId} não encontrado.`);
                return;
            }

            titleElement.textContent = data.titulo;
            ////console.log(`✅ Título do card ${cardId} atualizado para "${data.titulo}"`);

            // 🔥 Enviar atualização para o WebSocket (todos os usuários)
            socket.send(JSON.stringify({
                event: "update_card_title",
                card_id: cardId,
                new_title: newTitle
            }));
        })
        .catch(error => {
            console.error('Erro ao atualizar o título do card:', error);
        });
    }

    //adiciona o evento de deletar o card
    function addDeleteCardEvent(modalElement, cardId) {
        modalElement.querySelector('.delete-card').addEventListener('click', function() {
            deleteCard(cardId);
        });
    }

    //adiciona o evento de dropdown do mover card por fases
    function addDropdownEventListeners(modalElement) {
        const dropdownItems = modalElement.querySelectorAll('#dropdown-fases .dropdown-item');

        dropdownItems.forEach(item => {
            item.addEventListener('click', async function (event) {
                const newPhaseId = this.getAttribute('data-fase');
                const cardId = this.getAttribute('data-card-id');
                const faseNome = this.getAttribute('data-fase-nome');

                if (!cardId) {
                    alert('Erro: ID do card não encontrado.');
                    return;
                }

                try {
                    const response = await fetch('/update_card_phase/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCSRFToken()
                        },
                        body: JSON.stringify({
                            card_id: cardId,
                            new_phase_id: newPhaseId
                        })
                    });

                    const data = await response.json();

                    if (data.success) {
                        displayAlert('success', '' + faseNome + ' com sucesso!');
                        ////console.log('Card movido para a fase ' + faseNome + ' com sucesso!');
                        setTimeout(() => {
                            const modalInstance = bootstrap.Modal.getInstance(modalElement);
                            modalInstance.hide();
                        }, 3000);
                    } else {
                        displayAlert('Erro ao atualizar o card: ' + data.errors);
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                    displayAlert('danger', error.message || 'Erro desconhecido ao atualizar o card.');
                }
            });
        });
    }

    // deleta o card
    function deleteCard(cardId) {
        const csrfToken = getCookie('csrftoken'); // Função para obter o token CSRF

        fetch(`/card/${cardId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken // Envia o token CSRF no cabeçalho
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || `Erro na requisição. Status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Envia uma mensagem via WebSocket informando que o card foi deletado
                socket.send(JSON.stringify({
                    event: 'delete_card',
                    card_id: cardId
                }));

                // Exibe o alerta de sucesso
                showAlert('success', 'Card deletado com sucesso!');
                removeCardFromDOM(cardId); // 🔥 Remove da interface localmente
                
                location.reload(); // Recarrega a página após deletar o card
            } else {
                // Exibe o alerta de erro
                showAlert('danger', data.error || 'Erro desconhecido ao deletar o card.');
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            showAlert('danger', `Erro deletar card: ${error.message}`);
        });
    }

    //exibe o alerta
    function showAlert(type, message) {
        const alertContainer = document.getElementById("alert-container");
        const isSuccess = type === 'success';
        
        alertContainer.innerHTML = `
            <div class="alert-dark ${isSuccess ? "alert-success" : "alert-danger"}" role="alert">
                <strong>${isSuccess ? "Success" : "Error"} - </strong> 
                ${isSuccess ? "Sucesso" : message}
            </div>`;
        
        setTimeout(() => {
            alertContainer.innerHTML = "";
        }, 2000);
    }

    //obtém o token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(cookie => {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }
    

    function simulateLoadingAndUpdate(card) {
        const spinner = document.getElementById(`spinner-fase-${card.id}`);
        const faseContainer = document.getElementById(`fase-container-${card.id}`);

        // Simular consulta com um timeout
        setTimeout(() => {
            // Remover o spinner
            spinner.remove();

            // Consulta no cache o nome da fase
            fetch(`/api/card/${card.id}/`)
                .then(response => response.json())
                .then(data => {
                    const faseNomeElement = document.createElement('span');
                    faseNomeElement.className = 'badge bg-secondary';
                    faseNomeElement.id = `fase-nome-${card.id}`;
                    faseNomeElement.textContent = data.fase_nome; // Usar o nome da fase retornado pela API
                    faseContainer.appendChild(faseNomeElement);
                })
                .catch(error => {
                    console.error('Erro:', error);
                    // Adicionar uma mensagem de erro ou tratar o erro de outra forma
                });
        }, 2000); // Exemplo: 2 segundos de carregamento
    }


    /*-------------------MOVIMENTAÇÃO DE CARDS ENTRE FASES---------------------------*/

    function initializeSortable() {
        document.querySelectorAll(".sortable-cards").forEach(container => {
            new Sortable(container, {
                group: "shared",
                animation: 150,
                ghostClass: "sortable-ghost",
                onEnd: handleCardMove
            });
        });
    }


    function handleCardMove(evt) {
        const cardId = evt.item.getAttribute("data-card-id");
        const oldPhaseElement = evt.from.closest(".phase-card-col");
        const newPhaseElement = evt.to.closest(".phase-card-col");
        const oldPhaseId = oldPhaseElement.getAttribute("data-fase-id");
        const newPhaseId = newPhaseElement.getAttribute("data-fase-id");
        const oldPhaseName = oldPhaseElement.getAttribute("data-nome");
        const newPhaseName = newPhaseElement.getAttribute("data-nome");
    
        // Verifica se o card foi movido para a mesma fase
        if (oldPhaseId === newPhaseId) {
            return;
        }

        // Remove o card do DOM da fase antiga
        const cardElement = oldPhaseElement.querySelector(`[data-card-id="${cardId}"]`);
        if (cardElement) {
            cardElement.remove();
        }

    
        updateGhostCards(evt.from);
        updateGhostCards(evt.to);
        updateCardPhase(cardId, newPhaseId, newPhaseName);
        clearFormContainerFase(cardId);
    
        // Atualiza a contagem de cards no objeto
        cardCounts[oldPhaseId] = Math.max((cardCounts[oldPhaseId] || 0) - 1, 0);
        cardCounts[newPhaseId] = (cardCounts[newPhaseId] || 0) + 1;
    
        updateCardCount(oldPhaseId); // Atualiza a contagem de cards na fase antiga
        updateCardCount(newPhaseId); // Atualiza a contagem de cards na nova fase
    
        // Remove cards duplicados na nova fase
        const newPhaseCards = newPhaseElement.querySelectorAll(`[data-card-id="${cardId}"]`);
        if (newPhaseCards.length > 1) {
            for (let i = 1; i < newPhaseCards.length; i++) {
                newPhaseCards[i].remove();
            }
        }
    
        // Verifica quantos cards estão visíveis na fase antiga
        const visibleOldPhaseCards = Array.from(oldPhaseElement.querySelectorAll('.sequence-card-body')).filter(card => card.offsetParent !== null).length;
        //console.log(`Número de cards visíveis na fase ${oldPhaseName}: ${visibleOldPhaseCards}`);
        
        // assim que 4 cards forem movidos para nova fase, carrega 5  mais cards
        if (visibleOldPhaseCards === 4) {
            loadCards(oldPhaseId, 5);
        }
        // Verifica quantos cards estão visíveis na nova fase
        const visibleNewPhaseCards = Array.from(newPhaseElement.querySelectorAll('.sequence-card-body')).filter(card => card.offsetParent !== null).length;
        //console.log(`Número de cards visíveis na fase ${newPhaseName}: ${visibleNewPhaseCards}`);
    }


    function updateGhostCards(container) {
        const ghostCard = container.querySelector(".ghost-card");
        const hasCards = container.querySelectorAll(".card").length > 0;
        
        if (ghostCard) {
            ghostCard.style.display = hasCards ? "none" : "block";
        }
    }
    
    //movimentação do card arrastando e soltando
    function updateCardPhase(cardId, newPhaseId, newPhaseName) {
        fetch("/update_card_phase/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({
                card_id: cardId,
                new_phase_id: newPhaseId
            })
        })
        .then(response => response.json())
        .then(data => displayAlert(data.success, newPhaseName, data.errors))
        .catch(error => displayAlert(false, "", error));
    }


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            document.cookie.split(";").forEach(cookie => {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }

    
function displayAlert(success, phaseName, errorMessage) {
    const alertContainer = document.getElementById("alert-container");

    const successIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>`;

    const errorIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>`;

    alertContainer.innerHTML = `
        <div class="alert ${success ? "alert-success" : "alert-danger"}" role="alert">
            <strong>${success ? successIcon : errorIcon} - </strong> 
            ${success ? `Card Movido para a fase ${phaseName}` : errorMessage}
        </div>`;

    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 2000);
}



    fetch(`/api/sequencia/${sequenceId}/fases/`)
        .then(response => response.json())
        .then(fases => {
            if (!fases.length) return;

            fases.forEach(fase => {
                createPhaseCard(fase);
            });

            initializeSortable(); // Inicializa o Sortable após criar as fases
        })
        .catch(error => {
            console.error('Erro ao buscar fases:', error);
            showError('Erro ao buscar fases.');
        });


    
    document.querySelectorAll('.tasks').forEach(tasksDiv => {
        tasksDiv.addEventListener('scroll', function() {
            if (tasksDiv.scrollTop + tasksDiv.clientHeight >= tasksDiv.scrollHeight - 10) {
                const faseId = tasksDiv.id.replace('tasks', '');
                const loadedCards = tasksDiv.querySelectorAll('.card').length;
                loadCards(faseId, loadedCards, 5, responsavelNome);
            }
        });
    });
});
