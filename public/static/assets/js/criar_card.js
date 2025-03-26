
(async function () {
    const form = document.getElementById("new-card-form");
    const saveButton = document.getElementById("save-card-btn");
    const alertContainer = document.getElementById("alert-container") || createAlertContainer();

    saveButton.addEventListener("click", handleSave);

    async function handleSave(event) {
        event.preventDefault(); // Impede o envio do formulário antes da validação
        saveButton.disabled = true;

        const missingFields = validateForm(form);

        if (missingFields.length > 0) {
            displayAlert("danger", `Por favor, preencha os seguintes campos obrigatórios: ${missingFields.join(", ")}`);
            saveButton.disabled = false;
            return;
        }

        const formData = collectFormData(form);

        try {
            const response = await sendFormData(form.action, formData);
            let responseData;

            try {
                responseData = await parseResponse(response);
            } catch (parseError) {
                console.warn("Não foi possível interpretar a resposta, mas o card pode ter sido criado.");
                responseData = { message: "Card criado.", data: formDataToObject(formData) };
            }

            if (response.ok) {
                handleSuccess(responseData);
                console.log(responseData);
            } else {
                handleError(responseData);
            }
        } catch (error) {
            displayAlert("danger", error.message);
        } finally {
            saveButton.disabled = false;
        }
    }

    function validateForm(form) {
        const missingFields = [];
        form.querySelectorAll("[required]").forEach((field) => {
            if (!field.value.trim()) {
                const label = form.querySelector(`label[for="${field.id}"]`);
                const fieldName = label ? label.innerText : field.name;
                missingFields.push(fieldName.replace("*", "").trim());
            }
        });
        return missingFields;
    }

    function createAlertContainer() {
        const container = document.createElement("div");
        container.id = "alert-container";
        form.parentElement.prepend(container);
        return container;
    }

    function collectFormData(form) {
        const formData = new FormData(form);
        form.querySelectorAll("[id^='field_']").forEach(input => {
            formData.append(input.name, input.value || "");
        });
        console.log("Dados coletados:", formDataToObject(formData));
        return formData;
    }

    async function sendFormData(url, formData) {
        return await fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
            },
        });
    }

    async function parseResponse(response) {
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            return await response.json();
        } else if (contentType?.includes("text/html") || contentType?.includes("text/plain")) {
            const text = await response.text();
            throw new Error(`Resposta inesperada do servidor: ${text}`);
        } else {
            throw new Error("Resposta inesperada do servidor.");
        }
    }

    function handleSuccess(data) {
        displayAlert("success", data.message);

        if (data.data) {
            console.log("Dados enviados:", data.data);
        }

        setTimeout(() => location.reload(), 1500);
    }

    function handleError(errData) {
        displayAlert("danger", errData.message || "Ocorreu um erro desconhecido.");
        setTimeout(() => location.reload(), 1500);
    }

    function displayAlert(type, message) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} text-bg-${type} border-0" role="alert">
                <strong>${type === "danger" ? "Erro" : "Sucesso"} - </strong> ${message}
            </div>
        `;
        setTimeout(() => {
            alertContainer.innerHTML = "";
        }, 5000);
    }

    function formDataToObject(formData) {
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }
})();
