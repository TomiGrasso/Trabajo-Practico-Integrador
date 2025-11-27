const url_UD = "https://691cca033aaeed735c9221de.mockapi.io"; //url para usuarios y doctores
const url_AP = "https://6926791a26e7e41498fa6d50.mockapi.io"; //url para citas

async function requestUD(path, { method = "GET", body = null, headers = {} } = {}) {
  const url = `${url_UD}${path}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(
      errorData?.message || `Error en la petición: ${response.status}`
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  // Si es DELETE, mockapi puede devolver 204 sin body
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

async function requestAP(path, { method = "GET", body = null, headers = {} } = {}) {
  const url = `${url_AP}${path}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(
      errorData?.message || `Error en la petición: ${response.status}`
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

const apiUD = {
  get: (path, opts) => requestUD(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => requestUD(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => requestUD(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => requestUD(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => requestUD(path, { ...opts, method: "DELETE" }),
};

const apiAP = {
  get: (path, opts) => requestAP(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => requestAP(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => requestAP(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => requestAP(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => requestAP(path, { ...opts, method: "DELETE" }),
};

export { apiUD, apiAP };