import api from "./api";

const productService = {
  getAllProduct() {
    return api.get("/super-admin/product/get-all-product");
  },
  createNewProduct(newProduct) {
    return api.post("/super-admin/product/create", newProduct);
  },
  updateProduct(productData) {
    return api.put(
      `/super-admin/product/update/${productData.idProduct}`,
      productData
    );
  },
  deleteProduct(idProduct) {
    return api.delete(`/super-admin/product/delete/${idProduct}`);
  },
};

export default productService;
