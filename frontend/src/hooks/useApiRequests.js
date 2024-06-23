import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

const useApiRequests = () => {
  const url = process.env.REACT_APP_API_URL;
  const authHeader = useAuthHeader();

  // User APIS

  async function getAllUsers() {
    const getUser = await axios.get(url + "/api/users/users", {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getUser.data;
  }

  async function addUser(data) {
    const addUser = await axios.post(url + "/api/users/create-user", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return addUser.data;
  }
  async function getUserById(id) {
    const getUserById = await axios.get(url + "/api/users/user/" + id, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getUserById.data;
  }

  async function modifyUser(id, data) {
    const modifyUser = await axios.post(
      url + "/api/users/modify-user/" + id,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return modifyUser.data;
  }

  // Category APIS

  async function getAllCategories() {
    const getCategories = await axios.get(url + "/api/categories/categories", {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getCategories.data;
  }

  async function addCategory(data) {
    const addCategory = await axios.post(
      url + "/api/categories/create-category",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return addCategory.data;
  }
  async function getCategoryById(id) {
    const getCategoryById = await axios.get(
      url + "/api/categories/category/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return getCategoryById.data;
  }

  async function modifyCategory(id, data) {
    const modifyCategory = await axios.post(
      url + "/api/categories/modify-category/" + id,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return modifyCategory.data;
  }

  //product APIS
  async function addProduct(data) {
    const addProduct = await axios.post(
      url + "/api/products/create-product",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return addProduct.data;
  }
  async function getAllProduct(data) {
    const getProduct = await axios.get(url + "/api/products/products", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getProduct.data;
  }

  async function getProductById(id) {
    const getProduct = await axios.get(url + "/api/products/products/" + id, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getProduct.data;
  }

  async function modifyProduct(id, data) {
    const modifyProduct = await axios.post(
      url + "/api/products/modify-product/" + id,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return modifyProduct.data;
  }

  //batch

  async function addBatch(data) {
    const addBatch = await axios.post(url + "/api/batches/create-batch", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return addBatch.data;
  }
  async function getAllBatch(data) {
    const getBatch = await axios.get(url + "/api/batches/batches", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getBatch.data;
  }

  async function getBatchById(id) {
    const getBatch = await axios.get(url + "/api/batches/batches/" + id, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return getBatch.data;
  }

  async function modifyBatch(id, data) {
    const modifyBatch = await axios.post(
      url + "/api/batches/modify-batch/" + id,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: authHeader,
        },
      }
    );
    return modifyBatch.data;
  }

  //sales

  async function addBill(data) {
    const addBill = await axios.post(url + "/api/sales/create-bill", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return addBill.data;
  }

  // actions
  async function getAllAction(data) {
    const addBill = await axios.get(url + "/api/actions/actions", data, {
      headers: {
        "Content-Type": "application/json",
        authorization: authHeader,
      },
    });
    return addBill.data;
  }

  return {
    authHeader,
    getAllUsers,
    addUser,
    getUserById,
    modifyUser,
    getAllCategories,
    addCategory,
    getCategoryById,
    modifyCategory,
    addProduct,
    getAllProduct,
    getProductById,
    modifyProduct,
    addBatch,
    getAllBatch,
    getBatchById,
    modifyBatch,
    addBill,
    getAllAction,
  };
};
export default useApiRequests;