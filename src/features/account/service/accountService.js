const API_URL = "http://localhost:8080/account"; // ajuste para sua URL do back-end

export async function getAccount(token) {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Erro ao buscar conta");
  }

  return response.json();
}

export async function updateAccount(data, token) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Erro ao atualizar conta");
  }

  return response.json();
}

export async function deleteAccount(token) {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Erro ao deletar conta");
  }

  return true;
}

export async function getAccountData(token) {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do usuário");
  }

  return response.json();
}