import api from "./api";

const productService = {
  getAllProduct() {
    return api.get("/user-product/get-all-product");
  },
  createNewProduct(newProduct) {
    return api.post("/user-product/create", newProduct);
  },
  updateProduct(productData) {
    return api.put(
      `/user-product/update/${productData.idProduct}`,
      productData
    );
  },
  deleteProduct(idProduct) {
    return api.delete(`/user-product/delete/${idProduct}`);
  },
};

export default productService;
